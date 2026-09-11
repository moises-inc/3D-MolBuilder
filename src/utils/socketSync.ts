/**
 * 3D MolBuilder — Capa de compatibilidad retroactiva para socketSync
 * Re-exporta la suite completa de tipos y la instancia singleton desde SocketService.
 */

export * from '../services/socketService';
import { socketService } from '../services/socketService';

export const socketSync = socketService;
export default socketService;
