# Arquitectura de Software — 3D MolBuilder

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.168-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS v3](https://img.shields.io/badge/Tailwind-v3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

## 🏛️ 1. Visión General de la Arquitectura

**3D MolBuilder** es una aplicación web desacoplada de PIDE Core, diseñada bajo principios de **autonomía 100% offline**, alto rendimiento gráfico 3D y diseño OLED Black. Fue concebida para operar sin conexión a internet en ferias y talleres de extensión científica universitaria con colegios de educación media.

```mermaid
graph TD
    A[App.tsx — State Orchestrator] --> B[RoundHeader.tsx — Top Bar & Timer]
    A --> C[MolecularViewer3D.tsx — Three.js Engine]
    A --> D[MoleculeInfoCard.tsx — Didactics & Trivia]
    A --> E[KitValidationPanel.tsx — Physical Kit Check]
    A --> F[soundEffects.ts — Web Audio API Synthesizer]
    
    C --> C1[Raycaster Atom Selector]
    C --> C2[CPK / VDW / Wireframe Renderers]
    C --> C3[Quaternion Bond Alignment]
    C --> C4[2D Billboard HTML Labels]
    
    A --> G[Modals System]
    G --> G1[RoundTrophyModal.tsx]
    G --> G2[LeaderboardModal.tsx]
    G --> G3[SettingsModal.tsx]
```

---

## 🎨 2. Motor Gráfico 3D (`MolecularViewer3D.tsx`)

El motor gráfico 3D utiliza **Three.js** con `OrbitControls` (amortiguación suave con `enableDamping = true` y `dampingFactor = 0.05`) y ciclo de vida optimizado en React (`useRef` + `useEffect` deterministas).

### Features Gráficos Implementados:
1. **Materiales Físicos Orgánicos (`MeshPhysicalMaterial`):**
   Tanto las esferas de átomos como las varillas metálicas de enlace emplean `THREE.MeshPhysicalMaterial` con `roughness = 0.25`, `metalness = 0.1`, `clearcoat = 0.35` y `clearcoatRoughness = 0.15`, logrando reflejos orgánicos suaves, lustre nítido y máximo contraste sobre fondo OLED Black.

2. **Modelado Analítico de Enlaces (Cuaterniones):**
   Los enlaces entre átomos no se dibujan mediante coordenadas prefijadas, sino calculando el cuaternión de rotación $q$ entre el vector unitario $(0,1,0)$ y el vector de dirección entre las dos posiciones atómicas $\vec{d} = \vec{p}_2 - \vec{p}_1$:
   $$q = \text{QuaternionFromUnitVectors}((0,1,0), \hat{d})$$
   Para enlaces dobles (ej. $C=O$ en acetona, ácido acético o $\text{CO}_2$), se aplican desplazamientos perpendiculares analíticos para renderizar dos cilindros paralelos paralelos al eje del enlace.

3. **Modos de Renderizado Dinámico:**
   - **Esferas y Varillas (CPK):** Esferas en escala CPK oficial con cilindros enlazantes.
   - **Espacio Lleno (Van der Waals):** Esferas aumentadas al 220% de su radio atómico relativo para mostrar volumen estérico de empaquetamiento.
   - **Malla Alámbrica 3D (Wireframe):** Estructuras alámbricas translúcidas de alta frecuencia poligonal.

4. **Raycasting & Inspección Atómica:**
   Detección de clics mediante `THREE.Raycaster` sobre la geometría de los átomos para resaltar el objeto seleccionado con un aura cromática (Cyan `#5de1e5`) y proyectar su hibridación, símbolo y estado en la interfaz.

5. **Exportación de Capturas PNG HD:**
   Un botón directo invoca `webglRenderer.domElement.toDataURL('image/png')` para generar imágenes de la molécula 3D en alta resolución sin necesidad de capturas de pantalla externas.

---

## 🔊 3. Motor de Audio Sintetizado Offline (`soundEffects.ts`)

Para evitar la carga de assets pesados o dependencias de red, el sistema utiliza **Web Audio API** nativa del navegador:

- **Desbloqueo de Autoplay (`unlockAudio()`):** Detecta el primer gesto del usuario (`click`, `pointerdown`, `keydown`) en `App.tsx` para reanudar de forma transparente el `AudioContext` suspendido por el navegador.
- **Ticks de Temporizador (`playTick()`):** Oscilador senoidal a 600 Hz con envolvente exponencial suave (80 ms) que suena en los últimos 5 segundos de cada ronda.
- **Fanfarria de Victoria (`playSuccess()`):** Arpegio ascendente sintetizado ($C_5 \rightarrow E_5 \rightarrow G_5 \rightarrow C_6$) mediante osciladores triangulares (`triangle`) para celebrar la validación del kit físico.
- **Acierto en Trivia (`playTriviaCorrect()`):** Acorde mayor triádico brillante ($A_4 \rightarrow C^\sharp_5 \rightarrow E_5$) con onda senoidal para retroalimentar respuestas correctas (+100 pts).

---

## ⚙️ 4. Verificación y Calidad de Código

El repositorio cumple con los estándares estrictos de compilación:
- `tsc -b`: Validación estricta del compilador TypeScript sin tipos `any` ni advertencias.
- `vite build`: Generación de bundles minificados en `dist/` con precarga de módulos de Three.js y React 19.
