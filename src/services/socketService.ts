/**
 * 3D MolBuilder — Servicio de Sincronización Local LAN & Offline Resiliente
 * Vinculación con el Medio (VcM) — Universidad San Sebastián
 *
 * Características principales:
 * 1. Conexión dinámica a http://${window.location.hostname}:3001 con fallback automático a window.location.origin.
 * 2. Canal de comunicación local BroadcastChannel('vcm_molbuilder_bus') para sincronizar pestañas/ventanas sin red.
 * 3. Fallback en localStorage con eventos de almacenamiento para entornos con AP Isolation (aislamiento Wi-Fi escolar).
 * 4. Silenciado de reconexiones y reintentos exponenciales limpios.
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

const DEFAULT_TEAMS: TeamScore[] = [
  {
    id: 'team-alfa',
    name: 'Equipo Alfa — 3° Medio',
    score: 0,
    completedMolecules: [],
    color: '#5de1e5',
  },
  {
    id: 'team-beta',
    name: 'Equipo Beta — 4° Medio',
    score: 0,
    completedMolecules: [],
    color: '#efb65f',
  },
  {
    id: 'team-gamma',
    name: 'Equipo Gamma — QyF Invitados',
    score: 0,
    completedMolecules: [],
    color: '#38ef7d',
  },
];

const BROADCAST_CHANNEL_NAME = 'vcm_molbuilder_bus';
const LOCAL_STORAGE_EVENT_KEY = 'vcm_molbuilder_bus_event';

export class SocketService {
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
  private clientId: string;

  private broadcastChannel: BroadcastChannel | null = null;
  private processedLocalMessageIds: Set<string> = new Set();

  private tournamentState: TournamentSyncState = {
    teams: [...DEFAULT_TEAMS],
    activeRoundIndex: 0,
    recentEvents: [],
    connectedClients: 1,
  };

  private statusListeners: Set<(status: ConnectionStatus, count: number) => void> = new Set();
  private tournamentListeners: Set<(state: TournamentSyncState) => void> = new Set();
  private victoryListeners: Set<(payload: VictoryPayload) => void> = new Set();
  private diagnosticsListeners: Set<(diag: NetworkDiagnostics) => void> = new Set();

  constructor() {
    this.clientId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `client-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    this.activeUrl = this.resolveDefaultUrl();
    this.isCustomServer = typeof window !== 'undefined' && !!localStorage.getItem('vcm_molbuilder_server_url');

    this.initBroadcastAndStorage();
  }

  /**
   * Inicializa BroadcastChannel y listener de localStorage para redundancia
   * ante aislamiento Wi-Fi (AP Isolation) en colegios y ferias científicas.
   */
  private initBroadcastAndStorage() {
    if (typeof window === 'undefined') return;

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        this.broadcastChannel.onmessage = (event: MessageEvent) => {
          this.handleLocalBusMessage(event.data);
        };
      } catch (err) {
        console.warn('[SocketService] No se pudo instanciar BroadcastChannel:', err);
      }
    }

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_EVENT_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (parsed && parsed.senderId !== this.clientId) {
            this.handleLocalBusMessage(parsed);
          }
        } catch {
          // Ignorar JSON malformado
        }
      }
    });
  }

  private broadcastLocally(type: string, payload: unknown) {
    const timestamp = Date.now();
    const messageId = `${this.clientId}-${timestamp}-${Math.random().toString(36).substring(2, 7)}`;
    const envelope = {
      type,
      payload,
      senderId: this.clientId,
      timestamp,
      messageId,
    };

    // Marcar el mensaje propio como procesado para no re-procesarlo si rebota
    this.processedLocalMessageIds.add(messageId);

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(envelope);
      } catch {
        // Ignorar error al enviar mensaje a través del canal
      }
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_EVENT_KEY, JSON.stringify(envelope));
      } catch {
        // localStorage lleno o deshabilitado
      }
    }
  }

  private handleLocalBusMessage(data: { type: string; payload: unknown; senderId?: string; timestamp?: number; messageId?: string }) {
    if (!data || !data.type) return;

    // Deduplicación para evitar que el mismo mensaje se aplique dos veces
    // (por ejemplo si la pestaña recibe BroadcastChannel Y storage event simultáneamente)
    const msgId = data.messageId || `${data.senderId || 'unknown'}-${data.timestamp || 0}-${data.type}`;
    if (this.processedLocalMessageIds.has(msgId)) {
      return;
    }
    this.processedLocalMessageIds.add(msgId);
    if (this.processedLocalMessageIds.size > 100) {
      const firstKey = this.processedLocalMessageIds.values().next().value;
      if (firstKey) this.processedLocalMessageIds.delete(firstKey);
    }

    switch (data.type) {
      case 'score-updated': {
        const payload = data.payload as ScorePayload;
        if (payload && typeof payload === 'object') {
          this.applyScoreUpdateLocally(payload);
        }
        break;
      }
      case 'tournament-updated': {
        const payload = data.payload as TournamentSyncState;
        if (payload && Array.isArray(payload.teams)) {
          this.tournamentState = {
            ...payload,
            connectedClients: Math.max(this.tournamentState.connectedClients, payload.connectedClients || 1),
          };
          this.notifyTournament(this.tournamentState);
        }
        break;
      }
      case 'display-victory-fanfare': {
        const payload = data.payload as VictoryPayload;
        if (payload && typeof payload === 'object') {
          this.victoryListeners.forEach((fn) => fn(payload));
        }
        break;
      }
      case 'sync-tournament': {
        const teams = data.payload as TeamScore[];
        if (Array.isArray(teams)) {
          this.tournamentState.teams = teams;
          this.notifyTournament(this.tournamentState);
        }
        break;
      }
      case 'reset-tournament': {
        this.tournamentState.teams = this.tournamentState.teams.map((t) => ({
          ...t,
          score: 0,
          completedMolecules: [],
        }));
        this.tournamentState.recentEvents = [];
        this.notifyTournament(this.tournamentState);
        break;
      }
    }
  }

  private applyScoreUpdateLocally(payload: ScorePayload) {
    if (!payload || typeof payload !== 'object') return;
    const { teamId, scoreDelta, completedMoleculeId, timeBonus, triviaBonus, totalEarned } = payload;
    if (!teamId) return;
    const earned = totalEarned || scoreDelta || 0;

    this.tournamentState.teams = this.tournamentState.teams.map((t) => {
      if (t.id === teamId) {
        const completed = completedMoleculeId && !t.completedMolecules.includes(completedMoleculeId)
          ? [...t.completedMolecules, completedMoleculeId]
          : t.completedMolecules;
        return {
          ...t,
          score: t.score + earned,
          completedMolecules: completed,
        };
      }
      return t;
    });

    const team = this.tournamentState.teams.find((t) => t.id === teamId);
    const eventItem: ActivityEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      teamId,
      teamName: team ? team.name : teamId,
      text: `+${earned} pts en ${completedMoleculeId || 'ronda'} (Tiempo: +${timeBonus || 0}, Trivia: +${triviaBonus || 0})`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'score',
    };

    this.tournamentState.recentEvents = [eventItem, ...this.tournamentState.recentEvents.slice(0, 19)];
    this.notifyTournament(this.tournamentState);
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
        url = `${parsed.protocol}//${parsed.hostname}:3001`;
      }
    } catch {
      // mantener como está
    }
    return url.replace(/\/+$/, '');
  }

  /**
   * Resuelve la URL del servidor Socket.io:
   * Prioridad 1: Configuración personalizada en localStorage.
   * Prioridad 2: http://${window.location.hostname}:3001 (conexión directa al backend Socket.io).
   * Fallback: window.location.origin (proxy Vite en puerto 5174/5173).
   */
  public resolveDefaultUrl(): string {
    if (typeof window === 'undefined') return 'http://localhost:3001';

    const custom = localStorage.getItem('vcm_molbuilder_server_url');
    if (custom && custom.trim()) {
      return this.normalizeUrl(custom);
    }

    const hostname = window.location.hostname || 'localhost';
    return `http://${hostname}:3001`;
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

    console.info(`[SocketService] 🌐 Conectando a servidor LAN: ${targetUrl} (Rol: ${this.role}, Equipo: ${this.teamId})`);

    try {
      this.socket = io(targetUrl, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 8000,
        autoConnect: true,
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log(`[SocketService] 🟢 Conectado exitosamente con ID: ${this.socket?.id}`);
        this.status = 'connected';
        this.lastError = null;
        this.hasAttemptedFallback = false;
        this.socket?.emit('join-role', { role: this.role, teamId: this.teamId });
        this.notifyStatus();
        this.notifyDiagnostics();
      });

      this.socket.on('disconnect', (reason) => {
        console.warn(`[SocketService] 🟡 Desconectado del servidor (${reason}). Modo local / offline activo.`);
        this.status = 'offline';
        this.notifyStatus();
        this.notifyDiagnostics();
      });

      this.socket.on('connect_error', (error) => {
        console.warn(`[SocketService] ⚠️ Error de conexión a ${targetUrl}:`, error.message);
        this.status = 'offline';
        this.lastError = error.message;

        // Fallback automático inteligente entre http://hostname:3001 y window.location.origin
        if (!this.hasAttemptedFallback && !this.isCustomServer && typeof window !== 'undefined') {
          this.hasAttemptedFallback = true;
          try {
            const parsed = new URL(targetUrl);
            const fallbackUrl = parsed.port === '3001'
              ? window.location.origin
              : `http://${window.location.hostname}:3001`;

            if (fallbackUrl !== targetUrl) {
              console.log(`[SocketService] 🔄 Probando fallback automático a ${fallbackUrl}...`);
              setTimeout(() => {
                if (this.status !== 'connected') {
                  this.connectToServer(fallbackUrl);
                }
              }, 1200);
              return;
            }
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
          this.tournamentState = {
            ...state,
            connectedClients: this.connectedCount,
          };
          this.notifyTournament(this.tournamentState);
          this.notifyStatus();
          this.notifyDiagnostics();
        }
      });

      this.socket.on('tournament-updated', (state: TournamentSyncState) => {
        if (state && Array.isArray(state.teams)) {
          this.connectedCount = state.connectedClients || this.connectedCount;
          this.tournamentState = state;
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
      const errMsg = err instanceof Error ? err.message : 'Error al inicializar socket';
      console.error('[SocketService] Error al crear socket:', errMsg);
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
    // 1. Aplicar y notificar en memoria local inmediatamente
    this.applyScoreUpdateLocally(payload);

    // 2. Transmitir por canal de difusión local (cross-tab / AP isolation fallback)
    this.broadcastLocally('score-updated', payload);

    // 3. Transmitir vía Socket.io si está conectado
    if (this.socket && this.socket.connected) {
      this.socket.emit('score-updated', payload);
    }
  }

  public emitVictoryFanfare(payload: VictoryPayload) {
    // 1. Notificar a listeners locales
    this.victoryListeners.forEach((fn) => fn(payload));

    // 2. Transmitir localmente
    this.broadcastLocally('display-victory-fanfare', payload);

    // 3. Transmitir vía Socket.io
    if (this.socket && this.socket.connected) {
      this.socket.emit('trigger-victory-fanfare', payload);
    }
  }

  public emitRedeemCode(payload: ManualCodePayload) {
    const { teamId, score, moleculeId, code } = payload;
    const earned = score || 0;

    this.tournamentState.teams = this.tournamentState.teams.map((t) => {
      if (t.id === teamId) {
        const completed = moleculeId && !t.completedMolecules.includes(moleculeId)
          ? [...t.completedMolecules, moleculeId]
          : t.completedMolecules;
        return {
          ...t,
          score: t.score + earned,
          completedMolecules: completed,
        };
      }
      return t;
    });

    const team = this.tournamentState.teams.find((t) => t.id === teamId);
    const eventItem: ActivityEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      teamId,
      teamName: team ? team.name : teamId,
      text: `Canje manual [${code}]: +${earned} pts en ${moleculeId}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'redeem',
    };
    this.tournamentState.recentEvents = [eventItem, ...this.tournamentState.recentEvents.slice(0, 19)];
    this.notifyTournament(this.tournamentState);

    const victoryPayload: VictoryPayload = {
      teamId,
      moleculeId,
      scoreEarned: earned,
      teamName: team?.name,
    };
    this.victoryListeners.forEach((fn) => fn(victoryPayload));

    this.broadcastLocally('tournament-updated', this.tournamentState);
    this.broadcastLocally('display-victory-fanfare', victoryPayload);

    if (this.socket && this.socket.connected) {
      this.socket.emit('redeem-code', payload);
    }
  }

  public emitTournamentSync(teams: TeamScore[]) {
    if (Array.isArray(teams)) {
      this.tournamentState.teams = teams;
      this.notifyTournament(this.tournamentState);
      this.broadcastLocally('sync-tournament', teams);

      if (this.socket && this.socket.connected) {
        this.socket.emit('sync-tournament', teams);
      }
    }
  }

  public emitResetTournament() {
    this.tournamentState.teams = this.tournamentState.teams.map((t) => ({
      ...t,
      score: 0,
      completedMolecules: [],
    }));
    this.tournamentState.recentEvents = [];
    this.notifyTournament(this.tournamentState);
    this.broadcastLocally('reset-tournament', null);

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
    callback(this.tournamentState);
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

export const socketService = new SocketService();
export const SocketSyncManager = SocketService;
export default socketService;
