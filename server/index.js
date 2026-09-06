/**
 * 3D MolBuilder — Servidor de Sincronización Local LAN
 * Vinculación con el Medio (VcM) — Universidad San Sebastián
 * 
 * Permite comunicar en tiempo real las estaciones de mesa (computadores de estudiantes)
 * con la Pantalla Principal / Proyector del auditorio sin depender de internet.
 */

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import os from 'os';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

// Configuración CORS permisiva para red local escolar
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());

// Estado en memoria del torneo escolar
let tournamentState = {
  teams: [
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
  ],
  activeRoundIndex: 0,
  recentEvents: [],
  connectedClients: 0,
};

// Endpoint de diagnóstico
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    connectedClients: tournamentState.connectedClients,
    teamsCount: tournamentState.teams.length,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/state', (req, res) => {
  res.json(tournamentState);
});

// Gestión de conexiones Socket.io
io.on('connection', (socket) => {
  tournamentState.connectedClients = io.engine.clientsCount;
  console.log(`[Socket.io] 🟢 Cliente conectado: ${socket.id} (Total: ${tournamentState.connectedClients})`);

  // Enviar estado actual al cliente que recién conecta
  socket.emit('init-state', tournamentState);
  io.emit('client-count-updated', tournamentState.connectedClients);

  // Asignar rol: 'master' (proyector) o 'station' (mesa de equipo)
  socket.on('join-role', (payload) => {
    socket.data.role = payload?.role || 'station';
    socket.data.teamId = payload?.teamId || null;
    socket.data.clientName = payload?.clientName || 'Cliente';

    console.log(`[Socket.io] 👤 Rol asignado a ${socket.id}: ${socket.data.role} ${socket.data.teamId ? `(${socket.data.teamId})` : ''}`);

    io.emit('client-joined', {
      clientId: socket.id,
      role: socket.data.role,
      teamId: socket.data.teamId,
      totalConnected: tournamentState.connectedClients,
    });
  });

  // Actualización de puntaje desde una mesa
  socket.on('score-updated', (payload) => {
    const { teamId, scoreDelta, completedMoleculeId, timeBonus, triviaBonus, totalEarned } = payload;
    console.log(`[Socket.io] 🏆 Puntaje recibido para ${teamId}: +${totalEarned || scoreDelta} pts`);

    // Actualizar estado en memoria
    tournamentState.teams = tournamentState.teams.map((t) => {
      if (t.id === teamId) {
        const completed = completedMoleculeId && !t.completedMolecules.includes(completedMoleculeId)
          ? [...t.completedMolecules, completedMoleculeId]
          : t.completedMolecules;
        return {
          ...t,
          score: t.score + (totalEarned || scoreDelta || 0),
          completedMolecules: completed,
        };
      }
      return t;
    });

    const team = tournamentState.teams.find((t) => t.id === teamId);
    const eventItem = {
      id: `ev-${Date.now()}`,
      teamId,
      teamName: team ? team.name : teamId,
      text: `+${totalEarned || scoreDelta} pts en ${completedMoleculeId || 'ronda'} (Tiempo: +${timeBonus || 0}, Trivia: +${triviaBonus || 0})`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'score',
    };

    tournamentState.recentEvents = [eventItem, ...tournamentState.recentEvents.slice(0, 19)];

    // Re-transmitir a todos los clientes (incluyendo la pantalla principal)
    io.emit('tournament-updated', tournamentState);
    io.emit('score-broadcast', {
      teamId,
      scoreDelta: totalEarned || scoreDelta,
      updatedTeam: team,
      event: eventItem,
    });
  });

  // Disparar fanfarria de victoria y confeti en la pantalla principal
  socket.on('trigger-victory-fanfare', (payload) => {
    console.log(`[Socket.io] 🎉 Fanfarria solicitada por ${payload?.teamId || socket.id}`);
    io.emit('display-victory-fanfare', payload);
  });

  // Sincronización manual o forzada de equipos desde el modal de ajustes
  socket.on('sync-tournament', (newTeams) => {
    if (Array.isArray(newTeams)) {
      tournamentState.teams = newTeams;
      io.emit('tournament-updated', tournamentState);
    }
  });

  // Canjear código de mesa (Fallback manual por código de 6 caracteres o QR)
  socket.on('redeem-code', (payload) => {
    const { teamId, score, moleculeId, code } = payload;
    console.log(`[Socket.io] 🎟️ Código canjeado: ${code} para ${teamId} (+${score} pts)`);

    tournamentState.teams = tournamentState.teams.map((t) => {
      if (t.id === teamId) {
        const completed = moleculeId && !t.completedMolecules.includes(moleculeId)
          ? [...t.completedMolecules, moleculeId]
          : t.completedMolecules;
        return {
          ...t,
          score: t.score + (score || 0),
          completedMolecules: completed,
        };
      }
      return t;
    });

    const team = tournamentState.teams.find((t) => t.id === teamId);
    const eventItem = {
      id: `ev-${Date.now()}`,
      teamId,
      teamName: team ? team.name : teamId,
      text: `Canje manual [${code}]: +${score} pts en ${moleculeId}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'redeem',
    };
    tournamentState.recentEvents = [eventItem, ...tournamentState.recentEvents.slice(0, 19)];

    io.emit('tournament-updated', tournamentState);
    io.emit('display-victory-fanfare', {
      teamId,
      moleculeId,
      scoreEarned: score,
      teamName: team?.name,
    });
  });

  // Reiniciar torneo
  socket.on('reset-tournament', () => {
    console.log('[Socket.io] 🔄 Reinicio total del torneo solicitado');
    tournamentState.teams = tournamentState.teams.map((t) => ({
      ...t,
      score: 0,
      completedMolecules: [],
    }));
    tournamentState.recentEvents = [];
    io.emit('tournament-updated', tournamentState);
  });

  socket.on('disconnect', () => {
    tournamentState.connectedClients = io.engine.clientsCount;
    console.log(`[Socket.io] 🔴 Cliente desconectado: ${socket.id} (Restantes: ${tournamentState.connectedClients})`);
    io.emit('client-count-updated', tournamentState.connectedClients);
  });
});

// Función para obtener las IPs de la red local
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  return addresses;
}

// Iniciar servidor
httpServer.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIpAddresses();
  console.log('\n=============================================================');
  console.log('🧪 🧩 3D MOLBUILDER — SERVIDOR DE SINCRONIZACIÓN LOCAL LAN');
  console.log('   Universidad San Sebastián (USS) - Vinculación con el Medio');
  console.log('=============================================================');
  console.log(`📡 Puerto del Servidor Socket.io: ${PORT}`);
  console.log(`💻 Localhost: http://localhost:${PORT}`);
  if (localIps.length > 0) {
    console.log('🌐 Direcciones LAN disponibles para conectar mesas y proyector:');
    localIps.forEach((ip) => {
      console.log(`   👉 http://${ip}:${PORT}`);
      console.log(`   👉 Cliente Web Vite: http://${ip}:5173`);
    });
  } else {
    console.log('⚠️  No se detectaron adaptadores de red activos (Modo Offline Local).');
  }
  console.log('=============================================================\n');
});
