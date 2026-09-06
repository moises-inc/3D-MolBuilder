# 📜 PROMPT DE EJECUCIÓN AGY CLI (GEMINI 3.8) — REFINAMIENTO 3D MOLBUILDER

> **Modelo Autorizado:** Gemini 3.8 (High Reasoning / Coding Mode)
> **Proyecto:** 3D MolBuilder (Vinculación con el Medio USS)
> **Directorio de Código:** `/mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/PIDE_VcM_MolBuilder`
> **Repositorio GitHub:** `https://github.com/moises-inc/3D-MolBuilder`
> **Bóveda de Obsidian:** `/mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/ObsidianVault/10_Projects/PIDE_VcM_MolBuilder`

---

## 🎯 OBJETIVO DE LA TAREA

Realizar una refactorización integral de UI/UX, marca institucional, disposición de paneles, simulación 3D, auditoría sonora y validación de código para la aplicación web **3D MolBuilder**, finalizando con la sincronización del repositorio GitHub y la documentación técnica.

---

## 📋 REQUERIMIENTOS TÁCTICOS PASO A PASO

### 1. Marca Institucional y Encabezado (`RoundHeader.tsx`)
- **Copia de Asset:** Copia la imagen oficial del escudo desde `/mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/ObsidianVault/10_Projects/PIDE_VcM_MolBuilder/Escudo_de_la_Universidad_San_Sebastián.png` hacia `public/assets/uss_shield.png`.
- **Actualización del Logo:** En `src/components/RoundHeader.tsx`, reemplaza el botón con texto en caja `"USS"` por una etiqueta `<img>` que renderice `/assets/uss_shield.png` con sombra sutil dorada/azul.
- **Actualización del Título:** Elimina las marcas previas `"PIDE VCM"` y etiquetas secundarias. El título debe decir única y exclusivamente **"3D MolBuilder"** con tipografía monoespaciada en acento PIDE Cyan (`#5de1e5`).

### 2. Limpieza de Modales e Interfaz (`SettingsModal.tsx`)
- En `src/components/SettingsModal.tsx`, elimina completamente el recuadro informativo flotante del pie de página (`"PIDE VcM 3D MolBuilder — Universidad San Sebastián"`).

### 3. Rediseño del Layout y Panel de Kit Físico (`App.tsx` & `KitValidationPanel.tsx`)
- En `src/App.tsx`, elimina la restricción de altura fija `h-[290px]` sobre el contenedor de `KitValidationPanel`.
- En `src/components/KitValidationPanel.tsx`, ajusta los contenedores para que el panel se expanda dinámicamente (`min-h-[380px]` / `flex-1`), garantizando que la lista de piezas requeridas (esferas CPK y conectores), los tips del monitor, el checklist de 4 puntos y el botón de validación se vean fluidos sin scroll forzado ni recortes.

### 4. Auditoría de Efectos de Sonido Sintetizados (`soundEffects.ts` & `App.tsx`)
- En `src/utils/soundEffects.ts`, implementa un método `unlockAudio()` que ejecute `AudioContext.resume()` al primer clic o evento de usuario en la aplicación, superando la restricción de autoplay del navegador.
- Revisa y verifica los 3 efectos sintetizados offline: `playTick()` (temporizador), `playTriviaCorrect()` (acierto en trivia), y `playSuccess()` (fanfarria de victoria por kit validado).

### 5. Optimización del Escenario 3D, Colores y Tipografía (`MolecularViewer3D.tsx`)
- En `src/components/MolecularViewer3D.tsx`:
  - Mejora los materiales 3D de esferas y varillas (`MeshPhysicalMaterial` / `MeshPhongMaterial` con `roughness = 0.25` y `metalness = 0.1`) para reflejos orgánicos suaves.
  - Habilita la amortiguación de cámara suave en `OrbitControls` (`controls.enableDamping = true`, `controls.dampingFactor = 0.05`).
- Consolida la jerarquía visual OLED Black usando `Inter` para interfaz y textos de lectura, e `IBM Plex Mono` para masas molares, coordenadas, temporizadores y fórmulas químicas.

### 6. Validación Química y Compilación Estricta
- Verifica en `src/data/moleculesDataset.ts` la exactitud química de los 8 compuestos ($H_2O, CO_2, CH_4, NH_3, C_2H_6O, C_3H_6O, C_2H_4O_2, C_4H_8O_2$): valencias, recuento de piezas del kit físico, hibridaciones y respuestas de trivias.
- Ejecuta `npm run build` (`tsc -b config/tsconfig.json && vite build --config config/vite.config.ts`) y confirma que la compilación complete con **0 errores de TypeScript**.

### 7. Sincronización de Git, GitHub y Documentación
- Actualiza los archivos de documentación: [`README.md`](file:///mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/PIDE_VcM_MolBuilder/README.md), los manuales en `docs/` (`architecture.md`, `didactic_guide.md`, `dataset_reference.md`) y la nota de Obsidian [`vcm_molbuilder_dashboard.md`](file:///mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/ObsidianVault/10_Projects/PIDE_VcM_MolBuilder/vcm_molbuilder_dashboard.md).
- Confirma todos los cambios con `git add .` y realiza commit descriptivo.
- Impulsa los cambios a la rama `main` en GitHub (`git push origin main`).

---

## ⚡ COMANDO DE VERIFICACIÓN FINAL

Al finalizar, debes ejecutar e informar el resultado de:
```bash
cd /mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/PIDE_VcM_MolBuilder
npm run build
git status
```
