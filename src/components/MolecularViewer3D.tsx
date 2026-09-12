import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Atom3D, MoleculeData } from '../types/chemistry';
import { 
  RotateCw, 
  Tag, 
  Camera, 
  ZoomIn, 
  ZoomOut, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface MolecularViewer3DProps {
  molecule: MoleculeData;
  className?: string;
  onSelectAtom?: (atom: Atom3D | null) => void;
  selectedAtom?: Atom3D | null;
}

export const MolecularViewer3D: React.FC<MolecularViewer3DProps> = ({
  molecule,
  className = '',
  onSelectAtom,
  selectedAtom,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const moleculeGroupRef = useRef<THREE.Group | null>(null);
  const atomMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

  // Viewer state
  const [viewMode, setViewMode] = useState<'ball-and-stick' | 'space-filling' | 'wireframe'>('ball-and-stick');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [hoveredAtom, setHoveredAtom] = useState<Atom3D | null>(null);
  const [labelPositions, setLabelPositions] = useState<Array<{ id: string; label: string; x: number; y: number; visible: boolean; symbol: string }>>([]);

  // Snapshot functionality
  const handleCaptureSnapshot = useCallback(() => {
    if (!rendererRef.current) return;
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${molecule.id}_vcm3d_model.png`;
    link.href = dataUrl;
    link.click();
  }, [molecule.id]);

  // Reset Camera View
  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0, 0, 7.5);
    cameraRef.current.lookAt(0, 0, 0);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.reset();
  }, []);

  // Zoom handlers
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const factor = direction === 'in' ? 0.85 : 1.15;
    cameraRef.current.position.multiplyScalar(factor);
    if (controlsRef.current) controlsRef.current.update();
  }, []);

  // Setup Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1.0;
    controls.minDistance = 2.5;
    controls.maxDistance = 20;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.6;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    mainKeyLight.position.set(5, 8, 7);
    scene.add(mainKeyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x5de1e5, 0.5);
    cyanRimLight.position.set(-6, -4, -5);
    scene.add(cyanRimLight);

    const amberFillLight = new THREE.DirectionalLight(0xf97316, 0.6);
    amberFillLight.position.set(4, -5, 5);
    scene.add(amberFillLight);

    // Subtle charcoal / amber wireframe grid floor
    const grid = new THREE.GridHelper(14, 28, 0xf97316, 0x27272a);
    grid.position.y = -2.6;
    if (Array.isArray(grid.material)) {
      grid.material.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.16;
      });
    } else {
      grid.material.transparent = true;
      grid.material.opacity = 0.16;
    }
    scene.add(grid);

    // Molecule group
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);
    moleculeGroupRef.current = moleculeGroup;

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Update 2D projected label positions
      if (showLabels && cameraRef.current && container) {
        const positions: Array<{ id: string; label: string; x: number; y: number; visible: boolean; symbol: string }> = [];
        const rect = container.getBoundingClientRect();

        molecule.atoms.forEach((atom) => {
          const v = new THREE.Vector3(atom.x, atom.y, atom.z);
          // Transform by molecule group matrix if rotated
          if (moleculeGroupRef.current) {
            v.applyMatrix4(moleculeGroupRef.current.matrixWorld);
          }
          v.project(cameraRef.current!);

          // Only show if in front of camera
          const isVisible = v.z < 1;
          const x = ((v.x + 1) * rect.width) / 2;
          const y = ((-v.y + 1) * rect.height) / 2;

          positions.push({
            id: atom.id,
            label: atom.label || atom.symbol,
            symbol: atom.symbol,
            x,
            y,
            visible: isVisible && x >= 0 && x <= rect.width && y >= 0 && y <= rect.height,
          });
        });

        setLabelPositions(positions);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Mouse move & click for raycasting
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current || !moleculeGroupRef.current) return;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

      const meshes = Array.from(atomMeshesRef.current.values());
      const intersects = raycasterRef.current.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const atomId = hitMesh.userData?.atomId;
        const atom = molecule.atoms.find((a) => a.id === atomId);
        setHoveredAtom(atom || null);
      } else {
        setHoveredAtom(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!cameraRef.current || !moleculeGroupRef.current) return;
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

      const meshes = Array.from(atomMeshesRef.current.values());
      const intersects = raycasterRef.current.intersectObjects(meshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const atomId = hitMesh.userData?.atomId;
        const atom = molecule.atoms.find((a) => a.id === atomId);
        if (onSelectAtom) onSelectAtom(atom || null);
      } else {
        if (onSelectAtom) onSelectAtom(null);
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      controls.dispose();
      renderer.dispose();
    };
  }, [molecule, onSelectAtom]);

  // Update controls autoRotate dynamically
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // Re-build 3D Molecular Geometry whenever molecule or viewMode changes
  useEffect(() => {
    const group = moleculeGroupRef.current;
    if (!group) return;

    // Clear previous objects
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }
    atomMeshesRef.current.clear();

    const isSpaceFilling = viewMode === 'space-filling';
    const isWireframe = viewMode === 'wireframe';

    // Sphere geometry (cached base)
    const sphereSegments = isWireframe ? 16 : 32;
    const sphereGeoBase = new THREE.SphereGeometry(1, sphereSegments, sphereSegments);

    // 1. Create Atoms
    molecule.atoms.forEach((atom) => {
      let r = atom.radius;
      if (isSpaceFilling) {
        // Van der Waals scale
        switch (atom.symbol) {
          case 'H': r = 0.70; break;
          case 'C': r = 1.15; break;
          case 'N': r = 1.05; break;
          case 'O': r = 1.00; break;
          default: r = 1.00;
        }
      } else if (isWireframe) {
        r = atom.radius * 0.9;
      }

      let material: THREE.Material;
      const baseColor = new THREE.Color(atom.color);

      if (isWireframe) {
        material = new THREE.MeshBasicMaterial({
          color: baseColor,
          wireframe: true,
          transparent: true,
          opacity: 0.85,
        });
      } else {
        material = new THREE.MeshPhysicalMaterial({
          color: baseColor,
          roughness: 0.25,
          metalness: 0.1,
          clearcoat: 0.35,
          clearcoatRoughness: 0.15,
          reflectivity: 0.6,
        });
      }

      const atomMesh = new THREE.Mesh(sphereGeoBase.clone(), material);
      atomMesh.scale.set(r, r, r);
      atomMesh.position.set(atom.x, atom.y, atom.z);
      atomMesh.userData = { atomId: atom.id, atom };

      group.add(atomMesh);
      atomMeshesRef.current.set(atom.id, atomMesh);
    });

    // 2. Create Bonds (only in ball-and-stick and wireframe modes)
    if (!isSpaceFilling) {
      molecule.bonds.forEach((bond) => {
        const atomA = molecule.atoms[bond.from];
        const atomB = molecule.atoms[bond.to];
        if (!atomA || !atomB) return;

        const posA = new THREE.Vector3(atomA.x, atomA.y, atomA.z);
        const posB = new THREE.Vector3(atomB.x, atomB.y, atomB.z);
        const diff = new THREE.Vector3().subVectors(posB, posA);
        const distance = diff.length();
        const dir = diff.clone().normalize();
        const midpoint = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);

        // Perpendicular vector for double/triple bonds offset
        const upVec = Math.abs(dir.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
        const perp = new THREE.Vector3().crossVectors(dir, upVec).normalize();

        const bondRadius = isWireframe ? 0.03 : bond.order > 1 ? 0.065 : 0.09;
        const offsets: number[] = [];

        if (bond.order === 1) {
          offsets.push(0);
        } else if (bond.order === 2) {
          offsets.push(-0.11, 0.11);
        } else if (bond.order === 3) {
          offsets.push(-0.15, 0, 0.15);
        }

        offsets.forEach((offsetVal) => {
          const cylGeo = new THREE.CylinderGeometry(
            bondRadius,
            bondRadius,
            distance,
            isWireframe ? 8 : 20,
            1,
            true
          );

          let bondMat: THREE.Material;
          if (isWireframe) {
            bondMat = new THREE.MeshBasicMaterial({
              color: 0x5de1e5,
              wireframe: true,
              transparent: true,
              opacity: 0.6,
            });
          } else {
            bondMat = new THREE.MeshPhysicalMaterial({
              color: 0x94a3b8, // sleek metallic titanium
              roughness: 0.25,
              metalness: 0.1,
              clearcoat: 0.35,
              clearcoatRoughness: 0.15,
            });
          }

          const cylMesh = new THREE.Mesh(cylGeo, bondMat);
          const currentMidpoint = midpoint.clone().add(perp.clone().multiplyScalar(offsetVal));
          cylMesh.position.copy(currentMidpoint);

          // Align cylinder along bond direction (default cylinder lies on Y-axis)
          cylMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

          group.add(cylMesh);
        });
      });
    }

    // 3. Create VSEPR Non-Bonding Electron Density Lobes (RPECV) for NH3 and H2O
    const hasVseprLobes = molecule.id === 'water' || molecule.id === 'ammonia';
    if (hasVseprLobes) {
      const createLobeGeometry = () => {
        const geo = new THREE.SphereGeometry(0.32, 24, 24);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          const factor = 1.0 + 0.28 * y; // wider tip, tapered base
          pos.setX(i, pos.getX(i) * 0.72 * factor);
          pos.setY(i, pos.getY(i) * 1.30 + 0.42); // stretch along Y and shift origin to base
          pos.setZ(i, pos.getZ(i) * 0.72 * factor);
        }
        geo.computeVertexNormals();
        return geo;
      };

      const lobeMaterial = isWireframe
        ? new THREE.MeshBasicMaterial({
            color: 0x5de1e5,
            wireframe: true,
            transparent: true,
            opacity: 0.55,
          })
        : new THREE.MeshPhysicalMaterial({
            color: 0x5de1e5,
            transparent: true,
            opacity: 0.40,
            roughness: 0.2,
            metalness: 0.05,
            transmission: 0.3,
            depthWrite: false,
            side: THREE.DoubleSide,
          });

      if (molecule.id === 'ammonia') {
        // Nitrogen atom
        const nAtom = molecule.atoms.find((a) => a.symbol === 'N') || molecule.atoms[0];
        const nPos = new THREE.Vector3(nAtom.x, nAtom.y, nAtom.z);
        // 1 Apical superior lobe over nitrogen pointing along +Z (opposite to N-H tripod)
        const apicalDir = new THREE.Vector3(0, 0, 1).normalize();
        const lobeMesh = new THREE.Mesh(createLobeGeometry(), lobeMaterial);
        lobeMesh.position.copy(nPos);
        lobeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), apicalDir);
        group.add(lobeMesh);
      } else if (molecule.id === 'water') {
        // Oxygen atom
        const oAtom = molecule.atoms.find((a) => a.symbol === 'O') || molecule.atoms[0];
        const oPos = new THREE.Vector3(oAtom.x, oAtom.y, oAtom.z);
        // 2 Tetrahedral lobes pointing in -Y tilted symmetrically along +Z and -Z
        const dir1 = new THREE.Vector3(0, -0.65, 0.76).normalize();
        const dir2 = new THREE.Vector3(0, -0.65, -0.76).normalize();

        const lobeMesh1 = new THREE.Mesh(createLobeGeometry(), lobeMaterial);
        lobeMesh1.position.copy(oPos);
        lobeMesh1.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir1);
        group.add(lobeMesh1);

        const lobeMesh2 = new THREE.Mesh(createLobeGeometry(), lobeMaterial);
        lobeMesh2.position.copy(oPos);
        lobeMesh2.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir2);
        group.add(lobeMesh2);
      }
    }

    // Centering calculation
    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    group.position.sub(center); // perfectly center molecule at (0, 0, 0)

  }, [molecule, viewMode]);

  const hasVseprLobes = molecule.id === 'water' || molecule.id === 'ammonia';

  return (
    <div className={`relative flex flex-col w-full h-full bg-black select-none overflow-hidden rounded-xl border border-oled-border ${className}`}>
      {/* 3D Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing relative min-h-[380px]"
      />

      {/* Floating 2D Billboards for Atom Labels */}
      {showLabels && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {labelPositions.map((pos) => {
            if (!pos.visible) return null;
            const isHovered = hoveredAtom?.id === pos.id;
            const isSelected = selectedAtom?.id === pos.id;

            return (
              <div
                key={pos.id}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
                }}
                className={`absolute transition-transform duration-75 text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-full border ${
                  isSelected
                    ? 'bg-amber-400 text-black border-white shadow-lg scale-125 z-20'
                    : isHovered
                    ? 'bg-amber-400 text-black border-white shadow-md scale-110 z-10'
                    : 'bg-black/75 text-white/95 border-white/20 backdrop-blur-sm'
                }`}
              >
                {pos.label}
              </div>
            );
          })}
        </div>
      )}

      {/* Top HUD Controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 bg-oled-panel backdrop-blur-md px-3 py-1.5 rounded-lg border border-oled-border text-xs text-slate-200 shadow-lg flex-wrap">
          <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="font-mono font-bold text-white">{molecule.formula}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 font-medium">{molecule.didactica.geometriaMolecular}</span>
          <span className="text-slate-600">|</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${molecule.didactica.polaridad === 'polar' ? 'bg-orange-950/60 text-orange-300 border border-orange-500/40' : 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50'}`}>
            {molecule.didactica.polaridad.toUpperCase()}
          </span>
          {hasVseprLobes && (
            <>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-950/80 border border-orange-400/60 text-orange-300 text-[10px] font-mono font-bold shadow-[0_0_12px_rgba(249,115,22,0.35)] animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Lóbulos RPECV Visibles
              </span>
            </>
          )}
        </div>

        {/* Action button bar */}
        <div className="flex items-center gap-1.5 bg-oled-panel backdrop-blur-md p-1 rounded-lg border border-oled-border shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pausar Rotación' : 'Reanudar Rotación'}
            className={`p-1.5 rounded-md transition-colors ${
              autoRotate ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowLabels(!showLabels)}
            title={showLabels ? 'Ocultar Etiquetas' : 'Mostrar Etiquetas'}
            className={`p-1.5 rounded-md transition-colors ${
              showLabels ? 'bg-amber-500/20 text-orange-400 border border-orange-500/40' : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Tag className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom('in')}
            title="Acercar (Zoom In)"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            title="Alejar (Zoom Out)"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Centrar y Reiniciar Vista"
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-oled-border mx-0.5" />

          <button
            onClick={handleCaptureSnapshot}
            title="Capturar Foto HD de la Molécula"
            className="p-1.5 rounded-md text-slate-400 hover:text-orange-400 hover:bg-white/10 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Mode Switcher HUD */}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-oled-panel backdrop-blur-md p-1 rounded-lg border border-oled-border shadow-lg">
        <button
          onClick={() => setViewMode('ball-and-stick')}
          className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
            viewMode === 'ball-and-stick'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-black font-extrabold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Esferas y Varillas (CPK)
        </button>
        <button
          onClick={() => setViewMode('space-filling')}
          className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
            viewMode === 'space-filling'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-black font-extrabold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Esferas Compactas (VDW)
        </button>
        <button
          onClick={() => setViewMode('wireframe')}
          className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
            viewMode === 'wireframe'
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-black font-extrabold shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          Estructura Malla 3D
        </button>
      </div>

      {/* Bottom Right Atom Inspector Tooltip */}
      {hoveredAtom && (
        <div className="absolute bottom-3 right-3 bg-zinc-950/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-orange-500/40 text-xs text-slate-200 shadow-2xl animate-fade-in pointer-events-none">
          <div className="flex items-center gap-2 font-mono font-bold text-orange-400">
            <span 
              className="w-3 h-3 rounded-full border border-white/50" 
              style={{ backgroundColor: hoveredAtom.color }} 
            />
            <span>{hoveredAtom.label || hoveredAtom.symbol} ({hoveredAtom.element})</span>
          </div>
          <div className="mt-1 flex gap-3 text-[11px] text-slate-400 font-mono">
            <span>Hibridación: <strong className="text-white">{hoveredAtom.hybridization === 'sp3' ? 'sp³' : hoveredAtom.hybridization === 'sp2' ? 'sp²' : hoveredAtom.hybridization}</strong></span>
            <span>Coord: <strong className="text-slate-300">[{hoveredAtom.x.toFixed(2)}, {hoveredAtom.y.toFixed(2)}, {hoveredAtom.z.toFixed(2)}]</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
