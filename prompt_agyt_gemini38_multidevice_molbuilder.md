# 📜 PROMPT DE EJECUCIÓN AGY CLI (GEMINI 3.8) — MÓDULO MULTIDISPOSITIVO 3D MOLBUILDER

> **Modelo Autorizado:** Gemini 3.8 (High Reasoning / Coding Mode)
> **Proyecto:** 3D MolBuilder (Vinculación con el Medio USS)
> **Directorio de Código:** `/mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/PIDE_VcM_MolBuilder`
> **Repositorio GitHub:** `https://github.com/moises-inc/3D-MolBuilder`
> **Bóveda de Obsidian:** `/mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/ObsidianVault/10_Projects/PIDE_VcM_MolBuilder`

---

## 🎯 OBJETIVO DE LA TAREA

Implementar la arquitectura de **Sincronización Multidispositivo Híbrida** para **3D MolBuilder**, permitiendo conectar múltiples computadores/tablets en las ferias escolares de Vinculación con el Medio (VcM USS). 

El sistema combinará:
1. **Sincronización en Tiempo Real por Red LAN / WebSockets:** Comunicación automática entre PCs de mesas y la Pantalla Principal / Proyector.
2. **Modo Fallback por Código QR / Código Corto (Sin Red):** Generación de QR dinámico y códigos alfanuméricos de 6 dígitos para ingreso manual o escaneo sin red Wi-Fi.
3. **Documentación Didáctica:** Guía paso a paso en `docs/multi_device_guide.md`, `README.md` y la Bóveda de Obsidian para probar e implementar el modo compartido en el evento.

---

## 🏗️ ARQUITECTURA TÁCTICA A IMPLEMENTAR

### 1. Servidor de Sincronización Local LAN (`server/index.js`)
- Crea un servidor ultraliviano en Node.js usando `express` + `socket.io` (o `ws` nativo) alojado en `server/index.js`.
- Agrega en `package.json` el paquete `socket.io` y `socket.io-client`, así como los scripts:
  - `"server": "node server/index.js"`
  - `"dev:lan": "concurrently \"npm run server\" \"vite --config config/vite.config.ts --host\""`
- El servidor gestionará las salas del torneo, transmitiendo eventos en tiempo real:
  - `join-role`: Asigna el rol al cliente (`station` para mesa escolar o `master` para proyector principal).
  - `score-updated`: Emite la actualización de puntajes, bonificaciones y trivia completada al instante.
  - `trigger-victory-fanfare`: Sincroniza la animación de confeti digital y sonido en la pantalla del proyector.

### 2. Cliente de Sincronización & Socket Hook (`src/utils/socketSync.ts`)
- Implementa el cliente Socket.io en `src/utils/socketSync.ts` con detección automática de la IP de la red local (`window.location.hostname`).
- Incluye un estado de conexión transparente en la interfaz (indicador LED en la barra superior):
  - 🟢 **Verde:** Conectado a Red LAN / Tiempo Real.
  - 🟡 **Amarillo:** Modo Local Offline + QR Fallback Activo.

### 3. Módulo Fallback por Código QR y Código Corto (`SyncQRModal.tsx`)
- Crea `src/components/SyncQRModal.tsx`.
- Al finalizar una ronda o validar un kit físico, genera un **Código QR SVG** y un **Código Alfanumérico Corto de 6 caracteres** (ej. `ALFA-850`).
- En la Pantalla Principal (Modo Proyector), incluye un botón `"Ingresar Código de Mesa"` que permita a los monitores digitar el código de 6 dígitos o escanear el QR para cargar los puntos si no hay red Wi-Fi.

### 4. Selector de Roles de Pantalla (Mesa vs. Proyector Principal)
- En `RoundHeader.tsx` y `SettingsModal.tsx`, añade un conmutador de vista:
  - 🖥️ **Modo Estación de Mesa:** Muestra el visor 3D interactivo, ficha educativa y kit físico del equipo asignado.
  - 📊 **Modo Proyector Principal / Marcador Central:** Despliega en pantalla completa el Leaderboard en tiempo real con barras de progreso animadas, ticker de actividades y fanfarria gigante para la audiencia.

### 5. Guía de Uso y Pruebas (`docs/multi_device_guide.md`)
- Crea la guía completa [`docs/multi_device_guide.md`](file:///mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/PIDE_VcM_MolBuilder/docs/multi_device_guide.md) explicando:
  - Cómo iniciar el servidor LAN con `npm run dev:lan` o `npm run server`.
  - Cómo conectar varios PCs/tablets usando la IP del PC central (ej. `http://192.168.1.50:5174`).
  - Cómo realizar pruebas locales abriendo dos pestañas en el navegador (Pestaña 1: Proyector, Pestaña 2: Mesa 1).
  - Cómo utilizar el respaldo por Código QR / Código Corto de 6 dígitos cuando no hay red Wi-Fi.

### 6. Validación, Sincronización en GitHub y Obsidian
- Compila la solución con `npm run build` verificando **0 errores de TypeScript**.
- Actualiza `README.md` agregando la sección de **Modo Compartido Multidispositivo**.
- Actualiza la nota de la Bóveda de Obsidian [`vcm_molbuilder_dashboard.md`](file:///mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/ObsidianVault/10_Projects/PIDE_VcM_MolBuilder/vcm_molbuilder_dashboard.md).
- Realiza `git add .`, commit descriptivo y `git push origin main`.

---

## ⚡ COMANDOS DE EJECUCIÓN Y VERIFICACIÓN

```bash
cd /mnt/9b846436-0407-4e80-b8af-5417ffbdee8e/PIDE_VcM_MolBuilder
npm install socket.io socket.io-client qrcode.react concurrently
npm run build
git status
```
