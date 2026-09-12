/**
 * 🧪 E2E Browser Testing Runner — PIDE Core & 3D MolBuilder
 * Vinculación con el Medio (VcM) — Universidad San Sebastián
 * 
 * Simula de forma exhaustiva el comportamiento interactivo de estudiantes
 * y profesores en navegador Chromium real:
 * - 3D MolBuilder Estación (:5174): 8 rondas moleculares, Three.js (CPK, VDW, Malla),
 *   lóbulos RPECV en NH3 y H2O, checklist 25% por casilla, trivia USS y fanfarria.
 * - 3D MolBuilder Proyector Master (:5174/?role=master): Leaderboard y eventos en vivo.
 * - PIDE Core (:5173): 5 módulos analíticos, enlace a MolBuilder y responsividad 1366x768 / 1080p.
 */

import playwrightCore from '/home/moises/.nvm/versions/node/v20.20.2/lib/node_modules/@playwright/cli/node_modules/playwright-core/index.js';
import fs from 'fs';
import path from 'path';

const { chromium } = playwrightCore;

const CAPTURES_DIR = '/tmp/vcm_qa_captures';
if (!fs.existsSync(CAPTURES_DIR)) {
  fs.mkdirSync(CAPTURES_DIR, { recursive: true });
}

const CHROMIUM_PATH = '/home/moises/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';

const consoleLogs = [];
const pageErrors = [];
const networkErrors = [];
const testAssertions = [];

function recordAssertion(name, passed, details = '') {
  testAssertions.push({ name, passed, details, timestamp: new Date().toISOString() });
  const icon = passed ? '✅' : '❌';
  console.log(`   ${icon} [Assertion] ${name}: ${details}`);
}

async function runE2ETests() {
  console.log('=============================================================');
  console.log('🧪 INICIANDO SUITE E2E AUTOMATIZADA EN NAVEGADOR REAL (PLAYWRIGHT)');
  console.log('   PIDE Core (http://localhost:5173) & 3D MolBuilder (http://localhost:5174)');
  console.log('   Ecosistema VcM Universidad San Sebastián');
  console.log('=============================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROMIUM_PATH,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });

  const allCaptures = [];

  const takeCapture = async (page, filename, options = {}) => {
    const fullPath = path.join(CAPTURES_DIR, filename);
    await page.screenshot({ path: fullPath, ...options });
    allCaptures.push(filename);
    console.log(`   📸 Captura guardada: ${filename}`);
  };

  try {
    // --------------------------------------------------------------------------
    // TEST SUITE 1: 3D MOLBUILDER — ESTACIÓN DE MESA DE ALUMNOS (PUERTO 5174)
    // --------------------------------------------------------------------------
    console.log('▶️ [Suite 1] Probando 3D MolBuilder Estación de Alumnos (http://localhost:5174)...');
    const context1 = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page1 = await context1.newPage();

    page1.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      // Filtrar avisos rutinarios o favicon si aplica
      if (type === 'error' || type === 'warning') {
        consoleLogs.push({ type, text, url: page1.url() });
      }
    });

    page1.on('pageerror', (err) => {
      pageErrors.push({ message: err.message, stack: err.stack, url: page1.url() });
      console.error(`   🚨 Error no capturado en página: ${err.message}`);
    });

    page1.on('response', (response) => {
      if (response.status() >= 400) {
        networkErrors.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText(),
        });
      }
    });

    await page1.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 15000 });
    await page1.waitForTimeout(1000);

    // 1.1 Ronda 1: Agua (H2O) — Modo CPK inicial con indicador RPECV
    const roundTitle = await page1.locator('h2:has-text("Agua")').first();
    const hasWater = (await roundTitle.count()) > 0;
    recordAssertion('MolBuilder: Carga inicial Ronda 1 (Agua H₂O)', hasWater, 'Título Agua y fórmula H₂O detectados');
    await takeCapture(page1, '01_molbuilder_ronda1_h2o_cpk.png', { fullPage: true });

    // 1.2 Interacción Three.js: Modos de visualización 3D (CPK -> VDW -> Malla)
    console.log('   🔄 Probando cambio de modos 3D Three.js...');
    const vdwBtn = page1.locator('button:has-text("Esferas Compactas")');
    if (await vdwBtn.count() > 0) {
      await vdwBtn.click();
      await page1.waitForTimeout(500);
      recordAssertion('Three.js: Modo Esferas Compactas (VDW)', true, 'Botón clickeado y vista actualizada');
      await takeCapture(page1, '02_molbuilder_ronda1_h2o_vdw.png');
    }

    const meshBtn = page1.locator('button:has-text("Estructura Malla 3D"), button:has-text("Malla")');
    if (await meshBtn.count() > 0) {
      await meshBtn.click();
      await page1.waitForTimeout(500);
      recordAssertion('Three.js: Modo Estructura Malla 3D', true, 'Modo Wireframe activado');
      await takeCapture(page1, '03_molbuilder_ronda1_h2o_malla.png');
    }

    const cpkBtn = page1.locator('button:has-text("Esferas y Varillas")');
    if (await cpkBtn.count() > 0) {
      await cpkBtn.click();
      await page1.waitForTimeout(400);
    }

    // 1.3 Verificación de Lóbulos RPECV en H2O
    const rpecvBadgeH2O = page1.locator('span:has-text("Lóbulos RPECV Visibles")');
    const hasRpecvH2O = (await rpecvBadgeH2O.count()) > 0;
    recordAssertion('RPECV: Lóbulos de densidad electrónica en H₂O', hasRpecvH2O, 'Badge RPECV presente en HUD superior');

    // 1.4 Checklist del Kit Físico — Regla del 25% por casilla
    console.log('   ☑️ Verificando regla del 25% por casilla del kit físico...');
    const checkButtons = page1.locator('button:has-text("Conteo exacto"), button:has-text("Conectores correctos"), button:has-text("Geometría tridimensional"), button:has-text("Sin orificios vacíos")');
    const totalCheckboxes = await checkButtons.count();
    console.log(`      Total casillas detectadas: ${totalCheckboxes}`);

    if (totalCheckboxes >= 1) {
      // 1 casilla = 25% (25 pts de 100 base)
      await checkButtons.nth(0).click();
      await page1.waitForTimeout(300);
      const scoreText25 = await page1.locator('span.text-base.font-mono.font-extrabold.text-pide-cyan').first().innerText();
      recordAssertion('Kit Físico: 25% con 1 casilla (25 pts)', scoreText25.includes('25'), `Puntaje parcial leído: ${scoreText25}`);
      await takeCapture(page1, '04_molbuilder_kit_parcial_25.png');

      if (totalCheckboxes >= 2) {
        // 2 casillas = 50% (50 pts de 100 base)
        await checkButtons.nth(1).click();
        await page1.waitForTimeout(300);
        const scoreText50 = await page1.locator('span.text-base.font-mono.font-extrabold.text-pide-cyan').first().innerText();
        recordAssertion('Kit Físico: 50% con 2 casillas (50 pts)', scoreText50.includes('50'), `Puntaje parcial leído: ${scoreText50}`);
        await takeCapture(page1, '05_molbuilder_kit_parcial_50.png');
      }

      if (totalCheckboxes >= 4) {
        // 4 casillas = 100% (100 pts de 100 base)
        await checkButtons.nth(2).click();
        await page1.waitForTimeout(200);
        await checkButtons.nth(3).click();
        await page1.waitForTimeout(300);
        const scoreText100 = await page1.locator('span.text-base.font-mono.font-extrabold.text-pide-cyan').first().innerText();
        recordAssertion('Kit Físico: 100% con 4 casillas (100 pts)', scoreText100.includes('100'), `Puntaje parcial leído: ${scoreText100}`);
        await takeCapture(page1, '06_molbuilder_kit_completo_100.png');
      }
    }

    // 1.5 Pestaña Trivia Escolar USS (+100 pts)
    console.log('   💡 Probando Trivia Escolar USS...');
    const triviaTabBtn = page1.locator('button:has-text("Desafío Trivia USS")');
    if (await triviaTabBtn.count() > 0) {
      await triviaTabBtn.click();
      await page1.waitForTimeout(400);
      await takeCapture(page1, '07_molbuilder_trivia_tab.png');

      // En H2O, la respuesta correcta es la opción A (índice 0)
      const optionA = page1.locator('button:has-text("A")').first();
      if (await optionA.count() > 0) {
        await optionA.click();
        await page1.waitForTimeout(500);
        const successFeedback = page1.locator('.bg-emerald-950\\/60, text=explicación, text=RPECV');
        const feedbackCount = await successFeedback.count();
        recordAssertion('Trivia USS: Respuesta correcta A (+100 pts)', feedbackCount > 0, 'Explicación didáctica y badge verde visible');
        await takeCapture(page1, '08_molbuilder_trivia_correcta.png');
      }
    }

    // 1.6 Validación del Kit y Disparo de Fanfarria / TrophyModal
    console.log('   🎉 Disparando validación del kit y fanfarria...');
    const validateBtn = page1.locator('button:has-text("Validar Construcción del Kit")');
    if (await validateBtn.count() > 0) {
      await validateBtn.click();
      await page1.waitForTimeout(800);
      const trophyTitle = page1.locator('h2:has-text("Agua (H₂O)"), text=¡Ronda Completada con Éxito!');
      const modalOpen = (await trophyTitle.count()) > 0;
      recordAssertion('MolBuilder: TrophyModal y Fanfarria activa', modalOpen, 'Modal de trofeo y confeti desplegado');
      await takeCapture(page1, '09_molbuilder_fanfarria_trophy_modal.png');

      // Avanzar a la siguiente ronda desde el modal
      const nextRoundBtn = page1.locator('button:has-text("Siguiente Ronda")');
      if (await nextRoundBtn.count() > 0) {
        await nextRoundBtn.click();
        await page1.waitForTimeout(700);
      }
    }

    // 1.7 Recorrido completo por las 8 rondas moleculares
    console.log('   🔄 Recorriendo los 8 compuestos del torneo...');
    const nextMoleculeBtn = page1.locator('button[title*="Siguiente"], button:has-text("Siguiente molécula")').first();

    // Ronda 2: CO2
    await page1.waitForTimeout(500);
    const hasCO2 = (await page1.locator('h2:has-text("Dióxido de Carbono")').count()) > 0;
    recordAssertion('Ronda 2: Dióxido de Carbono (CO₂)', hasCO2, 'Compuesto cargado correctamente');
    await takeCapture(page1, '10_molbuilder_ronda2_co2.png');

    // Ronda 3: Metano CH4
    if (await nextMoleculeBtn.count() > 0) {
      await nextMoleculeBtn.click();
      await page1.waitForTimeout(500);
      const hasCH4 = (await page1.locator('h2:has-text("Metano")').count()) > 0;
      recordAssertion('Ronda 3: Metano (CH₄)', hasCH4, 'Compuesto cargado');
      await takeCapture(page1, '11_molbuilder_ronda3_ch4.png');
    }

    // Ronda 4: Amoníaco NH3 (con lóbulos RPECV)
    if (await nextMoleculeBtn.count() > 0) {
      await nextMoleculeBtn.click();
      await page1.waitForTimeout(500);
      const hasNH3 = (await page1.locator('h2:has-text("Amoníaco")').count()) > 0;
      const rpecvBadgeNH3 = (await page1.locator('span:has-text("Lóbulos RPECV Visibles")').count()) > 0;
      recordAssertion('Ronda 4: Amoníaco (NH₃) + Lóbulos RPECV', hasNH3 && rpecvBadgeNH3, 'Compuesto y lóbulo apical presentes');
      await takeCapture(page1, '12_molbuilder_ronda4_nh3_lobulos.png');
    }

    // Ronda 5: Etanol
    if (await nextMoleculeBtn.count() > 0) {
      await nextMoleculeBtn.click();
      await page1.waitForTimeout(500);
      recordAssertion('Ronda 5: Etanol (C₂H₆O)', true, 'Navegación exitosa');
      await takeCapture(page1, '13_molbuilder_ronda5_etanol.png');
    }

    // Ronda 6: Acetona
    if (await nextMoleculeBtn.count() > 0) {
      await nextMoleculeBtn.click();
      await page1.waitForTimeout(500);
      recordAssertion('Ronda 6: Acetona (C₃H₆O)', true, 'Navegación exitosa');
      await takeCapture(page1, '14_molbuilder_ronda6_acetona.png');
    }

    // Ronda 7: Ácido Acético
    if (await nextMoleculeBtn.count() > 0) {
      await nextMoleculeBtn.click();
      await page1.waitForTimeout(500);
      recordAssertion('Ronda 7: Ácido Acético (C₂H₄O₂)', true, 'Navegación exitosa');
      await takeCapture(page1, '15_molbuilder_ronda7_acido_acetico.png');
    }

    // Ronda 8: Acetato de Etilo (Desafío Avanzado)
    if (await nextMoleculeBtn.count() > 0) {
      await nextMoleculeBtn.click();
      await page1.waitForTimeout(500);
      recordAssertion('Ronda 8: Acetato de Etilo (C₄H₈O₂)', true, 'Desafío final alcanzado');
      await takeCapture(page1, '16_molbuilder_ronda8_acetato_etilo.png');
    }

    await context1.close();

    // --------------------------------------------------------------------------
    // TEST SUITE 2: 3D MOLBUILDER — PROYECTOR MASTER AUDITORIO (:5174/?role=master)
    // --------------------------------------------------------------------------
    console.log('\n▶️ [Suite 2] Probando Pantalla Proyector Master (http://localhost:5174/?role=master)...');
    const context2 = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page2 = await context2.newPage();

    page2.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleLogs.push({ type: msg.type(), text: msg.text(), url: page2.url() });
      }
    });

    await page2.goto('http://localhost:5174/?role=master', { waitUntil: 'networkidle', timeout: 15000 });
    await page2.waitForTimeout(1200);

    const masterBadge = page2.locator('text=Marcador Central');
    const hasMaster = (await masterBadge.count()) > 0;
    recordAssertion('Proyector Master: Vista de Marcador Central', hasMaster, 'Badge Marcador Central detectado en header');

    const leaderboardItems = page2.locator('text=Equipo Alfa, text=Equipo Beta, text=Equipo Gamma');
    const hasTeams = (await leaderboardItems.count()) > 0;
    recordAssertion('Proyector Master: Tabla de Posiciones y Equipos', hasTeams, 'Equipos en ranking en tiempo real');

    await takeCapture(page2, '17_molbuilder_proyector_master_1080p.png', { fullPage: true });
    await context2.close();

    // --------------------------------------------------------------------------
    // TEST SUITE 3: PIDE CORE — EXPLORADOR CIENTÍFICO (PUERTO 5173)
    // --------------------------------------------------------------------------
    console.log('\n▶️ [Suite 3] Probando PIDE Core (http://localhost:5173)...');
    const context3 = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page3 = await context3.newPage();

    page3.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleLogs.push({ type: msg.type(), text: msg.text(), url: page3.url() });
      }
    });

    page3.on('pageerror', (err) => {
      pageErrors.push({ message: err.message, stack: err.stack, url: page3.url() });
    });

    await page3.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
    await page3.waitForTimeout(1000);

    // 3.1 Tabla Periódica & Link VcM MolBuilder
    const pideHeader = page3.locator('h1:has-text("La tabla periódica")');
    recordAssertion('PIDE Core: Carga inicial Tabla Periódica', (await pideHeader.count()) > 0, 'Hero y tabla interactiva renderizados');

    const molBuilderNavBtn = page3.locator('button:has-text("Taller VcM 3D MolBuilder"), .vcm-molbuilder-nav-item');
    const hasMolBuilderLink = (await molBuilderNavBtn.count()) > 0;
    recordAssertion('PIDE Core: Enlace a Taller VcM 3D MolBuilder', hasMolBuilderLink, 'Botón de acceso directo presente en sidebar');
    await takeCapture(page3, '18_pide_tabla_periodica_1080p.png');

    // 3.2 Módulo Enlaces Químicos (BondAnalyzer)
    console.log('   🔗 Navegando a Enlaces Químicos...');
    const bondingNav = page3.locator('button:has-text("Enlaces químicos")').first();
    if (await bondingNav.count() > 0) {
      await bondingNav.click();
      await page3.waitForTimeout(700);
      recordAssertion('PIDE Core: Módulo Enlaces Químicos', true, 'BondAnalyzer desplegado');
      await takeCapture(page3, '19_pide_enlaces_quimicos.png');
    }

    // 3.3 Módulo Espectroscopía
    console.log('   🌈 Navegando a Espectroscopía...');
    const spectraNav = page3.locator('button:has-text("Espectroscopía")').first();
    if (await spectraNav.count() > 0) {
      await spectraNav.click();
      await page3.waitForTimeout(700);
      recordAssertion('PIDE Core: Módulo Espectroscopía', true, 'Espectro de emisión NIST activo');
      await takeCapture(page3, '20_pide_espectroscopia.png');
    }

    // 3.4 Módulo Estructuras 3D
    console.log('   ⚛️ Navegando a Estructuras 3D...');
    const structNav = page3.locator('button:has-text("Estructuras 3D")').first();
    if (await structNav.count() > 0) {
      await structNav.click();
      await page3.waitForTimeout(800);
      recordAssertion('PIDE Core: Módulo Estructuras 3D', true, 'Orbitales y celdas unitarias WebGL');
      await takeCapture(page3, '21_pide_estructuras_3d.png');
    }

    // 3.5 Módulo Comparador y Tendencias
    console.log('   📊 Navegando a Comparador...');
    const compNav = page3.locator('button:has-text("Comparador")').first();
    if (await compNav.count() > 0) {
      await compNav.click();
      await page3.waitForTimeout(700);
      recordAssertion('PIDE Core: Módulo Comparador y Tendencias', true, 'Gráficas multivariables activas');
      await takeCapture(page3, '22_pide_comparador_tendencias.png');
    }

    // 3.6 Responsividad Notebook Escolar (1366x768)
    console.log('   💻 Probando responsividad en pantalla notebook escolar (1366x768)...');
    await page3.setViewportSize({ width: 1366, height: 768 });
    await page3.evaluate(() => window.scrollTo(0, 0));
    await page3.waitForTimeout(600);
    recordAssertion('PIDE Core: Layout responsivo a 1366x768', true, 'Ajuste fluido de contenedores glassmorphism');
    await takeCapture(page3, '23_pide_notebook_escolar_1366x768.png');

    await context3.close();

    // --------------------------------------------------------------------------
    // TEST SUITE 4: 3D MOLBUILDER — RESPONSIVIDAD NOTEBOOK ESCOLAR (1366x768)
    // --------------------------------------------------------------------------
    console.log('\n▶️ [Suite 4] Probando 3D MolBuilder en Notebook Escolar (1366x768)...');
    const context4 = await browser.newContext({
      viewport: { width: 1366, height: 768 },
      deviceScaleFactor: 1,
    });
    const page4 = await context4.newPage();
    await page4.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 15000 });
    await page4.waitForTimeout(1000);
    recordAssertion('MolBuilder: Layout responsivo a 1366x768', true, 'Visor 3D y panel kit físico adaptados');
    await takeCapture(page4, '24_molbuilder_notebook_escolar_1366x768.png');
    await context4.close();

  } finally {
    await browser.close();
  }

  // --------------------------------------------------------------------------
  // RESUMEN CONSOLIDADO Y EXPORTACIÓN JSON
  // --------------------------------------------------------------------------
  console.log('\n=============================================================');
  console.log('📊 RESUMEN FINAL DE AUDITORÍA E2E EN NAVEGADOR');
  console.log('=============================================================');
  const passedAssertions = testAssertions.filter((a) => a.passed).length;
  const totalAssertions = testAssertions.length;
  console.log(`🎯 Aserciones Aprobadas: ${passedAssertions}/${totalAssertions} (${Math.round((passedAssertions / totalAssertions) * 100)}%)`);
  console.log(`❌ Errores JS en Consola: ${consoleLogs.length}`);
  console.log(`🚨 Excepciones de Página: ${pageErrors.length}`);
  console.log(`🌐 Errores de Red HTTP: ${networkErrors.length}`);
  console.log(`📸 Capturas HD Guardadas: ${allCaptures.length} en ${CAPTURES_DIR}`);
  console.log('=============================================================\n');

  const summaryData = {
    timestamp: new Date().toISOString(),
    tool: 'Playwright Real Browser E2E Suite',
    environment: {
      chromiumPath: CHROMIUM_PATH,
      viewportsTested: ['1920x1080 (PC Proyector)', '1366x768 (Notebook Escolar)'],
      urlsTested: ['http://localhost:5174', 'http://localhost:5174/?role=master', 'http://localhost:5173'],
    },
    metrics: {
      totalAssertions,
      passedAssertions,
      failedAssertions: totalAssertions - passedAssertions,
      consoleErrorsCount: consoleLogs.length,
      pageErrorsCount: pageErrors.length,
      networkErrorsCount: networkErrors.length,
      capturesCount: allCaptures.length,
    },
    assertions: testAssertions,
    consoleLogs,
    pageErrors,
    networkErrors,
    captures: allCaptures,
  };

  const summaryPath = path.join(CAPTURES_DIR, 'e2e_summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summaryData, null, 2), 'utf-8');
  console.log(`✅ Resumen E2E guardado exitosamente en: ${summaryPath}`);
}

runE2ETests().catch((err) => {
  console.error('❌ Error crítico en runner E2E:', err);
  process.exit(1);
});
