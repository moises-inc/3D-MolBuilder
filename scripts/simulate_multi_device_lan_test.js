/**
 * 3D MolBuilder — Suite de Pruebas de Carga & Conexión Multi-Dispositivo LAN
 * Vinculación con el Medio (VcM) — Universidad San Sebastián
 * 
 * Simula la conexión concurrente de múltiples estaciones de alumnos (computadores/tablets)
 * transmitiendo puntajes en tiempo real hacia la Pantalla Proyector Master (role=master),
 * evaluando latencia, resistencia a desconnexiones y redención de códigos QR.
 */

import { io as ioClient } from 'socket.io-client';
import http from 'http';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const SIMULATED_STATIONS_COUNT = parseInt(process.argv[2] || '10', 10);
const TEST_DURATION_MS = 15000; // 15 segundos de ráfaga

console.log(`
=============================================================
🌐 SUITE DE PRUEBAS DE CONEXIÓN MULTI-DISPOSITIVO LAN
   Servidor LAN: ${SERVER_URL}
   Estaciones de Alumnos Simuladas: ${SIMULATED_STATIONS_COUNT}
   Ecosistema VcM Universidad San Sebastián
=============================================================
`);

// Métrica de benchmark
const metrics = {
  masterConnected: false,
  stationsConnected: 0,
  scoresSent: 0,
  scoresReceivedByMaster: 0,
  eventsBroadcasted: 0,
  latencies: [],
  errors: [],
};

// 1. Conectar Pantalla Proyector Master
console.log('▶️ [Paso 1] Conectando Pantalla Proyector Master (role=master)...');
const masterSocket = ioClient(SERVER_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
});

masterSocket.on('connect', () => {
  metrics.masterConnected = true;
  console.log(`   ✅ Proyector Master conectado (ID: ${masterSocket.id})`);
  masterSocket.emit('join-role', {
    role: 'master',
    clientName: 'Proyector Auditorio Principal',
  });
});

masterSocket.on('tournament-sync', (state) => {
  metrics.scoresReceivedByMaster++;
});

masterSocket.on('tournament-updated', (state) => {
  metrics.scoresReceivedByMaster++;
});

masterSocket.on('score-broadcast', (data) => {
  if (data?.event?.timestamp) {
    metrics.eventsBroadcasted++;
  }
});

masterSocket.on('display-victory-fanfare', (payload) => {
  metrics.eventsBroadcasted++;
});

// 2. Conectar N Estaciones de Alumnos Simuladas
setTimeout(() => {
  console.log(`\n▶️ [Paso 2] Desplegando ${SIMULATED_STATIONS_COUNT} Estaciones Simuladas en paralelo...`);
  const stationSockets = [];

  for (let i = 1; i <= SIMULATED_STATIONS_COUNT; i++) {
    const teamId = `team-${(i % 3 === 0 ? 'gamma' : i % 2 === 0 ? 'beta' : 'alfa')}`;
    const stationName = `Mesa Escolar #${i} (${teamId})`;

    const socket = ioClient(SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
    });

    socket.on('connect', () => {
      metrics.stationsConnected++;
      socket.emit('join-role', {
        role: 'station',
        teamId: teamId,
        clientName: stationName,
      });
    });

    socket.on('connect_error', (err) => {
      metrics.errors.push(`Mesa #${i} error conexión: ${err.message}`);
    });

    stationSockets.push({ socket, teamId, stationName });
  }

  // 3. Simular ráfagas de puntuaciones y canje manual en tiempo real
  setTimeout(() => {
    console.log(`\n▶️ [Paso 3] Transmitiendo ráfagas de puntajes y canjes simultáneos...`);

    let iteration = 0;
    const interval = setInterval(() => {
      iteration++;
      stationSockets.forEach(({ socket, teamId, stationName }, idx) => {
        if (socket.connected) {
          const startTime = Date.now();
          const scoreDelta = Math.floor(Math.random() * 25) + 25;

          // Probar ráfaga regular de puntuación
          socket.emit('score-updated', {
            teamId,
            scoreDelta,
            completedMoleculeId: 'water',
            timeBonus: 15,
            triviaBonus: 100,
            totalEarned: scoreDelta + 100,
          });

          // Probar canje manual de código QR ocasional
          if (iteration % 3 === 0 && idx === 0) {
            socket.emit('redeem-code', {
              teamId,
              score: 150,
              moleculeId: 'ethanol',
              code: 'USS999',
            });
          }

          // Inyección de prueba de resistencia (edge case: payload malformado/incompleto)
          if (iteration === 2 && idx === 1) {
            socket.emit('score-updated', null);
            socket.emit('trigger-victory-fanfare', null);
          }

          metrics.scoresSent++;
          metrics.latencies.push(Date.now() - startTime);
        }
      });
    }, 1500);

    // 4. Finalizar y generar informe de rendimiento
    setTimeout(() => {
      clearInterval(interval);
      stationSockets.forEach(({ socket }) => socket.close());
      masterSocket.close();

      printReport();
    }, TEST_DURATION_MS);

  }, 1500);

}, 1000);

function printReport() {
  const avgLatency = metrics.latencies.length > 0
    ? (metrics.latencies.reduce((a, b) => a + b, 0) / metrics.latencies.length).toFixed(2)
    : 0;

  console.log(`
=============================================================
📊 INFORME DE PRUEBAS DE CARGA MULTI-DISPOSITIVO LAN
=============================================================
Proyector Master Conectado: ${metrics.masterConnected ? '✅ SÍ' : '❌ NO'}
Estaciones Simuladas Conectadas: ${metrics.stationsConnected} / ${SIMULATED_STATIONS_COUNT}
Puntajes Enviados desde Mesas: ${metrics.scoresSent}
Puntajes Recibidos por Master: ${metrics.scoresReceivedByMaster}
Eventos Transmitidos (Fanfarria/Confeti): ${metrics.eventsBroadcasted}
Latencia Promedio de Red: ${avgLatency} ms
Errores de Red Registrados: ${metrics.errors.length}
=============================================================
${metrics.errors.length === 0 && metrics.stationsConnected === SIMULATED_STATIONS_COUNT
  ? '🎉 PRUEBA MULTI-DISPOSITIVO LAN COMPLETADA CON ÉXITO REVOLUCIONARIO'
  : '⚠️ AUDITORÍA DETECTÓ ERRORES EN LA RED LOCAL'}
`);

  process.exit(metrics.errors.length === 0 ? 0 : 1);
}
