/**
 * 3D MolBuilder — Cliente de Sincronización Local LAN
 * Vinculación con el Medio (VcM) — Universidad San Sebastián
 *
 * Conecta las estaciones de trabajo de mesa con la pantalla central/proyector.
 * Diseñado para operar 100% resiliente: si el servidor Socket.io no está disponible,
 * conmuta inmediatamente a modo local offline con soporte de códigos QR y códigos cortos.
 */

import { io, Socket } from 'socket.io-client';
import { TeamScore } from '../types/game';

export type ClientRole = 'station' | 'master';
export type ConnectionStatus = 'connected' | 'offline' | 'connecting';

export interface ActivityEvent {
  id: string;
  teamId: string;
  teamName: string;
  text: string;
  timestamp: string;
  type: 'score' | 'redeem' | 'connect';
}

export interface TournamentSyncState {
  teams: TeamScore[];
  activeRoundIndex: number;
  recentEvents: ActivityEvent[];
  connectedClients: number;
  serverInfo?: {
    ips: string[];
    port: number;
    vitePort: number;
  };
}

export interface ScorePayload {
  teamId: string;
  scoreDelta: number;
  completedMoleculeId?: string;
  timeBonus?: number;
  triviaBonus?: number;
  totalEarned: number;
}

export interface VictoryPayload {
  teamId: string;
  moleculeId: string;
  scoreEarned: number;
  teamName?: string;
}

export interface ManualCodePayload {
  teamId: string;
  score: number;
  moleculeId: string;
  code: string;
}

export interface NetworkDiagnostics {
  status: ConnectionStatus;
  activeUrl: string;
  lastError: string | null;
  connectedCount: number;
  detectedIps: string[];
  isCustomServer: boolean;
}

class SocketSyncManager {
  private socket: Socket | null = null;
  private status: ConnectionStatus = 'offline';
  private role: ClientRole = 'station';
  private teamId: string = 'team-alfa';
  private connectedCount: number = 0;
  private activeUrl: string = '';
  private lastError: string | null = null;
  private detectedIps: string[] = [];
  private isCustomServer: boolean = false;
  private hasAttemptedFallback: boolean = false;

  private statusListeners: Set<(status: ConnectionStatus, count: number) => void> = new Set();
  private tournamentListeners: Set<(state: TournamentSyncState) => void> = new Set();
  private victoryListeners: Set<(payload: VictoryPayload) => void> = new Set();
  private diagnosticsListeners: Set<(diag: NetworkDiagnostics) => void> = new Set();

  constructor() {
    this.activeUrl = this.resolveDefaultUrl();
    this.isCustomServer = typeof window !== 'undefined' && !!localStorage.getItem('vcm_molbuilder_server_url');
  }

  public normalizeUrl(input: string): string {
    let url = input.trim();
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
    }
    try {
      const parsed = new URL(url);
      if (!parsed.port) {
        url = `${parsed.protocol}//${parsed.hostname}:5173`;
      }
    } catch {
      // mantener como está
    }
    return url.replace(/\/+$/, '');
  }

  public resolveDefaultUrl(): string {
    if (typeof window === 'undefined') return 'http://localhost:3001';

    const custom = localStorage.getItem('vcm_molbuilder_server_url');
    if (custom && custom.trim()) {
      return this.normalizeUrl(custom);
    }

    const port = window.location.port;
    const hostname = window.location.hostname || 'localhost';

    // Si cargamos desde Vite (puerto 5173 o 5174), conectamos al origin directamente
    // porque Vite cuenta con proxy WebSocket /socket.io hacia 3001
    if (port === '5173' || port === '5174') {
      return window.location.origin;
    }

    // Si cargamos desde Express estático (puerto 3001)
    if (port === '3001') {
      return window.location.origin;
    }

    // Si hostname es una IP LAN pero en otro puerto
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}:5173`;
    }

    return 'http://localhost:3001';
  }

  public init(role: ClientRole, teamId?: string) {
    this.role = role;
    if (teamId) this.teamId = teamId;

    if (this.socket && (this.status === 'connected' || this.status === 'connecting')) {
      this.socket.emit('join-role', { role: this.role, teamId: this.teamId });
      return;
    }

    this.connectToServer(this.resolveDefaultUrl());
  }

  public connectToServer(targetUrl: string) {
    if (this.socket) {
      try {
        this.socket.removeAllListeners();
        this.socket.disconnect();
      } catch {
        // Ignorar error al desconectar
      }
      this.socket = null;
    }

    this.activeUrl = targetUrl;
    this.status = 'connecting';
    this.lastError = null;
    this.notifyStatus();
    this.notifyDiagnostics();

    console.info(`[SocketSync] 🌐 Conectando a servidor LAN: ${targetUrl} (Rol: ${this.role}, Equipo: ${this.teamId})`);

    try {
      this.socket = io(targetUrl, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 10000,
        autoConnect: true,
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log(`[SocketSync] 🟢 Conectado exitosamente con ID: ${this.socket?.id}`);
        this.status = 'connected';
        this.lastError = null;
        this.hasAttemptedFallback = false;
        this.socket?.emit('join-role', { role: this.role, teamId: this.teamId });
        this.notifyStatus();
        this.notifyDiagnostics();
      });

      this.socket.on('disconnect', (reason) => {
        console.warn(`[SocketSync] 🟡 Desconectado del servidor (${reason}). Modo local / offline activo.`);
        this.status = 'offline';
        this.notifyStatus();
        this.notifyDiagnostics();
      });

      this.socket.on('connect_error', (error) => {
        console.warn(`[SocketSync] ⚠️ Error de conexión a ${targetUrl}:`, error.message);
        this.status = 'offline';
        this.lastError = error.message;

        // Fallback automático inteligente entre puerto Vite (5173) y puerto directo (3001)
        if (!this.hasAttemptedFallback && !this.isCustomServer && typeof window !== 'undefined') {
          this.hasAttemptedFallback = true;
          try {
            const parsed = new URL(targetUrl);
            const fallbackPort = parsed.port === '5173' ? '3001' : '5173';
            const fallbackUrl = `${parsed.protocol}//${parsed.hostname}:${fallbackPort}`;
            console.log(`[SocketSync] 🔄 Probando fallback automático a ${fallbackUrl}...`);
            setTimeout(() => {
              if (this.status !== 'connected') {
                this.connectToServer(fallbackUrl);
              }
            }, 1500);
            return;
          } catch {
            // Ignorar error de parsing
          }
        }

        this.notifyStatus();
        this.notifyDiagnostics();
      });

      this.socket.on('init-state', (state: TournamentSyncState) => {
        if (state && Array.isArray(state.teams)) {
          this.connectedCount = state.connectedClients || 1;
          if (state.serverInfo?.ips && Array.isArray(state.serverInfo.ips)) {
            this.detectedIps = state.serverInfo.ips;
          }
          this.notifyTournament(state);
          this.notifyStatus();
          this.notifyDiagnostics();
        }
      });

      this.socket.on('tournament-updated', (state: TournamentSyncState) => {
        if (state && Array.isArray(state.teams)) {
          this.connectedCount = state.connectedClients || this.connectedCount;
          this.notifyTournament(state);
        }
      });

      this.socket.on('client-count-updated', (count: number) => {
        this.connectedCount = count;
        this.notifyStatus();
        this.notifyDiagnostics();
      });

      this.socket.on('display-victory-fanfare', (payload: VictoryPayload) => {
        this.victoryListeners.forEach((fn) => fn(payload));
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error desconocido al inicializar socket';
      console.error('[SocketSync] Error grave al crear socket:', errMsg);
      this.status = 'offline';
      this.lastError = errMsg;
      this.notifyStatus();
      this.notifyDiagnostics();
    }
  }

  public setCustomServer(url: string) {
    const normalized = this.normalizeUrl(url);
    if (!normalized) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('vcm_molbuilder_server_url', normalized);
    }
    this.isCustomServer = true;
    this.connectToServer(normalized);
  }

  public resetToAutoServer() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vcm_molbuilder_server_url');
    }
    this.isCustomServer = false;
    this.hasAttemptedFallback = false;
    const defaultUrl = this.resolveDefaultUrl();
    this.connectToServer(defaultUrl);
  }

  public reconnect() {
    this.hasAttemptedFallback = false;
    this.connectToServer(this.activeUrl || this.resolveDefaultUrl());
  }

  public setRole(role: ClientRole, teamId?: string) {
    this.role = role;
    if (teamId) this.teamId = teamId;
    if (this.socket && this.socket.connected) {
      this.socket.emit('join-role', { role, teamId: this.teamId });
    }
  }

  public getStatus(): ConnectionStatus {
    return this.status;
  }

  public getConnectedCount(): number {
    return this.connectedCount;
  }

  public getDiagnostics(): NetworkDiagnostics {
    return {
      status: this.status,
      activeUrl: this.activeUrl,
      lastError: this.lastError,
      connectedCount: this.connectedCount,
      detectedIps: this.detectedIps,
      isCustomServer: this.isCustomServer,
    };
  }

  public emitScoreUpdate(payload: ScorePayload) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('score-updated', payload);
    }
  }

  public emitVictoryFanfare(payload: VictoryPayload) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('trigger-victory-fanfare', payload);
    }
  }

  public emitRedeemCode(payload: ManualCodePayload) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('redeem-code', payload);
    }
  }

  public emitTournamentSync(teams: TeamScore[]) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('sync-tournament', teams);
    }
  }

  public emitResetTournament() {
    if (this.socket && this.socket.connected) {
      this.socket.emit('reset-tournament');
    }
  }

  public onStatusChange(callback: (status: ConnectionStatus, count: number) => void): () => void {
    this.statusListeners.add(callback);
    callback(this.status, this.connectedCount);
    return () => this.statusListeners.delete(callback);
  }

  public onDiagnosticsChange(callback: (diag: NetworkDiagnostics) => void): () => void {
    this.diagnosticsListeners.add(callback);
    callback(this.getDiagnostics());
    return () => this.diagnosticsListeners.delete(callback);
  }

  public onTournamentSync(callback: (state: TournamentSyncState) => void): () => void {
    this.tournamentListeners.add(callback);
    return () => this.tournamentListeners.delete(callback);
  }

  public onVictory(callback: (payload: VictoryPayload) => void): () => void {
    this.victoryListeners.add(callback);
    return () => this.victoryListeners.delete(callback);
  }

  private notifyStatus() {
    this.statusListeners.forEach((fn) => fn(this.status, this.connectedCount));
  }

  private notifyTournament(state: TournamentSyncState) {
    this.tournamentListeners.forEach((fn) => fn(state));
  }

  private notifyDiagnostics() {
    const diag = this.getDiagnostics();
    this.diagnosticsListeners.forEach((fn) => fn(diag));
  }
}

export const socketSync = new SocketSyncManager();
