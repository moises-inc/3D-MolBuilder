/**
 * Recursive Erosion Source HTML/WebGL Generator
 * Ecosistema VcM Universidad San Sebastián - PIDE Core & 3D MolBuilder
 *
 * Genera el documento HTML autónomo para iframe sandbox srcDoc.
 * Simula una esfera de partículas 3D con ruido de erosión recursivo
 * (fBm con inverso de valor absoluto) y paleta sobria Negro OLED y Naranja Ámbar.
 */

export interface RecursiveErosionSourceOptions {
  mode?: 'dark' | 'light';
  hue?: number;
  saturation?: number;
  brightness?: number;
}

export function getRecursiveErosionSource(options: RecursiveErosionSourceOptions = {}): string {
  const {
    mode = 'dark',
    hue = -30,
    saturation = 1.2,
    brightness = 0.9,
  } = options;

  const isDark = mode === 'dark';
  const bgColor = isDark ? '#09090b' : '#f8fafc';
  const baseColorHex = isDark ? '0.08, 0.08, 0.09' : '0.85, 0.88, 0.92'; // Charcoal / Light base
  const amberColorHex = '0.976, 0.451, 0.086'; // #F97316 Naranja Ámbar
  const brightColorHex = '1.0, 0.75, 0.45';    // #FFBF73 Núcleo luminoso

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Recursive Erosion 3D Sphere Background</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: ${bgColor};
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <canvas id="erosion-canvas"></canvas>

  <!-- Intento de carga CDN Three.js con fallback automático a WebGL nativo offline -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>

  <script>
  (function() {
    var canvas = document.getElementById('erosion-canvas');
    var isPaused = false;
    var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    var time = 0;
    var animFrameId = null;

    // Optimización de batería en notebooks escolares: pausa automática en segundo plano
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        isPaused = true;
        if (animFrameId) cancelAnimationFrame(animFrameId);
      } else {
        isPaused = false;
        lastTimestamp = performance.now();
        loop(lastTimestamp);
      }
    });

    window.addEventListener('mousemove', function(e) {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2.0;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2.0;
    });

    var lastTimestamp = performance.now();

    // Verificamos si Three.js está disponible
    if (typeof THREE !== 'undefined') {
      initThreeJS();
    } else {
      initNativeWebGL();
    }

    // =========================================================================
    // IMPLEMENTACIÓN THREE.JS
    // =========================================================================
    function initThreeJS() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.2;

      var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Creación de nube de puntos en esfera con distribución Fibonacci uniforme
      var particleCount = 16000;
      var geometry = new THREE.BufferGeometry();
      var positions = new Float32Array(particleCount * 3);
      var randoms = new Float32Array(particleCount);

      var phi = Math.PI * (3.0 - Math.sqrt(5.0));
      for (var i = 0; i < particleCount; i++) {
        var y = 1.0 - (i / (particleCount - 1.0)) * 2.0;
        var r = Math.sqrt(Math.max(0.0, 1.0 - y * y));
        var theta = phi * i;
        var x = Math.cos(theta) * r;
        var z = Math.sin(theta) * r;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        randoms[i] = Math.random();
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

      // Shaders con Ruido Simplex 3D y Ruido de Erosión Recursivo (fBm Invertido)
      var vertexShader = [
        'uniform float uTime;',
        'uniform vec2 uMouse;',
        'attribute float aRandom;',
        'varying float vErosion;',
        'varying float vDist;',
        '',
        'vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }',
        'vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }',
        'vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }',
        'vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }',
        '',
        'float snoise(vec3 v) {',
        '  const vec2 C = vec2(1.0/6.0, 1.0/3.0);',
        '  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);',
        '  vec3 i  = floor(v + dot(v, C.yyy));',
        '  vec3 x0 = v - i + dot(i, C.xxx);',
        '  vec3 g = step(x0.yzx, x0.xyz);',
        '  vec3 l = 1.0 - g;',
        '  vec3 i1 = min(g.xyz, l.zxy);',
        '  vec3 i2 = max(g.xyz, l.zxy);',
        '  vec3 x1 = x0 - i1 + C.xxx;',
        '  vec3 x2 = x0 - i2 + C.yyy;',
        '  vec3 x3 = x0 - D.yyy;',
        '  i = mod289(i);',
        '  vec4 p = permute(permute(permute(',
        '             i.z + vec4(0.0, i1.z, i2.z, 1.0))',
        '           + i.y + vec4(0.0, i1.y, i2.y, 1.0))',
        '           + i.x + vec4(0.0, i1.x, i2.x, 1.0));',
        '  float n_ = 0.142857142857;',
        '  vec3 ns = n_ * D.wyz - D.xzx;',
        '  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);',
        '  vec4 x_ = floor(j * ns.z);',
        '  vec4 y_ = floor(j - 7.0 * x_);',
        '  vec4 x = x_ * ns.x + ns.yyyy;',
        '  vec4 y = y_ * ns.x + ns.yyyy;',
        '  vec4 h = 1.0 - abs(x) - abs(y);',
        '  vec4 b0 = vec4(x.xy, y.xy);',
        '  vec4 b1 = vec4(x.zw, y.zw);',
        '  vec4 s0 = floor(b0)*2.0 + 1.0;',
        '  vec4 s1 = floor(b1)*2.0 + 1.0;',
        '  vec4 sh = -step(h, vec4(0.0));',
        '  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;',
        '  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;',
        '  vec3 p0 = vec3(a0.xy, h.x);',
        '  vec3 p1 = vec3(a0.zw, h.y);',
        '  vec3 p2 = vec3(a1.xy, h.z);',
        '  vec3 p3 = vec3(a1.zw, h.w);',
        '  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));',
        '  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;',
        '  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
        '  m = m * m;',
        '  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));',
        '}',
        '',
        'float recursiveErosion(vec3 p, float t) {',
        '  float f = 0.0;',
        '  float amp = 0.52;',
        '  float freq = 0.95;',
        '  vec3 shift = vec3(t * 0.12, t * 0.16, t * 0.08);',
        '  for (int i = 0; i < 4; i++) {',
        '    float n = snoise(p * freq + shift);',
        '    float erosion = 1.0 - abs(n);',
        '    f += erosion * amp;',
        '    freq *= 2.05;',
        '    amp *= 0.5;',
        '    shift = shift.yzx * 1.35;',
        '  }',
        '  return f;',
        '}',
        '',
        'void main() {',
        '  float erosion = recursiveErosion(position, uTime * 0.3);',
        '  vErosion = erosion;',
        '  float radius = 1.3 + erosion * 0.65;',
        '  vec3 deformed = normalize(position) * radius;',
        '',
        '  deformed.x += uMouse.x * 0.15;',
        '  deformed.y += uMouse.y * 0.15;',
        '',
        '  vec4 mvPosition = modelViewMatrix * vec4(deformed, 1.0);',
        '  vDist = -mvPosition.z;',
        '  gl_Position = projectionMatrix * mvPosition;',
        '  gl_PointSize = max(1.5, (16.0 / -mvPosition.z));',
        '}'
      ].join('\\n');

      var fragmentShader = [
        'varying float vErosion;',
        'varying float vDist;',
        'uniform vec3 uBaseColor;',
        'uniform vec3 uAmberColor;',
        'uniform vec3 uBrightColor;',
        '',
        'void main() {',
        '  vec2 pt = gl_PointCoord - vec2(0.5);',
        '  float d = length(pt);',
        '  if (d > 0.5) discard;',
        '  float alpha = smoothstep(0.5, 0.08, d);',
        '',
        '  vec3 col = mix(uBaseColor, uAmberColor, smoothstep(0.35, 0.7, vErosion));',
        '  col = mix(col, uBrightColor, smoothstep(0.7, 0.98, vErosion));',
        '  col *= clamp(0.3 + (4.8 - vDist) * 0.22, 0.2, 1.15);',
        '',
        '  gl_FragColor = vec4(col, alpha * 0.88);',
        '}'
      ].join('\\n');

      var material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uBaseColor: { value: new THREE.Vector3(${baseColorHex}) },
          uAmberColor: { value: new THREE.Vector3(${amberColorHex}) },
          uBrightColor: { value: new THREE.Vector3(${brightColorHex}) }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

      var points = new THREE.Points(geometry, material);
      scene.add(points);

      window.addEventListener('resize', function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });

      function render(now) {
        if (isPaused) return;
        var delta = (now - lastTimestamp) * 0.001;
        lastTimestamp = now;
        time += delta;

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        material.uniforms.uTime.value = time;
        material.uniforms.uMouse.value.set(mouse.x, mouse.y);

        points.rotation.y = time * 0.08;
        points.rotation.x = time * 0.04 + mouse.y * 0.15;
        points.rotation.z = mouse.x * 0.1;

        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(render);
      }

      animFrameId = requestAnimationFrame(render);
    }

    // =========================================================================
    // FALLBACK WEBGL NATIVO (100% OFFLINE / RESILIENTE EN AULAS SIN INTERNET)
    // =========================================================================
    function initNativeWebGL() {
      var gl = canvas.getContext('webgl', { antialias: true, alpha: true }) ||
               canvas.getContext('experimental-webgl');
      if (!gl) return;

      function resize() {
        canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
        canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
      resize();
      window.addEventListener('resize', resize);

      var vsSource = [
        'precision mediump float;',
        'attribute vec3 aPosition;',
        'uniform float uTime;',
        'uniform vec2 uMouse;',
        'uniform vec2 uResolution;',
        'varying float vErosion;',
        '',
        'float hash(vec3 p) {',
        '  p = fract(p * 0.3183099 + 0.1);',
        '  p *= 17.0;',
        '  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));',
        '}',
        'float noise(vec3 x) {',
        '  vec3 i = floor(x);',
        '  vec3 f = fract(x);',
        '  f = f * f * (3.0 - 2.0 * f);',
        '  return mix(mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)),f.x),',
        '                 mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)),f.x),f.y),',
        '             mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)),f.x),',
        '                 mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)),f.x),f.y),f.z);',
        '}',
        'float recursiveErosion(vec3 p, float t) {',
        '  float f = 0.0;',
        '  float amp = 0.5;',
        '  for(int i = 0; i < 3; i++) {',
        '    float n = noise(p * 1.5 + vec3(t * 0.2));',
        '    f += (1.0 - abs(n * 2.0 - 1.0)) * amp;',
        '    p *= 2.0;',
        '    amp *= 0.5;',
        '  }',
        '  return f;',
        '}',
        'void main() {',
        '  float erosion = recursiveErosion(aPosition, uTime * 0.4);',
        '  vErosion = erosion;',
        '  vec3 pos = normalize(aPosition) * (1.1 + erosion * 0.5);',
        '  float rotY = uTime * 0.1;',
        '  mat2 rY = mat2(cos(rotY), -sin(rotY), sin(rotY), cos(rotY));',
        '  pos.xz = rY * pos.xz;',
        '  vec2 proj = pos.xy / (pos.z + 2.8);',
        '  proj.x *= uResolution.y / uResolution.x;',
        '  proj += uMouse * 0.08;',
        '  gl_Position = vec4(proj * 1.4, 0.0, 1.0);',
        '  gl_PointSize = max(1.5, 9.0 / (pos.z + 2.8));',
        '}'
      ].join('\\n');

      var fsSource = [
        'precision mediump float;',
        'varying float vErosion;',
        'void main() {',
        '  vec2 pt = gl_PointCoord - vec2(0.5);',
        '  if (length(pt) > 0.5) discard;',
        '  vec3 charcoal = vec3(${baseColorHex});',
        '  vec3 amber = vec3(${amberColorHex});',
        '  vec3 bright = vec3(${brightColorHex});',
        '  vec3 col = mix(charcoal, amber, smoothstep(0.3, 0.65, vErosion));',
        '  col = mix(col, bright, smoothstep(0.65, 0.95, vErosion));',
        '  gl_FragColor = vec4(col, 0.85);',
        '}'
      ].join('\\n');

      function createShader(gl, type, source) {
        var s = gl.createShader(type);
        gl.shaderSource(s, source);
        gl.compileShader(s);
        return s;
      }

      var vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
      var fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
      var prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      gl.useProgram(prog);

      var pCount = 12000;
      var pts = new Float32Array(pCount * 3);
      var phi = Math.PI * (3.0 - Math.sqrt(5.0));
      for (var i = 0; i < pCount; i++) {
        var y = 1.0 - (i / (pCount - 1.0)) * 2.0;
        var r = Math.sqrt(Math.max(0.0, 1.0 - y * y));
        var th = phi * i;
        pts[i * 3] = Math.cos(th) * r;
        pts[i * 3 + 1] = y;
        pts[i * 3 + 2] = Math.sin(th) * r;
      }

      var buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);

      var aPos = gl.getAttribLocation(prog, 'aPosition');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

      var uTime = gl.getUniformLocation(prog, 'uTime');
      var uMouse = gl.getUniformLocation(prog, 'uMouse');
      var uRes = gl.getUniformLocation(prog, 'uResolution');

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      function loop(now) {
        if (isPaused) return;
        var delta = (now - lastTimestamp) * 0.001;
        lastTimestamp = now;
        time += delta;

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(uTime, time);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform2f(uRes, canvas.width, canvas.height);

        gl.drawArrays(gl.POINTS, 0, pCount);
        animFrameId = requestAnimationFrame(loop);
      }

      animFrameId = requestAnimationFrame(loop);
    }
  })();
  <\/script>
</body>
</html>`;
}
