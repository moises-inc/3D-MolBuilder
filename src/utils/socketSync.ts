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
export type ConnectionStatus = 'connected' | 'offline';

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

class SocketSyncManager {
  private socket: Socket | null = null;
  private status: ConnectionStatus = 'offline';
  private role: ClientRole = 'station';
  private teamId: string = 'team-alfa';
  private connectedCount: number = 0;
  private statusListeners: Set<(status: ConnectionStatus, count: number) => void> = new Set();
  private tournamentListeners: Set<(state: TournamentSyncState) => void> = new Set();
  private victoryListeners: Set<(payload: VictoryPayload) => void> = new Set();

  constructor() {
    // Auto-detección diferida al montar
  }

  private getServerUrl(): string {
    if (typeof window === 'undefined') return 'http://localhost:3001';
    const hostname = window.location.hostname || 'localhost';
    return `http://${hostname}:3001`;
  }

  public init(role: ClientRole, teamId?: string) {
    this.role = role;
    if (teamId) this.teamId = teamId;

    if (this.socket) {
      this.socket.emit('join-role', { role: this.role, teamId: this.teamId });
      return;
    }

    const serverUrl = this.getServerUrl();

    try {
      this.socket = io(serverUrl, {
        reconnection: true,
        reconnectionAttempts: 8,
        reconnectionDelay: 2000,
        timeout: 4000,
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        this.status = 'connected';
        this.socket?.emit('join-role', { role: this.role, teamId: this.teamId });
        this.notifyStatus();
      });

      this.socket.on('disconnect', () => {
        this.status = 'offline';
        this.notifyStatus();
      });

      this.socket.on('connect_error', () => {
        // Fallback silencioso a offline sin interrumpir el juego
        if (this.status !== 'offline') {
          this.status = 'offline';
          this.notifyStatus();
        }
      });

      this.socket.on('init-state', (state: TournamentSyncState) => {
        if (state && Array.isArray(state.teams)) {
          this.connectedCount = state.connectedClients || 1;
          this.notifyTournament(state);
          this.notifyStatus();
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
      });

      this.socket.on('display-victory-fanfare', (payload: VictoryPayload) => {
        this.victoryListeners.forEach((fn) => fn(payload));
      });
    } catch {
      this.status = 'offline';
      this.notifyStatus();
    }
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
}

export const socketSync = new SocketSyncManager();
