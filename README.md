# 🧪 🧩 3D MolBuilder

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.168-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind-v3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![E2E Suite](https://img.shields.io/badge/Playwright%20E2E-26%2F26%20PASS%20(100%25)-38ef7d?logo=playwright&logoColor=white)](qa_e2e_report.md)
[![Offline Deterministic](https://img.shields.io/badge/Runtime-100%25%20offline%20%7C%20deterministic-111827)](docs/architecture.md)
[![License AGPLv3](https://img.shields.io/badge/License-AGPLv3-00e676.svg)](LICENSE)

**3D MolBuilder** es una plataforma interactiva tridimensional y aplicación gamificada de modelado molecular, desarrollada específicamente para ferias científicas escolares y talleres de extensión de **Vinculación con el Medio (VcM)** de la **Universidad San Sebastián (USS)**.

Permite a estudiantes de educación media (3° y 4° Medio) interactuar en equipo visualizando estructuras moleculares 3D analíticas con rigor científico (CPK, Van der Waals, Malla 3D), consultar fichas didácticas de química cotidiana y replicar el ensamblado físico con kits de esferas y conectores moleculares en rondas contra reloj.

---

## 🏛️ Créditos y Autores

* **Autor Principal & Arquitecto de Software:** Moisés Amundarain Romero
* **Co-Autores Científicos:** 
  - **Gamaliel Cisternas Herrera** (Estudiante de Química y Farmacia USS)
  - **Diego Pavez Gallardo** (Estudiante de Química y Farmacia USS)
* **Profesora Guía & Líder Académica:** **Dra. Fabiola Acuña Sanhueza** (Docente de Química General USS)

---

## ⚡ Características Principales

### 1. 🎨 Visor Gráfico 3D Analítico (Three.js) & Preservación CPK
- **3 Modos de Renderizado Dinámico:**
  - **Esferas y Varillas (CPK):** Modelado proporcional con enlaces analíticos calculados por orientación de cuaterniones.
  - **Espacio Lleno (Van der Waals):** Esferas aumentadas según sus radios atómicos de van der Waals relativos para ilustrar volumen de exclusión estérico.
  - **Malla Alámbrica 3D (Wireframe):** Estructura poligonal geométrica para análisis de simetría y ejes de enlace.
- **Código Cromático Internacional CPK Estricto:**
  - Carbono (Gris carbón `#262626`)
  - Hidrógeno (Blanco `#FFFFFF`)
  - Oxígeno (Rojo brillante `#EF4444`)
  - Nitrógeno (Azul cian `#3B82F6`)
  - Cloro (Verde esmeralda `#10B981`)
  - Azufre (Amarillo ámbar `#F59E0B`)
- **Lóbulos de Densidad Electrónica RPECV (VSEPR):** Visualización volumétrica de pares de electrones no enlazantes mediante mallas translúcidas cian (`#5de1e5`, `MeshPhysicalMaterial`), ilustrando el par solitario apical en $\text{NH}_3$ y los dos pares tetraédricos en $\text{H}_2\text{O}$ con repulsión angular ($107.3^\circ$ y $104.5^\circ$).
- **Inspección Atómica con Raycasting:** Detección de clics en tiempo real para consultar el símbolo químico, radio covalente e hibridación orbital ($sp^3$, $sp^2$, $sp$).
- **Exportación Directa PNG HD:** Botón integrado para capturar imágenes en alta definición del modelo 3D sin depender de herramientas externas.

### 2. 🌌 Fondo Procedural 3D (`RecursiveErosionBackground`) & Estética OLED
- **Campo de 22.000 Partículas en Tiempo Real:** 14.000 partículas en la esfera de erosión fractal orgánica (fBm invertido en GLSL) y 8.000 partículas en el halo cósmico orbital de baja latencia.
- **Paleta de Alta Gama:** Negro OLED (`#09090b`), Carbón Mate (`#18181b`), paneles en vidrio esmerilado translúcido (`rgba(18, 18, 22, 0.85)` con `backdrop-blur-md`) y bordes en Naranja Ámbar PIDE (`#F97316` / `#EA580C`).
- **Arquitectura Híbrida Offline:** Ejecución fluida en Three.js con fallback automático a sombreadores WebGL 1.0 nativos si el dispositivo carece de conexión a internet.
- **Eficiencia Energética:** Detección automática del ciclo de vida de la pestaña (`document.hidden`) para suspender el bucle de render y conservar batería en notebooks escolares.

### 3. 🎯 Gamificación Escolar y Rigor Pedagógico
- **Ficha Didáctica Amplia:** Sección continua sin compresión vertical que detalla la descripción química fundamental, modelo RPECV, clasificación de polaridad rigurosa con notación en Debye ($\mu > 0\text{ D}$ / $\mu = 0\text{ D}$), curiosidades del mundo real y aplicaciones en la industria chilena.
- **Validación Matemática Proporcional del Kit Físico:** Sistema de puntaje que otorga exactamente el **25%** del puntaje base por cada hito verificado en mesa (25%, 50%, 75%, 100%), evitando la frustración escolar y fomentando la resolución incremental.
- **Trivia Escolar USS:** Desafíos conceptuales alineados con el currículo nacional chileno y la prueba PAES, con distribución equitativa de alternativas correctas (A, B, C, D) y bonificación de **+100 puntos**.
- **Audio Sintetizado Offline (Web Audio API):** Ticks de advertencia en los últimos 5 segundos, acordes de acierto en trivia y fanfarria triunfal de victoria con confeti animado, sin requerir descarga de archivos `.mp3` externos.

---

## 🔬 Dataset Molecular Oficial (`moleculesDataset.ts`)

| # | Compuesto | Fórmula | Masa Molar | Geometría RPECV | Polaridad | Dificultad | Tiempo | Enlaces Requeridos en Kit Físico |
| :-: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **01** | **Agua** | $\text{H}_2\text{O}$ | 18.015 g/mol | Angular ($104.5^\circ$) | Polar ($\mu > 0\text{ D}$) | Fácil | 60s | 2 enlaces simples (conectores rígidos) |
| **02** | **Dióxido de Carbono** | $\text{CO}_2$ | 44.01 g/mol | Lineal ($180^\circ$) | Apolar ($\mu = 0\text{ D}$) | Fácil | 60s | 2 enlaces dobles ($\text{C=O}$, 4 conectores flexibles) |
| **03** | **Metano** | $\text{CH}_4$ | 16.04 g/mol | Tetraédrica ($109.5^\circ$) | Apolar ($\mu = 0\text{ D}$) | Fácil | 60s | 4 enlaces simples (conectores rígidos) |
| **04** | **Amoníaco** *(Bonus)* | $\text{NH}_3$ | 17.03 g/mol | Piramidal trigonal ($107.3^\circ$) | Polar ($\mu > 0\text{ D}$) | Fácil | 60s | 3 enlaces simples + lóbulo par solitario |
| **05** | **Etanol** | $\text{C}_2\text{H}_6\text{O}$ | 46.07 g/mol | Tetraédrica / Angular | Polar ($\mu > 0\text{ D}$) | Intermedio | 90s | 8 enlaces simples (cadena alifática + hidroxilo) |
| **06** | **Acetona** | $\text{C}_3\text{H}_6\text{O}$ | 58.08 g/mol | Trigonal plana ($\text{C=O}$) | Polar ($\mu > 0\text{ D}$) | Intermedio | 90s | 1 doble ($\text{C=O}$, 2 flexibles) + 8 simples |
| **07** | **Ácido Acético** *(Bonus)* | $\text{C}_2\text{H}_4\text{O}_2$ | 60.05 g/mol | Trigonal / Angular | Polar ($\mu > 0\text{ D}$) | Intermedio | 90s | 1 doble ($\text{C=O}$, 2 flexibles) + 6 simples |
| **08** | **Acetato de Etilo** | $\text{C}_4\text{H}_8\text{O}_2$ | 88.11 g/mol | Trigonal / Angular / Tet. | Polar ($\mu > 0\text{ D}$) | Avanzado | 150s | 1 doble ($\text{C=O}$, 2 flexibles) + 12 simples |

---

## 🚀 Instalación y Puesta en Marcha

### Requisitos Previos:
- **Node.js:** >= 18.0.0
- **npm:** >= 9.0.0

### Ejecución Local en Desarrollo:
```bash
# 1. Clonar el repositorio
git clone https://github.com/moises-inc/3D-MolBuilder.git
cd 3D-MolBuilder

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor Vite (Estación de Mesa Escolar en puerto :5174)
npm run dev

# 4. Iniciar en Modo LAN Multidispositivo (Servidor Socket.io + Vite en red)
npm run dev:lan
```

- **Estación de Mesa Alumnos:** `http://localhost:5174/`
- **Marcador Central Proyector Auditorio:** `http://localhost:5174/?role=master`

### Compilación y Ejecución Unificada Offline (Puerto Único :3001):
```bash
# Compilar bundle estático optimizado
npm run build

# Iniciar servidor unificado Express/Socket.io sirviendo la carpeta dist/
npm start
```
Permite desplegar todo el ecosistema en un único puerto (`http://<IP-HOST>:3001/`) sin dependencias de desarrollo, ideal para ferias escolares en entornos sin conectividad a internet.

---

## 🌐 Sincronización en Tiempo Real (Red Escolar LAN & Respaldo QR)

1. **Sincronización WebSocket (Socket.io en `:3001`):** Actualización instantánea (< 5ms de latencia en LAN local) de puntuaciones, eventos de completitud de ronda y disparo de fanfarrias en la pantalla gigante del auditorio.
2. **Modo Respaldo Alfanumérico y Código QR:** En recintos con restricciones de firewall o sin router local, cada mesa genera un código QR SVG y un identificador alfanumérico (ej. `ALFA-850`) que el monitor del taller puede ingresar en el proyector para acreditar los puntos de forma manual.

Consulta la **[Guía de Sincronización Multidispositivo](docs/multi_device_guide.md)** para detalles de configuración de red y topología en ferias.

---

## 🧪 Aseguramiento de Calidad y Suite E2E (Playwright)

El repositorio cuenta con una suite completa de pruebas end-to-end automatizadas en navegador real Chromium:

```bash
# Ejecutar suite E2E automatizada en navegador real
node scripts/e2e_browser_test_vcm.js
```

- **Resultado Oficial:** **26 de 26 aserciones aprobadas (100% PASS)** con 0 errores JavaScript de consola y 0 fallos de red.
- **Evidencia Visual:** 24 capturas de pantalla de alta fidelidad sincronizadas en [`docs/vcm_qa_captures/`](docs/vcm_qa_captures/).
- **Reporte Técnico Consolidado:** Consulta el reporte completo en **[`qa_e2e_report.md`](qa_e2e_report.md)**.

---

## 📑 Documentación Técnica Completa

- 📊 **[Reporte de Auditoría E2E y Evaluación Técnica](qa_e2e_report.md)**
- 🏗️ **[Arquitectura de Software](docs/architecture.md)**
- 🌐 **[Guía de Sincronización Multidispositivo (LAN & QR)](docs/multi_device_guide.md)**
- 📖 **[Guía Didáctica y Manual del Monitor](docs/didactic_guide.md)**
- 🔬 **[Referencia de Coordenadas y Dataset Molecular](docs/dataset_reference.md)**

---

## ⚖️ Licencia y Derechos de Autor

Este proyecto está licenciado bajo la **[GNU Affero General Public License v3.0 (AGPLv3)](LICENSE)**.  
Copyright (C) 2026 Moisés Amundarain Romero, Gamaliel Cisternas Herrera, Diego Pavez Gallardo, Dra. Fabiola Acuña Sanhueza — Universidad San Sebastián (USS).
