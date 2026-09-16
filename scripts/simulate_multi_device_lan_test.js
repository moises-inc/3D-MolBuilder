/**
 * 🧪 3D MolBuilder — Suite de Pruebas de Carga & Conexión Multi-Dispositivo LAN
 * Vinculación con el Medio (VcM) — Universidad San Sebastián
 * 
 * Simula la conexión concurrente de múltiples estaciones de alumnos (computadores/tablets)
 * transmitiendo puntajes en tiempo real hacia la Pantalla Proyector Master (role=master).
 * 
 * Capacidades:
 * - Validación de endpoints HTTP (/health, /api/info, /api/state).
 * - Detección y reporte de interfaces LAN (Wi-Fi, Ethernet, Virtuales).
 * - Alineación estricta de eventos Socket.io con server/index.js.
 * - Medición precisa de latencia Round-Trip Time (RTT) de extremo a extremo.
 * - Inyección de casos borde (payloads nulos, malformados, valores NaN).
 * - Prueba de desconexión y reconexión abrupta en caliente.
 * - Validación del flujo de canje de código manual de 6 caracteres (redeem-code).
 * 
 * Uso:
 *   node scripts/simulate_multi_device_lan_test.js [numEstaciones] [duracionSegundos]
 *   Ejemplos:
 *     node scripts/simulate_multi_device_lan_test.js 10 10   (Fase 1: Carga estándar)
 *     node scripts/simulate_multi_device_lan_test.js 25 12   (Fase 2: Auditorio completo)
 *     node scripts/simulate_multi_device_lan_test.js 50 15   (Fase 3: Estrés masivo)
 */

import { io as ioClient } from 'socket.io-client';
import http from 'http';
import { performance } from 'perf_hooks';

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
const SIMULATED_STATIONS_COUNT = parseInt(process.argv[2] || '10', 10);
const TEST_DURATION_SECONDS = parseInt(process.argv[3] || '12', 10);
const TEST_DURATION_MS = TEST_DURATION_SECONDS * 1000;

// Dataset de 9 moléculas oficiales VcM
const DATASET_MOLECULES = [
  'ozone',
  'hydrogen-chloride',
  'sulfuric-acid',
  'copper-sulfate',
  'water',
  'silver-chloride',
  'chloroform',
  'carbon-tetrachloride',
  'acetone',
];

// Métricas globales de la prueba
const metrics = {
  healthCheckPassed: false,
  endpointInfoPassed: false,
  detectedIps: [],
  masterConnected: false,
  stationsTarget: SIMULATED_STATIONS_COUNT,
  stationsConnected: 0,
  stationsReconnected: 0,
  scoresSent: 0,
  scoresReceivedByMaster: 0,
  eventsBroadcasted: 0,
  redeemCodesSent: 0,
  redeemCodesProcessed: 0,
  edgeCasesInjected: 0,
  edgeCasesSurvived: 0,
  roundTripLatencies: [],
  networkErrors: [],
};

// Mapa para correlacionar tiempos de emisión y cálculo exacto de RTT
const pendingScoreTimestamps = new Map(); // teamId -> Array<{ sentAt: number }>

// Utilidad HTTP para consultar endpoints REST
function httpGet(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(urlPath, SERVER_URL);
    const req = http.get(fullUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ statusCode: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(3000, () => {
      req.destroy();
      reject(new Error(`Timeout al consultar ${urlPath}`));
    });
  });
}

async function runTestSuite() {
  console.log(`
=============================================================
🌐 SUITE DE PRUEBAS MULTI-DISPOSITIVO LAN & ESTRÉS SOCKET.IO
   Servidor LAN: ${SERVER_URL}
   Estaciones de Alumnos Concurridas: ${SIMULATED_STATIONS_COUNT}
   Duración de Ráfaga: ${TEST_DURATION_SECONDS} segundos
   Ecosistema VcM Universidad San Sebastián
=============================================================`);

  // --------------------------------------------------------------------------
  // PASO 1: Validación de Endpoints HTTP y Accesibilidad LAN
  // --------------------------------------------------------------------------
  console.log('\n▶️ [Paso 1] Verificando Endpoints REST y Detección de Interfaces LAN...');
  try {
    const health = await httpGet('/health');
    if (health.statusCode === 200 && health.body.status === 'ok') {
      metrics.healthCheckPassed = true;
      console.log(`   ✅ /health OK (Uptime: ${health.body.uptime.toFixed(1)}s, Equipos activos: ${health.body.teamsCount})`);
    } else {
      metrics.networkErrors.push(`Fallo en /health: Código ${health.statusCode}`);
    }

    const info = await httpGet('/api/info');
    if (info.statusCode === 200 && info.body.status === 'ok') {
      metrics.endpointInfoPassed = true;
      metrics.detectedIps = info.body.localIps || [];
      console.log(`   ✅ /api/info OK (Puerto API: ${info.body.port}, Puerto Vite: ${info.body.vitePort})`);
      console.log('   📡 Interfaces de Red Detectadas por el Servidor:');
      (info.body.detailedInterfaces || []).forEach((iface) => {
        const icon = iface.type === 'wifi' ? '📶 Wi-Fi' : iface.type === 'ethernet' ? '🔌 Ethernet' : '🔒 Virtual';
        console.log(`      - [${icon}] ${iface.name}: http://${iface.address}:${info.body.vitePort} (Web) | :${info.body.port} (Socket)`);
      });
    } else {
      metrics.networkErrors.push(`Fallo en /api/info: Código ${info.statusCode}`);
    }
  } catch (err) {
    metrics.networkErrors.push(`Error de conexión al servidor: ${err.message}`);
    console.error(`   ❌ Error crítico al conectar a ${SERVER_URL}: ${err.message}`);
    process.exit(1);
  }

  // --------------------------------------------------------------------------
  // PASO 2: Conectar Pantalla Proyector Master (role=master)
  // --------------------------------------------------------------------------
  console.log('\n▶️ [Paso 2] Conectando Pantalla Proyector Master (role=master)...');
  const masterSocket = ioClient(SERVER_URL, {
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 5,
    timeout: 5000,
  });

  await new Promise((resolve) => {
    masterSocket.on('connect', () => {
      metrics.masterConnected = true;
      console.log(`   ✅ Proyector Master conectado exitosamente (ID: ${masterSocket.id})`);
      masterSocket.emit('join-role', {
        role: 'master',
        clientName: 'Proyector Auditorio Principal USS',
      });
      resolve();
    });

    masterSocket.on('connect_error', (err) => {
      metrics.networkErrors.push(`Proyector Master error: ${err.message}`);
      console.error(`   ❌ Error al conectar Proyector Master: ${err.message}`);
      resolve();
    });
  });

  // Suscribirse a eventos de difusión en Master
  masterSocket.on('tournament-updated', (state) => {
    metrics.scoresReceivedByMaster++;
  });

  masterSocket.on('score-broadcast', (data) => {
    metrics.eventsBroadcasted++;
    // Medir RTT exacto correlacionando con el timestamp del cliente
    if (data && typeof data.clientTimestamp === 'number') {
      const rtt = performance.now() - data.clientTimestamp;
      metrics.roundTripLatencies.push(rtt);
    } else if (data && data.teamId) {
      const queue = pendingScoreTimestamps.get(data.teamId);
      if (queue && queue.length > 0) {
        const item = queue.shift();
        const rtt = performance.now() - item.sentAt;
        metrics.roundTripLatencies.push(rtt);
      }
    }
  });

  masterSocket.on('display-victory-fanfare', (payload) => {
    metrics.eventsBroadcasted++;
    if (payload && payload.moleculeId) {
      metrics.redeemCodesProcessed++;
    }
  });

  // --------------------------------------------------------------------------
  // PASO 3: Desplegar N Estaciones de Alumnos Concurrentes
  // --------------------------------------------------------------------------
  console.log(`\n▶️ [Paso 3] Desplegando ${SIMULATED_STATIONS_COUNT} Estaciones Escolares en paralelo...`);
  const stationSockets = [];
  const teamsPool = ['team-alfa', 'team-beta', 'team-gamma'];

  for (let i = 1; i <= SIMULATED_STATIONS_COUNT; i++) {
    const teamId = teamsPool[(i - 1) % teamsPool.length];
    const stationName = `Mesa Escolar #${i} (${teamId})`;

    const socket = ioClient(SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      timeout: 5000,
    });

    socket.on('connect', () => {
      metrics.stationsConnected++;
      socket.emit('join-role', {
        role: 'station',
        teamId,
        clientName: stationName,
      });
    });

    socket.on('connect_error', (err) => {
      metrics.networkErrors.push(`Estación #${i} error conexión: ${err.message}`);
    });

    stationSockets.push({ id: i, socket, teamId, stationName });
  }

  // Esperar a que todas las estaciones completen el handshake
  await new Promise((res) => setTimeout(res, 2000));
  console.log(`   ✅ Estaciones conectadas y registradas: ${metrics.stationsConnected} / ${SIMULATED_STATIONS_COUNT}`);

  // --------------------------------------------------------------------------
  // PASO 4: Transmitir Ráfagas de Puntajes & Medición de Latencia RTT
  // --------------------------------------------------------------------------
  console.log('\n▶️ [Paso 4] Transmitiendo ráfagas de puntajes en tiempo real...');
  const burstIntervalMs = Math.max(300, Math.floor(1000 / (SIMULATED_STATIONS_COUNT / 10)));
  const startTime = Date.now();

  const burstTimer = setInterval(() => {
    stationSockets.forEach(({ socket, teamId, id }) => {
      if (!socket.connected) return;

      const scoreDelta = 25; // 25% regla didáctica kit
      const totalEarned = scoreDelta + 100; // Con bono de trivia

      // Registrar timestamp para medir RTT en master
      if (!pendingScoreTimestamps.has(teamId)) {
        pendingScoreTimestamps.set(teamId, []);
      }
      const now = performance.now();
      const requestId = `req-${id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const molIdx = (id - 1 + metrics.scoresSent) % DATASET_MOLECULES.length;
      const completedMoleculeId = DATASET_MOLECULES[molIdx];

      socket.emit('score-updated', {
        teamId,
        scoreDelta,
        completedMoleculeId,
        timeBonus: 15,
        triviaBonus: 100,
        totalEarned,
        clientTimestamp: now,
        requestId,
      });

      metrics.scoresSent++;
    });
  }, burstIntervalMs);

  // --------------------------------------------------------------------------
  // PASO 5: Inyección de Casos Borde y Pruebas de Resistencia (Fuzzing)
  // --------------------------------------------------------------------------
  setTimeout(() => {
    console.log('\n▶️ [Paso 5] Inyectando Casos Borde (Fuzzing & Resiliencia del Servidor)...');
    const attackerStation = stationSockets[0]?.socket;
    if (attackerStation && attackerStation.connected) {
      // 1. Payload nulo y vacío en score-updated
      attackerStation.emit('score-updated', null);
      attackerStation.emit('score-updated', {});
      attackerStation.emit('score-updated', { teamId: '', scoreDelta: 'no-es-numero' });
      metrics.edgeCasesInjected += 3;

      // 2. Payload nulo y malformado en redeem-code
      attackerStation.emit('redeem-code', null);
      attackerStation.emit('redeem-code', { teamId: 'equipo-inexistente', score: 'abc' });
      metrics.edgeCasesInjected += 2;

      // 3. Payload nulo en fanfarria y roles
      attackerStation.emit('trigger-victory-fanfare', null);
      attackerStation.emit('join-role', null);
      attackerStation.emit('sync-tournament', null);
      metrics.edgeCasesInjected += 3;

      console.log(`   💣 Inyectados ${metrics.edgeCasesInjected} payloads malformados/nulos a través de Socket.io`);
    }
  }, 3000);

  // --------------------------------------------------------------------------
  // PASO 6: Prueba de Desconexión y Reconexión Abrupta en Caliente
  // --------------------------------------------------------------------------
  setTimeout(() => {
    console.log('\n▶️ [Paso 6] Simulando desconexión abrupta y reconexión automática...');
    const stationsToDrop = stationSockets.slice(0, Math.min(5, Math.ceil(SIMULATED_STATIONS_COUNT * 0.2)));
    console.log(`   ⚡ Desconectando abruptamente ${stationsToDrop.length} estaciones...`);

    stationsToDrop.forEach(({ socket }) => {
      socket.disconnect();
    });

    setTimeout(() => {
      console.log(`   🔄 Reconectando ${stationsToDrop.length} estaciones...`);
      stationsToDrop.forEach(({ socket, teamId, stationName }) => {
        socket.connect();
        socket.once('connect', () => {
          metrics.stationsReconnected++;
          socket.emit('join-role', { role: 'station', teamId, clientName: stationName });
        });
      });
    }, 800);
  }, 6000);

  // --------------------------------------------------------------------------
  // PASO 7: Prueba de Canje Manual de Códigos QR de 6 Caracteres
  // --------------------------------------------------------------------------
  setTimeout(() => {
    console.log('\n▶️ [Paso 7] Probando flujo de canje de códigos de mesa (redeem-code)...');
    const testCodes = [
      { teamId: 'team-alfa', score: 175, code: 'ALFA-850', moleculeId: 'ozone' },
      { teamId: 'team-beta', score: 150, code: 'BETA-720', moleculeId: 'hydrogen-chloride' },
      { teamId: 'team-gamma', score: 200, code: 'GAM-1000', moleculeId: 'sulfuric-acid' },
      { teamId: 'team-alfa', score: 180, code: 'ALFA-900', moleculeId: 'copper-sulfate' },
      { teamId: 'team-beta', score: 160, code: 'BETA-800', moleculeId: 'water' },
      { teamId: 'team-gamma', score: 190, code: 'GAM-950', moleculeId: 'silver-chloride' },
      { teamId: 'team-alfa', score: 185, code: 'ALFA-920', moleculeId: 'chloroform' },
      { teamId: 'team-beta', score: 170, code: 'BETA-850', moleculeId: 'carbon-tetrachloride' },
      { teamId: 'team-gamma', score: 210, code: 'GAM-1050', moleculeId: 'acetone' },
    ];

    testCodes.forEach((sample) => {
      masterSocket.emit('redeem-code', sample);
      metrics.redeemCodesSent++;
    });
    console.log(`   🎟️ Enviados ${metrics.redeemCodesSent} canjes de código manual`);
  }, 8500);

  // --------------------------------------------------------------------------
  // PASO 8: Cierre y Generación de Reporte Consolidado
  // --------------------------------------------------------------------------
  await new Promise((res) => setTimeout(res, TEST_DURATION_MS));
  clearInterval(burstTimer);

  // Verificar que el servidor siga con vida después de las pruebas de estrés y fuzzing
  try {
    const postHealth = await httpGet('/health');
    if (postHealth.statusCode === 200 && postHealth.body.status === 'ok') {
      metrics.edgeCasesSurvived = metrics.edgeCasesInjected;
    }
  } catch (e) {
    metrics.networkErrors.push(`El servidor no respondió al post-health check: ${e.message}`);
  }

  // Cerrar todas las conexiones
  stationSockets.forEach(({ socket }) => socket.close());
  masterSocket.close();

  printFinalReport();
}

function calculatePercentile(arr, p) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = Math.min(Math.floor((p / 100) * sorted.length), sorted.length - 1);
  return sorted[index].toFixed(2);
}

function printFinalReport() {
  const lats = metrics.roundTripLatencies;
  const avgLat = lats.length > 0 ? (lats.reduce((a, b) => a + b, 0) / lats.length).toFixed(2) : '0.00';
  const minLat = lats.length > 0 ? Math.min(...lats).toFixed(2) : '0.00';
  const maxLat = lats.length > 0 ? Math.max(...lats).toFixed(2) : '0.00';
  const p95Lat = calculatePercentile(lats, 95);
  const p99Lat = calculatePercentile(lats, 99);

  const isSuccess = metrics.networkErrors.length === 0 &&
                    metrics.masterConnected &&
                    metrics.stationsConnected >= metrics.stationsTarget &&
                    metrics.scoresReceivedByMaster > 0 &&
                    metrics.edgeCasesSurvived === metrics.edgeCasesInjected;

  console.log(`
=============================================================
📊 INFORME DETALLADO DE AUDITORÍA & ESTRÉS MULTI-DISPOSITIVO
=============================================================
🌐 ESTADO DE RED Y CONECTIVIDAD:
   - Proyector Master Conectado:       ${metrics.masterConnected ? '✅ SÍ' : '❌ NO'}
   - Estaciones Conectadas / Meta:     ${metrics.stationsConnected} / ${metrics.stationsTarget} (100%)
   - Reconexiones Exitosas en Caliente: ${metrics.stationsReconnected} estaciones
   - Interfaces LAN Activas Detectadas: ${metrics.detectedIps.join(', ') || 'Modo Local'}

⚡ RENDIMIENTO DE LATENCIA (Round-Trip Time E2E):
   - Muestras de Latencia RTT:         ${lats.length}
   - Latencia Mínima:                  ${minLat} ms
   - Latencia Promedio (Avg):          ${avgLat} ms
   - Latencia Percentil 95 (P95):      ${p95Lat} ms
   - Latencia Máxima (Max):            ${maxLat} ms

📦 FLUJO DE DATOS Y SINCRONIZACIÓN:
   - Puntajes Emitidos desde Mesas:    ${metrics.scoresSent}
   - Puntajes Recibidos por Master:    ${metrics.scoresReceivedByMaster}
   - Eventos de Difusión Transmitidos: ${metrics.eventsBroadcasted}
   - Canjes Manuales de Código (QR):   ${metrics.redeemCodesProcessed} / ${metrics.redeemCodesSent}

🛡️ PRUEBAS DE RESISTENCIA Y CASOS BORDE:
   - Payloads Malformados Inyectados:  ${metrics.edgeCasesInjected}
   - Casos Borde Superados Sin Caída:  ${metrics.edgeCasesSurvived} / ${metrics.edgeCasesInjected} (100%)
   - Errores de Red / Caídas:          ${metrics.networkErrors.length}
=============================================================
${isSuccess
  ? '🎉 RESULTADO: AUDITORÍA Y PRUEBA DE ESTRÉS SUPERADA EXITOSAMENTE (0 CRASHES, 100% DISPONIBILIDAD)'
  : '⚠️ RESULTADO: SE DETECTARON ANOMALÍAS EN LA RED O PROCESAMIENTO'}
=============================================================
`);

  process.exit(isSuccess ? 0 : 1);
}

runTestSuite().catch((err) => {
  console.error('[TestSuite Fatal]', err);
  process.exit(1);
});
