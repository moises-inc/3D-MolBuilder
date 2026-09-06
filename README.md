# 🧪 🧩 3D MolBuilder

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.168-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![Offline Deterministic](https://img.shields.io/badge/Runtime-100%25%20offline%20%7C%20deterministic-111827)](docs/architecture.md)
[![License AGPLv3](https://img.shields.io/badge/License-AGPLv3-00e676.svg)](LICENSE)

**3D MolBuilder** es una aplicación interactiva tridimensional y plataforma gamificada de armado molecular, desarrollada específicamente para las ferias y talleres de extensión científica de **Vinculación con el Medio (VcM)** de la **Universidad San Sebastián (USS)**.

Permite a estudiantes de educación media (3° y 4° Medio) competir por equipos visualizando estructuras moleculares 3D analíticas (CPK, Van der Waals, Malla 3D), consultando fichas didácticas de química cotidiana y replicando el ensamblado físico con kits de esferas y conectores moleculares contra reloj.

---

## 🏛️ Créditos y Autores

* **Autor Principal & Arquitecto de Software:** Moisés Amundarain Romero
* **Co-Autores Científicos:** 
  - **Gamaliel Cisternas Herrera** (Estudiante de Química y Farmacia USS)
  - **Diego Pavez Gallardo** (Estudiante de Química y Farmacia USS)
* **Profesora Guía & Líder Académica:** **Dra. Fabiola Acuña Sanhueza** (Docente de Química General USS)

---

## ⚡ Características Principales

1. **Visor Gráfico 3D Analítico (Three.js):**
   - **3 Modos de Renderizado:** Esferas y Varillas (CPK), Espacio Lleno (Van der Waals) y Malla Alámbrica 3D (Wireframe).
   - **Código de Colores CPK:** Carbono (Negro `#262626`), Hidrógeno (Blanco `#FFFFFF`), Oxígeno (Rojo `#EF4444`), Nitrógeno (Azul `#3B82F6`).
   - **Cálculo de Enlaces Dobles:** Orientación analítica por cuaterniones y cilindros paralelos para enlaces $\text{C=O}$.
   - **Inspección Interactiva:** Raycasting atómico para consultar hibridaciones ($sp^3, sp^2, sp$) y botón de exportación de fotos PNG HD.

2. **Gamificación por Rondas de Competencia Escolar:**
   - **Cronómetro Regresivo Dinámico:** Con advertencias visuales y efectos de audio sintetizados offline.
   - **Audio Sintetizado Web Audio API:** Sonidos de cuenta regresiva, respuesta correcta de trivia y fanfarria de victoria sin requerir archivos de audio externos.
   - **Panel Didáctico de Química Cotidiana:** Explicaciones de fenómenos del mundo real (por qué el hielo flota, contracción de volumen agua-etanol, desinfección con alcohol al 70%, disolución de plumavit en acetona).
   - **Trivia Escolar USS:** Preguntas interactivas con bonificación de **+100 puntos**.
   - **Panel de Verificación de Kit Físico:** Conteo de esferas/conectores en mesa y guía del monitor.

3. **Arquitectura 100% Offline:**
   - Diseñado para funcionar de manera completamente autónoma en notebooks y proyectores de ferias escolares sin necesidad de acceso a internet.

---

## 🔬 Dataset Molecular Incluido (`moleculesDataset.ts`)

| # | Compuesto | Fórmula | Masa Molar | Geometría RPECV | Polaridad | Dificultad | Tiempo | Enlaces / Conectores Requeridos |
| :-: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **01** | **Agua** | $\text{H}_2\text{O}$ | 18.02 g/mol | Angular ($104.5^\circ$) | Polar ($1.85$ D) | Fácil | 60s | 2 simples (cortos rígidos) |
| **02** | **Dióxido de Carbono** | $\text{CO}_2$ | 44.01 g/mol | Lineal ($180^\circ$) | Apolar ($0$ D) | Fácil | 60s | 2 dobles ($\text{C=O}$, 4 flexibles) |
| **03** | **Metano** | $\text{CH}_4$ | 16.04 g/mol | Tetraédrica ($109.5^\circ$) | Apolar ($0$ D) | Fácil | 60s | 4 simples (cortos rígidos) |
| **04** | **Amoníaco** *(Bonus)* | $\text{NH}_3$ | 17.03 g/mol | Piramidal trigonal ($107.3^\circ$) | Polar ($1.47$ D) | Fácil | 60s | 3 simples (cortos rígidos) |
| **05** | **Etanol** | $\text{C}_2\text{H}_6\text{O}$ | 46.07 g/mol | Tetraédrica / Angular | Polar ($1.69$ D) | Intermedio | 90s | 8 simples (cortos rígidos) |
| **06** | **Acetona** | $\text{C}_3\text{H}_6\text{O}$ | 58.08 g/mol | Trigonal plana ($\text{C=O}$) | Polar ($2.88$ D) | Intermedio | 90s | 1 doble ($\text{C=O}$), 8 simples |
| **07** | **Ácido Acético** *(Bonus)* | $\text{C}_2\text{H}_4\text{O}_2$ | 60.05 g/mol | Trigonal / Angular | Polar ($1.74$ D) | Intermedio | 90s | 1 doble ($\text{C=O}$, 2 flexibles), 6 simples |
| **08** | **Acetato de Etilo** | $\text{C}_4\text{H}_8\text{O}_2$ | 88.11 g/mol | Trigonal / Angular / Tet. | Polar ($1.78$ D) | Avanzado | 150s | 1 doble ($\text{C=O}$, 2 flexibles), 12 simples |

---

## 🚀 Inicio Rápido

### Requisitos Previos:
- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalación y Ejecución Local:
```bash
# Clonar el repositorio
git clone https://github.com/moises-inc/3D-MolBuilder.git
cd 3D-MolBuilder

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo en estación individual
npm run dev

# Iniciar en MODO LAN MULTIDISPOSITIVO (Servidor Socket.io + Vite en red)
npm run dev:lan
```
Accede a la aplicación en `http://localhost:5173/` para estaciones de mesa o `http://localhost:5173/?role=master` para el proyector principal.

### Compilación para Producción (Offline):
```bash
npm run build
```
Genera la carpeta `dist/` estática optimizada para ser proyectada en cualquier equipo sin conexión.

---

## 🌐 Modo Compartido Multidispositivo (Ferias Escolares VcM)

La aplicación soporta despliegue colaborativo en tiempo real mediante dos modalidades:
1. **Sincronización en Vivo por Red LAN (Socket.io):** Conecta las mesas de los estudiantes al proyector principal en tiempo real sin requerir internet. Los puntajes, trivias y confeti se sincronizan al instante en el auditorio.
2. **Modo Respaldo por Código QR y Código Corto de 6 Dígitos:** Si no hay señal Wi-Fi, la mesa genera un código QR SVG y una clave alfanumérica (ej. `ALFA-850`) que el monitor puede ingresar en la pantalla central para acreditar los puntos manualmente.

Para instrucciones completas de configuración de red y pruebas, consulta la **[Guía de Sincronización Multidispositivo](docs/multi_device_guide.md)**.

---

## 📑 Documentación Adicional

- 🌐 [Guía de Sincronización Multidispositivo (LAN & QR)](docs/multi_device_guide.md)
- 🏗️ [Arquitectura de Software](docs/architecture.md)
- 📖 [Guía Didáctica y Manual del Monitor](docs/didactic_guide.md)
- 🔬 [Referencia de Coordenadas y Dataset Molecular](docs/dataset_reference.md)

---

## ⚖️ Licencia y Derechos de Autor

Este proyecto está licenciado bajo la **[GNU Affero General Public License v3.0 (AGPLv3)](LICENSE)**.  
Copyright (C) 2026 Moisés Amundarain Romero, Gamaliel Cisternas Herrera, Diego Pavez Gallardo, Dra. Fabiola Acuña Sanhueza — Universidad San Sebastián (USS).
