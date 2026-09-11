# Guía Didáctica y Manual del Monitor — 3D MolBuilder

**Universidad San Sebastián (USS) — Vinculación con el Medio (VcM)**  
**Facultad de Ciencias de la Salud / Escuela de Química y Farmacia (QyF)**  

---

## 🏛️ 1. Presentación Institucional

El **Taller de Armado Molecular 3D MolBuilder** es un proyecto de extensión científica y Vinculación con el Medio (VcM) ideado para las ferias escolares USS de **Septiembre y Octubre de 2026**. Su objetivo es articular los contenidos teóricos de la asignatura de **Química General (DQUI1056)** con la educación media (3° y 4° Medio), promoviendo el razonamiento espacial 3D, la comprensión del modelo RPECV (VSEPR), la polaridad molecular y las aplicaciones cotidianas de la química.

### 👥 Equipo Directivo y Autores:
* **Autor Principal & Arquitecto de Software:** Moisés Amundarain Romero.
* **Co-Autores Científicos:** Gamaliel Cisternas Herrera y Diego Pavez Gallardo (Estudiantes de Química y Farmacia USS).
* **Profesora Guía & Líder Académica:** Dra. Fabiola Acuña Sanhueza (Profesora de Química General USS).

---

## 🎮 2. Dinámica del Taller por Rondas

La experiencia se divide en 4 etapas por ronda de competencia:

```
[1. Exposición Didáctica & 3D] ➔ [2. Armado Físico en Mesa] ➔ [3. Trivia Escolar +100pt] ➔ [4. Validación y Podio]
```

1. **Exposición Visual e Interactiva (1 minuto):**
   - El proyector muestra la molécula 3D interactiva en Three.js en la parte inferior izquierda, junto a la ficha didáctica continua superior.
   - En moléculas como **Agua** ($\text{H}_2\text{O}$) y **Amoníaco** ($\text{NH}_3$), se aprecian los **lóbulos de densidad electrónica no enlazantes** (mallas translúcidas cian `#5de1e5`), permitiendo a los monitores explicar la repulsión RPECV que comprime los ángulos de enlace a $104.5^\circ$ y $107.3^\circ$.
   - El monitor presenta la molécula con un dato curioso cotidiano (ej: ¿por qué el hielo flota en el agua? o ¿por qué la acetona disuelve la plumavit?).

2. **Ensamblado Físico (60 a 150 segundos):**
   - El equipo de estudiantes recibe la bandeja de esferas (Carbono=Negro, Hidrógeno=Blanco, Oxígeno=Rojo, Nitrógeno=Azul).
   - Arman la molécula atendiendo a la geometría correcta ($sp^3, sp^2, sp$) y los conectores (cortos rígidos para enlaces simples, largos flexibles para enlaces dobles).

3. **Trivia Escolar Calibrada USS:**
   - Estudiantes responden en pantalla la pregunta didáctica formulada para 3° y 4° Medio. Un acierto otorga **+100 puntos inmediatos**.

4. **Validación del Monitor QyF con Puntuación Parcial:**
   - El estudiante monitor de QyF evalúa la estructura física en mesa marcando los 4 criterios del checklist:
     * Cantidad y tipo de esferas (25% del puntaje base).
     * Conectores y multiplicidad de enlaces (25% del puntaje base).
     * Disposición angular y geometría RPECV (25% del puntaje base).
     * Integridad estructural sin piezas flotantes (25% del puntaje base).
   - **Puntaje Base Reescalado:** Fácil = 100 pts | Intermedio = 125 pts | Avanzado = 150 pts.
   - **Bonificación de Velocidad:** Otorga entre +1 y +25 pts calculados en tiempo real según el porcentaje de tiempo restante:
     $$\text{Bono} = \max\left(1, \min\left(25, \text{round}\left(\frac{t_{\text{restante}}}{t_{\text{límite}}} \times 25\right)\right)\right)$$
   - Al pulsar "Validar Armado", la plataforma acredita el puntaje exclusivo para la molécula y equipo activo, disparando efectos sonoros Web Audio API y animación de confeti digital.

---

## 🧪 3. Matriz de Kits Físicos y Consejos de Montaje

| Compuesto | Esferas | Conectores | Consejo de Montaje para Monitores |
| :--- | :--- | :--- | :--- |
| **Agua ($\text{H}_2\text{O}$)** | 1 O (Rojo), 2 H (Blanco) | 2 Cortos Rígidos | Verificar que no quede en 180°. Debe usar orificios angulares ($\sim 105^\circ$), considerando los dos pares de electrones no enlazantes visibles en el visor 3D. |
| **Dióxido de Carbono ($\text{CO}_2$)** | 1 C (Negro), 2 O (Rojo) | 4 Largos Flexibles | Utilizar 2 conectores curvos por enlace $\text{C=O}$ y verificar geometría lineal ($180^\circ$). |
| **Metano ($\text{CH}_4$)** | 1 C (Negro), 4 H (Blanco) | 4 Cortos Rígidos | Usar los 4 orificios tetraédricos ($109.5^\circ$) de la esfera negra. |
| **Amoníaco ($\text{NH}_3$)** | 1 N (Azul), 3 H (Blanco) | 3 Cortos Rígidos | Formar una pirámide tripoidal hacia abajo, dejando libre la orientación del par de electrones no enlazantes superior. |
| **Etanol ($\text{C}_2\text{H}_6\text{O}$)** | 2 C, 6 H, 1 O | 8 Cortos Rígidos | Armar primero la cadena $\text{C-C-O}$, luego añadir la cabeza $\text{-OH}$ y los hidrógenos alifáticos. |
| **Acetona ($\text{C}_3\text{H}_6\text{O}$)** | 3 C, 6 H, 1 O | 8 Cortos, 2 Flexibles | Usar los 2 conectores flexibles en el carbono central ($\text{C=O}$ $sp^2$ trigonal plano). |
| **Ácido Acético ($\text{C}_2\text{H}_4\text{O}_2$)** | 2 C, 4 H, 2 O | 6 Cortos, 2 Flexibles | El $\text{H}$ ácido se une al $\text{-O-}$ simple, **no** al $\text{C=O}$ carbonílico. |
| **Acetato de Etilo ($\text{C}_4\text{H}_8\text{O}_2$)** | 4 C, 8 H, 2 O | 12 Cortos, 2 Flexibles | Ensamblar en dos bloques: acetilo ($\text{CH}_3\text{C=O}$) y etoxilo ($\text{-O-CH}_2\text{CH}_3$). |
