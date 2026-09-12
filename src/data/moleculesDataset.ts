/**
 * PIDE VcM 3D MolBuilder — Dataset Molecular Oficial
 * Universidad San Sebastián (USS) - Vinculación con el Medio
 *
 * Dataset determinista con coordenadas 3D baricéntricas en Ångströms,
 * fichas pedagógicas, inventario de kits físicos y trivias escolares.
 */

import { ElementSymbol, MoleculeData } from '../types/chemistry';

// Colores estándar CPK optimizados para contraste OLED en Three.js
export const CPK_COLORS: Record<ElementSymbol, string> = {
  C: '#262626',
  H: '#FFFFFF',
  O: '#EF4444',
  N: '#3B82F6',
  Cl: '#10B981',
  S: '#F59E0B',
};

// Radios relativos de esferas 3D en Three.js
export const ATOM_RADII: Record<ElementSymbol, number> = {
  C: 0.45,
  H: 0.25,
  O: 0.40,
  N: 0.42,
  Cl: 0.48,
  S: 0.46,
};

export const MOLECULES_DATASET: MoleculeData[] = [
  // =========================================================================
  // 1. AGUA (H₂O)
  // =========================================================================
  {
    id: 'water',
    name: 'Agua',
    iupacName: 'Oxidano',
    formula: 'H₂O',
    molarMass: 18.015,
    classification: 'Solvente inorgánico polar',
    difficultyLevel: 'facil',
    timeLimitSeconds: 60,
    atoms: [
      { id: 'h2o-o', element: 'O', symbol: 'O', label: 'O', x: 0.000, y: -0.391, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp3' },
      { id: 'h2o-h1', element: 'H', symbol: 'H', label: 'H1', x: 0.758, y: 0.195, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'h2o-h2', element: 'H', symbol: 'H', label: 'H2', x: -0.758, y: 0.195, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'h2o-b1', from: 0, to: 1, order: 1 },
      { id: 'h2o-b2', from: 0, to: 2, order: 1 },
    ],
    didactica: {
      descripcionCientifica: 'Molécula triatómica dipolar unida por dos enlaces covalentes polares O-H. El oxígeno posee dos pares de electrones no enlazantes que ejercen una fuerte repulsión sobre los pares enlazantes, comprimiendo el ángulo tetraédrico de 109.5° a 104.5°. Es la base de la vida y el solvente universal gracias a su capacidad de formar redes tridimensionales de puentes de hidrógeno.',
      datosCuriosos: [
        'El hielo flota porque el agua líquida alcanza su máxima densidad a 4 °C; al congelarse, los puentes de hidrógeno forman una red hexagonal abierta y hueca que expande su volumen en un 9%.',
        'Tiene una tensión superficial asombrosamente alta: permite a insectos como los patinadores de agua caminar sobre ella sin romper la superficie.',
        'Posee un calor específico colosal (4.184 J/(g·°C)), lo que convierte a los océanos terrestres en el mayor amortiguador térmico de nuestro planeta.',
        'En un solo vaso de agua (250 ml) hay aproximadamente 8.36 × 10²⁴ moléculas, más estrellas de las que existen en todo el universo observable.',
      ],
      usosVidaCotidiana: [
        'Solvente vital en todos los fluidos biológicos (citoplasma celular, plasma sanguíneo y linfa).',
        'Vehículo y medio de reacción fundamental en farmacología y formulación de jarabes y soluciones.',
        'Termorregulación biológica corporal a través de la evaporación por sudoración.',
        'Generación de energía limpia en centrales hidroeléctricas y generación de vapor en turbinas.',
      ],
      geometriaMolecular: 'Angular (104.5°)',
      polaridad: 'polar',
      justificacionPolaridad: 'Momento dipolar neto alto (1.85 D) generado por la asimetría angular y la fuerte electronegatividad del oxígeno (3.44) respecto al hidrógeno (2.20).',
    },
    kitFisico: {
      esferas: { O: 1, H: 2 },
      conectores: { cortosRigidos: 2, largosFlexibles: 0 },
      descripcionConectores: '2 conectores cortos rígidos (enlaces simples O-H).',
      tipsArmado: '¡No uses orificios a 180°! Utiliza los orificios angulares de la esfera roja del oxígeno para que los dos hidrógenos queden formando una "V" con ángulo de ~104.5°.',
    },
    trivia: {
      pregunta: 'Según el modelo de Repulsión de Pares Electrónicos de la Capa de Valencia (RPECV), ¿por qué el ángulo de enlace H-O-H en el agua (104.5°) es menor que el ángulo tetraédrico ideal (109.5°)?',
      opciones: [
        'Porque los dos pares de electrones no enlazantes del oxígeno ocupan más espacio y ejercen mayor repulsión que los pares enlazantes, comprimiendo el ángulo.',
        'Porque los dos átomos de hidrógeno presentan cargas parciales opuestas y experimentan atracción mutua en el espacio.',
        'Porque el oxígeno presenta hibridación sp con geometría lineal pero sufre deformaciones por enlaces iónicos.',
        'Porque el núcleo del átomo de oxígeno absorbe electrones de los enlaces covalentes reduciendo su longitud.',
      ],
      respuestaCorrecta: 0,
      explicacion: 'En el modelo RPECV, los pares de electrones no enlazantes interactúan solo con un núcleo atómico y están más deslocalizados, por lo que su orden de repulsión es: par no enlazante - par no enlazante > par no enlazante - par enlazante > par enlazante - par enlazante. Esta asimetría comprime los enlaces O-H desde 109.5° a 104.5°.',
    },
  },

  // =========================================================================
  // 2. DIÓXIDO DE CARBONO (CO₂)
  // =========================================================================
  {
    id: 'carbon-dioxide',
    name: 'Dióxido de Carbono',
    iupacName: 'Dióxido de carbono',
    formula: 'CO₂',
    molarMass: 44.01,
    classification: 'Óxido no metálico / Gas inorgánico',
    difficultyLevel: 'facil',
    timeLimitSeconds: 60,
    atoms: [
      { id: 'co2-c', element: 'C', symbol: 'C', label: 'C', x: 0.000, y: 0.000, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp' },
      { id: 'co2-o1', element: 'O', symbol: 'O', label: 'O1', x: 1.160, y: 0.000, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp2' },
      { id: 'co2-o2', element: 'O', symbol: 'O', label: 'O2', x: -1.160, y: 0.000, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp2' },
    ],
    bonds: [
      { id: 'co2-b1', from: 0, to: 1, order: 2 },
      { id: 'co2-b2', from: 0, to: 2, order: 2 },
    ],
    didactica: {
      descripcionCientifica: 'Molécula triatómica lineal con dos dobles enlaces C=O. El carbono central tiene hibridación sp sin pares de electrones no enlazantes, ubicando a los dos oxígenos en extremos diametralmente opuestos (180°). Aunque los enlaces individuales C=O son polares, los dos vectores dipolares poseen igual magnitud y sentido opuesto, anulándose mutuamente.',
      datosCuriosos: [
        'A presión atmosférica no tiene fase líquida: pasa directamente de sólido a gas a -78.5 °C, motivo por el cual se le llama "hielo seco".',
        'Representa más del 95% de las atmósferas de Marte y Venus; en la Tierra es solo ~0.042% (420 ppm), pero indispensable para mantener el calor del planeta.',
        'En estado supercrítico (scCO₂, por encima de 31.1 °C y 73.9 bar) disuelve la cafeína de los granos de café sin dejar residuos químicos nocivos.',
        'La efervescencia de las bebidas gaseosas se rige por la Ley de Henry: al destapar la lata, la presión baja bruscamente y el CO₂ disuelto escapa en burbujas.',
      ],
      usosVidaCotidiana: [
        'Gasificante y acidulante suave en bebidas gaseosas, cervezas y aguas con gas.',
        'Agente extintor en incendios eléctricos (clase C) al sofocar el aire sin conducir electricidad.',
        'Refrigeración de vacunas y transporte de muestras biológicas mediante hielo seco.',
        'Sustrato fotosintético con el cual las plantas producen glucosa y oxígeno.',
      ],
      geometriaMolecular: 'Lineal (180°)',
      polaridad: 'apolar',
      justificacionPolaridad: 'Geometría lineal y centros de carga simétricos: los dos dipolos de enlace C=O se cancelan vectorialmente dando un momento dipolar neto igual a cero (μ = 0 D).',
    },
    kitFisico: {
      esferas: { C: 1, O: 2 },
      conectores: { cortosRigidos: 0, largosFlexibles: 4 },
      descripcionConectores: '4 conectores flexibles largos o curvos (2 para cada enlace doble C=O).',
      tipsArmado: '¡Cada enlace C=O es un doble enlace! Debes colocar 2 conectores flexibles entre el carbono central y cada oxígeno rojo, asegurando que los tres átomos queden en una línea recta (180°).',
    },
    trivia: {
      pregunta: 'A pesar de que cada enlace C=O es fuertemente polar por la diferencia de electronegatividad, ¿por qué la molécula de CO₂ es globalmente apolar (μ = 0 D)?',
      opciones: [
        'Porque el carbono transfiere completamente sus cuatro electrones al oxígeno formando un enlace iónico simétrico.',
        'Porque su geometría lineal (180°) provoca que los dos vectores de momento dipolar de enlace posean igual magnitud y sentido opuesto, cancelándose.',
        'Porque el carbono central presenta hibridación sp³ con dos pares de electrones no enlazantes que neutralizan las densidades de carga.',
        'Porque los enlaces dobles impiden cualquier tipo de interacción electrostática entre los átomos.',
      ],
      respuestaCorrecta: 1,
      explicacion: 'La polaridad molecular es la suma vectorial de los momentos dipolares de enlace. Al poseer el carbono central hibridación sp y geometría lineal (180°), los dos dipolos de enlace C=O apuntan en sentidos diametralmente opuestos anulándose exactamente, lo que resulta en un momento dipolar neto nulo (μ = 0 D).',
    },
  },

  // =========================================================================
  // 3. METANO (CH₄)
  // =========================================================================
  {
    id: 'methane',
    name: 'Metano',
    iupacName: 'Metano',
    formula: 'CH₄',
    molarMass: 16.043,
    classification: 'Hidrocarburo alcano / Gas combustible',
    difficultyLevel: 'facil',
    timeLimitSeconds: 60,
    atoms: [
      { id: 'ch4-c', element: 'C', symbol: 'C', label: 'C', x: 0.000, y: 0.000, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ch4-h1', element: 'H', symbol: 'H', label: 'H1', x: 0.629, y: 0.629, z: 0.629, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ch4-h2', element: 'H', symbol: 'H', label: 'H2', x: -0.629, y: -0.629, z: 0.629, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ch4-h3', element: 'H', symbol: 'H', label: 'H3', x: -0.629, y: 0.629, z: -0.629, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ch4-h4', element: 'H', symbol: 'H', label: 'H4', x: 0.629, y: -0.629, z: -0.629, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'ch4-b1', from: 0, to: 1, order: 1 },
      { id: 'ch4-b2', from: 0, to: 2, order: 1 },
      { id: 'ch4-b3', from: 0, to: 3, order: 1 },
      { id: 'ch4-b4', from: 0, to: 4, order: 1 },
    ],
    didactica: {
      descripcionCientifica: 'El alcano más simple y modelo canónico de la hibridación sp³ del carbono. Forma cuatro enlaces covalentes simples C-H orientados hacia los vértices de un tetraedro regular perfecto con ángulos de 109.5°. Carece de momento dipolar permanente y solo presenta débiles fuerzas intermoleculares de dispersión de London.',
      datosCuriosos: [
        'El gas natural es completamente inodoro; por seguridad domiciliaria se le añade metanotiol (olor a huevo podrido) para que detectemos fugas al instante.',
        'En un plazo de 20 años, calienta la atmósfera 84 veces más que el CO₂, siendo clave en la mitigación del cambio climático.',
        'Bajo el lecho marino existen "clatratos de metano" (hielo con gas atrapado); ¡si les acercas un fósforo, el hielo se enciende como una antorcha!',
        'Titán, la luna de Saturno, posee un ciclo meteorológico completo de metano: nubes, lluvia y lagos enteros de metano líquido a -179 °C.',
      ],
      usosVidaCotidiana: [
        'Combustible de calefacción y cocina domiciliaria a través de redes de gas natural.',
        'Materia prima petroquímica para obtener gas de síntesis (H₂ y CO) en la producción de amoníaco.',
        'Combustible vehicular en flotas de transporte público a Gas Natural Comprimido (GNC).',
        'Biogás renovable generado en biodigestores a partir de purines y residuos agrícolas.',
      ],
      geometriaMolecular: 'Tetraédrica (109.5°)',
      polaridad: 'apolar',
      justificacionPolaridad: 'Baja diferencia de electronegatividad (Δχ = 0.35) y simetría tetraédrica perfecta Td que anula todo momento dipolar permanente (μ = 0 D).',
    },
    kitFisico: {
      esferas: { C: 1, H: 4 },
      conectores: { cortosRigidos: 4, largosFlexibles: 0 },
      descripcionConectores: '4 conectores cortos rígidos (enlaces simples C-H).',
      tipsArmado: 'Usa los 4 orificios tetraédricos de la esfera negra de carbono. Los hidrógenos no deben quedar alineados ni en cruz plana, sino distribuidos uniformemente en el espacio tridimensional.',
    },
    trivia: {
      pregunta: '¿Qué tipo de hibridación orbital experimenta el átomo de carbono en el metano (CH₄) y qué geometría espacial tridimensional adopta para minimizar las repulsiones electrónicas?',
      opciones: [
        'Hibridación sp con geometría lineal y ángulos de 180°.',
        'Hibridación sp² con geometría trigonal plana y ángulos de 120°.',
        'Hibridación sp³ con geometría tetraédrica y ángulos de 109.5°.',
        'Hibridación dsp² con geometría cuadrada plana y ángulos de 90°.',
      ],
      respuestaCorrecta: 2,
      explicacion: 'El átomo de carbono combina su orbital 2s con tres orbitales 2p para dar origen a cuatro orbitales híbridos sp³ degenerados y equivalentes. Según el modelo RPECV, cuatro pares de electrones enlazantes se distancian al máximo orientándose hacia los vértices de un tetraedro regular perfecto (109.47° ~ 109.5°).',
    },
  },

  // =========================================================================
  // 4. AMONÍACO (NH₃) — Bonus / Desafío Extra
  // =========================================================================
  {
    id: 'ammonia',
    name: 'Amoníaco',
    iupacName: 'Azano',
    formula: 'NH₃',
    molarMass: 17.031,
    classification: 'Hidruro inorgánico / Base de Lewis',
    difficultyLevel: 'facil',
    timeLimitSeconds: 60,
    atoms: [
      { id: 'nh3-n', element: 'N', symbol: 'N', label: 'N', x: 0.000, y: 0.000, z: 0.279, color: CPK_COLORS.N, radius: ATOM_RADII.N, hybridization: 'sp3' },
      { id: 'nh3-h1', element: 'H', symbol: 'H', label: 'H1', x: 0.941, y: 0.000, z: -0.093, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'nh3-h2', element: 'H', symbol: 'H', label: 'H2', x: -0.471, y: 0.815, z: -0.093, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'nh3-h3', element: 'H', symbol: 'H', label: 'H3', x: -0.471, y: -0.815, z: -0.093, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'nh3-b1', from: 0, to: 1, order: 1 },
      { id: 'nh3-b2', from: 0, to: 2, order: 1 },
      { id: 'nh3-b3', from: 0, to: 3, order: 1 },
    ],
    didactica: {
      descripcionCientifica: 'Molécula formada por un átomo central de nitrógeno con hibridación sp³ unido a tres átomos de hidrógeno mediante enlaces covalentes simples y un par de electrones no enlazante. Su geometría es piramidal trigonal con un ángulo de 107.3°. Actúa como base de Lewis típica aceptando protones para formar el catión amonio (NH₄⁺).',
      datosCuriosos: [
        'El proceso Haber-Bosch para producir amoníaco a partir del aire consume el 1.5% de la energía mundial y sostiene los fertilizantes que alimentan a la mitad del planeta.',
        'Sufre un efecto túnel cuántico llamado "inversión de paraguas": el nitrógeno oscila a través del plano de hidrógenos 24.000 millones de veces por segundo (24 GHz).',
        'Antiguamente se usaban "sales aromáticas" de amoníaco para reanimar personas desmayadas al provocar una violenta inhalación refleja.',
        'Un solo litro de agua fría puede disolver hasta 1.100 litros de amoníaco gaseoso debido a su extrema afinidad por formar puentes de hidrógeno.',
      ],
      usosVidaCotidiana: [
        'Fabricación masiva de fertilizantes nitrogenados (urea, nitrato de amonio).',
        'Ingrediente activo en desengrasantes domésticos y limpiadores de cristales.',
        'Refrigerante industrial (R-717) con cero impacto en la capa de ozono (ODP = 0).',
        'Precursor en la manufactura de nylon, tinturas, polímeros y fármacos.',
      ],
      geometriaMolecular: 'Piramidal trigonal (107.3°)',
      polaridad: 'polar',
      justificacionPolaridad: 'El nitrógeno es electronegativo (3.04) y la geometría piramidal genera un momento dipolar neto de 1.47 D dirigido hacia el par de electrones no enlazante apical.',
    },
    kitFisico: {
      esferas: { N: 1, H: 3 },
      conectores: { cortosRigidos: 3, largosFlexibles: 0 },
      descripcionConectores: '3 conectores cortos rígidos (enlaces simples N-H).',
      tipsArmado: 'Toma la esfera azul de nitrógeno: coloca los 3 conectores en los orificios que apuntan hacia abajo formando una pequeña pirámide tripoidal y deja libre el orificio superior.',
    },
    trivia: {
      pregunta: 'El átomo central de nitrógeno en el amoníaco (NH₃) posee 4 dominios de electrones de valencia (3 pares enlazantes y 1 par no enlazante). ¿Cuál es su geometría molecular según RPECV?',
      opciones: [
        'Trigonal plana, porque tiene 3 enlaces covalentes simples distribuidos a 120°.',
        'Tetraédrica regular, ya que el par no enlazante cuenta visualmente como un cuarto vértice atómico.',
        'Geometría en forma de T con dos enlaces a 90° y uno a 180°.',
        'Piramidal trigonal (tipo AX₃E), con el nitrógeno en la cúspide y un ángulo de enlace comprimido a ~107.3°.',
      ],
      respuestaCorrecta: 3,
      explicacion: 'Se debe distinguir la geometría electrónica (tetraédrica, al considerar los 4 dominios) de la geometría molecular, que describe únicamente la disposición tridimensional de los núcleos atómicos. El par de electrones no enlazante apical rechaza a los pares enlazantes N-H, cerrando los ángulos a 107.3° en una pirámide de base triangular.',
    },
  },

  // =========================================================================
  // 5. ETANOL (C₂H₆O)
  // =========================================================================
  {
    id: 'ethanol',
    name: 'Etanol',
    iupacName: 'Etanol',
    formula: 'C₂H₆O',
    molarMass: 46.069,
    classification: 'Alcohol alifático primario',
    difficultyLevel: 'intermedio',
    timeLimitSeconds: 90,
    atoms: [
      { id: 'eth-c1', element: 'C', symbol: 'C', label: 'C1', x: -0.994, y: -0.120, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'eth-c2', element: 'C', symbol: 'C', label: 'C2', x: 0.526, y: -0.120, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'eth-o', element: 'O', symbol: 'O', label: 'O', x: 1.003, y: 1.228, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp3' },
      { id: 'eth-ho', element: 'H', symbol: 'H', label: 'HO', x: 1.760, y: 0.638, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'eth-h2a', element: 'H', symbol: 'H', label: 'H2a', x: 0.889, y: -0.634, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'eth-h2b', element: 'H', symbol: 'H', label: 'H2b', x: 0.889, y: -0.634, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'eth-h1a', element: 'H', symbol: 'H', label: 'H1a', x: -1.357, y: -1.148, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'eth-h1b', element: 'H', symbol: 'H', label: 'H1b', x: -1.357, y: 0.394, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'eth-h1c', element: 'H', symbol: 'H', label: 'H1c', x: -1.357, y: 0.394, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'eth-b1', from: 0, to: 1, order: 1 }, // C1-C2
      { id: 'eth-b2', from: 1, to: 2, order: 1 }, // C2-O
      { id: 'eth-b3', from: 2, to: 3, order: 1 }, // O-H
      { id: 'eth-b4', from: 1, to: 4, order: 1 }, // C2-H
      { id: 'eth-b5', from: 1, to: 5, order: 1 }, // C2-H
      { id: 'eth-b6', from: 0, to: 6, order: 1 }, // C1-H
      { id: 'eth-b7', from: 0, to: 7, order: 1 }, // C1-H
      { id: 'eth-b8', from: 0, to: 8, order: 1 }, // C1-H
    ],
    didactica: {
      descripcionCientifica: 'Alcohol alifático formado por un radical etilo (CH₃-CH₂-) unido covalentemente a un grupo hidroxilo (-OH). Ambos carbonos tienen hibridación sp³ tetraédrica y el oxígeno presenta geometría angular con dos pares de electrones no enlazantes. Es una molécula anfipática con una cabeza polar hidrofílica capaz de donar y aceptar puentes de hidrógeno y una cola hidrocarbonada apolar.',
      datosCuriosos: [
        'Al mezclar 50 ml de agua pura con 50 ml de etanol puro, el volumen total obtenido es de solo ~96 ml debido a la contracción por la intensa red de puentes de hidrógeno.',
        'El alcohol al 70% es mejor bactericida que el alcohol al 96%: el 30% de agua impide que las proteínas bacterianas se coagulen de golpe, permitiendo que el alcohol penetre al interior celular.',
        'En la nube molecular Sagittarius B2 en el centro de nuestra galaxia flota una reserva gigantesca de etanol con billones de litros de alcohol en fase gas.',
        'En Brasil, millones de vehículos funcionan exclusivamente con bioetanol de caña de azúcar mediante motores Flex-Fuel.',
      ],
      usosVidaCotidiana: [
        'Desinfectante antiséptico y formulación de alcohol en gel al 70%.',
        'Biocombustible vehicular renovable (mezclas E10 y E85).',
        'Solvente para tinturas medicinales, esencias aromáticas y perfumes.',
        'Materia prima en síntesis orgánica para acetato de etilo y vinagre.',
      ],
      geometriaMolecular: 'Tetraédrica en carbonos y Angular en oxígeno',
      polaridad: 'polar',
      justificacionPolaridad: 'El dipolo del enlace C-O-H (1.69 D) y la capacidad de formar puentes de hidrógeno le confieren alta polaridad y miscibilidad total en agua.',
    },
    kitFisico: {
      esferas: { C: 2, H: 6, O: 1 },
      conectores: { cortosRigidos: 8, largosFlexibles: 0 },
      descripcionConectores: '8 conectores cortos rígidos (todos enlaces simples).',
      tipsArmado: 'Estrategia por etapas: 1° Une las 2 esferas de carbono (C-C), 2° Conecta la esfera roja de oxígeno a uno de los carbonos (C-O), 3° Añade un hidrógeno al oxígeno (O-H en ángulo), 4° Distribuye los 5 hidrógenos restantes en los carbonos (3 en el carbono terminal y 2 en el central).',
    },
    trivia: {
      pregunta: '¿Por qué el etanol (CH₃-CH₂-OH) es totalmente miscible en agua en cualquier proporción, mientras que un hidrocarburo similar como el etano (CH₃-CH₃) es prácticamente insoluble?',
      opciones: [
        'Porque el grupo hidroxilo (-OH) forma una extensa red de puentes de hidrógeno con el agua mediante su enlace polar O-H y los pares no enlazantes del oxígeno.',
        'Porque el etanol es una molécula completamente apolar que disuelve al agua mediante interacciones de dispersión de London.',
        'Porque los carbonos del etanol poseen hibridación sp lineal que ioniza espontáneamente al solvente.',
        'Porque la cola etilo (-CH₂-CH₃) es de naturaleza hidrofílica y reacciona de forma iónica con los protones del agua.',
      ],
      respuestaCorrecta: 0,
      explicacion: 'La elevada electronegatividad del oxígeno (3.44) frente al hidrógeno (2.20) genera un enlace covalente fuertemente polar. La presencia del átomo de H unido a O y los dos pares de electrones no enlazantes del oxígeno permiten al etanol ser donante y aceptor de puentes de hidrógeno con el agua, superando el carácter hidrofóbico de la cadena hidrocarbonada.',
    },
  },

  // =========================================================================
  // 6. ACETONA (C₃H₆O / Propan-2-ona)
  // =========================================================================
  {
    id: 'acetone',
    name: 'Acetona',
    iupacName: 'Propan-2-ona',
    formula: 'C₃H₆O',
    molarMass: 58.08,
    classification: 'Cetona alifática',
    difficultyLevel: 'intermedio',
    timeLimitSeconds: 90,
    atoms: [
      { id: 'ace-c2', element: 'C', symbol: 'C', label: 'C=O', x: 0.000, y: 0.421, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp2' },
      { id: 'ace-o', element: 'O', symbol: 'O', label: 'O', x: 0.000, y: 1.641, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp2' },
      { id: 'ace-c1', element: 'C', symbol: 'C', label: 'C1', x: -1.281, y: -0.379, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ace-c3', element: 'C', symbol: 'C', label: 'C3', x: 1.281, y: -0.379, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ace-h1a', element: 'H', symbol: 'H', label: 'H1a', x: -1.516, y: 0.685, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-h1b', element: 'H', symbol: 'H', label: 'H1b', x: -1.743, y: -0.668, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-h1c', element: 'H', symbol: 'H', label: 'H1c', x: -1.743, y: -0.668, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-h3a', element: 'H', symbol: 'H', label: 'H3a', x: 1.516, y: 0.685, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-h3b', element: 'H', symbol: 'H', label: 'H3b', x: 1.743, y: -0.668, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-h3c', element: 'H', symbol: 'H', label: 'H3c', x: 1.743, y: -0.668, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'ace-b0', from: 0, to: 1, order: 2 }, // C2=O
      { id: 'ace-b1', from: 0, to: 2, order: 1 }, // C2-C1
      { id: 'ace-b2', from: 0, to: 3, order: 1 }, // C2-C3
      { id: 'ace-b3', from: 2, to: 4, order: 1 }, // C1-H
      { id: 'ace-b4', from: 2, to: 5, order: 1 }, // C1-H
      { id: 'ace-b5', from: 2, to: 6, order: 1 }, // C1-H
      { id: 'ace-b6', from: 3, to: 7, order: 1 }, // C3-H
      { id: 'ace-b7', from: 3, to: 8, order: 1 }, // C3-H
      { id: 'ace-b8', from: 3, to: 9, order: 1 }, // C3-H
    ],
    didactica: {
      descripcionCientifica: 'La cetona alifática más simple. El átomo central de carbono (C₂) posee hibridación sp² formando un centro trigonal plano con ángulos de ~120°, enlazado doblemente a un oxígeno carbonílico y covalentemente a dos grupos metilo (-CH₃) tetraédricos (sp³). La alta polarización del doble enlace C=O le otorga un momento dipolar permanente notable (2.88 D).',
      datosCuriosos: [
        'El cuerpo humano genera acetona durante la cetosis (ayuno prolongado o diabetes descompensada), provocando un aliento dulce característico denominado aliento cetónico.',
        'Disuelve el poliestireno expandido (plumavit) de forma casi mágica: disuelve las cadenas poliméricas liberando todo el aire atrapado y colapsando el material en segundos.',
        'Es el solvente por excelencia en laboratorios de química orgánica: limpia grasas, se mezcla con agua y se seca a 56 °C sin dejar marcas.',
        'Durante la Primera Guerra Mundial se obtuvo mediante fermentación bacteriana masiva con Clostridium acetobutylicum para fabricar pólvora cordita.',
      ],
      usosVidaCotidiana: [
        'Quitaesmalte de uñas tradicional y removedor de pegamentos de cianoacrilato.',
        'Limpieza y desengrase de piezas mecánicas e instrumental de laboratorio.',
        'Disolvente de resinas, lacas, esmaltes sintéticos y pinturas epóxicas.',
        'Intermedio para la fabricación de metacrilato de metilo (acrílico transparente).',
      ],
      geometriaMolecular: 'Trigonal plana en carbono carbonilo y Tetraédrica en metilos',
      polaridad: 'polar',
      justificacionPolaridad: 'Fuerte dipolo en el grupo carbonilo C=O (2.88 D) no compensado por los metilos, lo que le otorga excelente carácter polar aprótico.',
    },
    kitFisico: {
      esferas: { C: 3, H: 6, O: 1 },
      conectores: { cortosRigidos: 8, largosFlexibles: 2 },
      descripcionConectores: '10 conectores: 2 flexibles para el enlace doble C=O y 8 cortos rígidos para enlaces simples.',
      tipsArmado: '¡Ojo con el carbono del centro! Debe ser trigonal plano (120°). Únelo al oxígeno rojo usando los 2 tubos flexibles simultáneos para el doble enlace C=O. Luego acopla los 2 carbonos metilo a los lados con sus 3 hidrógenos cada uno.',
    },
    trivia: {
      pregunta: '¿Qué tipo de hibridación orbital presenta el carbono central del grupo carbonilo (C=O) en la acetona y qué tipos de enlace componen esa unión doble?',
      opciones: [
        'Hibridación sp con dos enlaces pi (π) axiales y geometría lineal.',
        'Hibridación sp² con geometría trigonal plana (120°), formando un enlace sigma (σ) y un enlace pi (π) con el oxígeno.',
        'Hibridación sp³ con geometría tetraédrica (109.5°), formado por dos enlaces sigma (σ) coaxiales.',
        'Hibridación sp³d con geometría bipiramidal trigonal y enlaces coordinados dativos.',
      ],
      respuestaCorrecta: 1,
      explicacion: 'El carbono carbonílico forma 3 enlaces sigma (σ) coplanares a ~120° empleando orbitales híbridos sp² (dos con carbonos metilo y uno con el oxígeno). Su orbital 2p puro restante se solapa lateralmente con un orbital p del oxígeno para generar el enlace pi (π) característico del doble enlace.',
    },
  },

  // =========================================================================
  // 7. ÁCIDO ACÉTICO (C₂H₄O₂ / Ácido etanoico) — Bonus / Desafío Extra
  // =========================================================================
  {
    id: 'acetic-acid',
    name: 'Ácido Acético',
    iupacName: 'Ácido etanoico',
    formula: 'C₂H₄O₂',
    molarMass: 60.052,
    classification: 'Ácido carboxílico alifático',
    difficultyLevel: 'intermedio',
    timeLimitSeconds: 90,
    atoms: [
      { id: 'ace-ac-c2', element: 'C', symbol: 'C', label: 'C=O', x: 0.394, y: 0.403, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp2' },
      { id: 'ace-ac-o1', element: 'O', symbol: 'O', label: 'O=', x: 0.394, y: 1.613, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp2' },
      { id: 'ace-ac-o2', element: 'O', symbol: 'O', label: 'O-H', x: 1.594, y: -0.287, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp3' },
      { id: 'ace-ac-h3', element: 'H', symbol: 'H', label: 'H(O)', x: 2.354, y: 0.263, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-ac-c1', element: 'C', symbol: 'C', label: 'C1', x: -0.916, y: -0.387, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ace-ac-h5', element: 'H', symbol: 'H', label: 'H1a', x: -0.846, y: -1.467, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-ac-h6', element: 'H', symbol: 'H', label: 'H1b', x: -1.486, y: -0.067, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ace-ac-h7', element: 'H', symbol: 'H', label: 'H1c', x: -1.486, y: -0.067, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'ace-ac-b0', from: 0, to: 1, order: 2 }, // C2=O1
      { id: 'ace-ac-b1', from: 0, to: 2, order: 1 }, // C2-O2
      { id: 'ace-ac-b2', from: 2, to: 3, order: 1 }, // O2-H3
      { id: 'ace-ac-b3', from: 0, to: 4, order: 1 }, // C2-C1
      { id: 'ace-ac-b4', from: 4, to: 5, order: 1 }, // C1-H5
      { id: 'ace-ac-b5', from: 4, to: 6, order: 1 }, // C1-H6
      { id: 'ace-ac-b6', from: 4, to: 7, order: 1 }, // C1-H7
    ],
    didactica: {
      descripcionCientifica: 'Ácido orgánico débil representativo del grupo carboxilo (-COOH). Consta de un carbono carbonílico sp² unido mediante enlace doble a un oxígeno y mediante enlace simple a un grupo hidroxilo (-OH) y a un metilo (sp³). La alta polarización del carbonilo favorece la liberación del protón H⁺, formando el anión acetato estabilizado por resonancia.',
      datosCuriosos: [
        'Es el responsable del sabor y aroma agrio del vinagre, que es simplemente una solución de ácido acético al 5% en agua producida por fermentación bacteriana.',
        'El ácido acético puro se congela a solo 16.6 °C; por eso en días frescos de invierno se solidifica en láminas parecidas al hielo y se le llama "ácido acético glacial".',
        'En estado líquido forma pares llamados dímeros cíclicos: dos moléculas se abrazan mutuamente mediante dos puentes de hidrógeno opuestos.',
        'En la época romana, hervían vino agrio en vasijas de plomo para obtener un jarabe dulce llamado sapa (acetato de plomo), sin saber que era neurotóxico.',
      ],
      usosVidaCotidiana: [
        'Aderezo culinario y conservante antimicrobiano de encurtidos en forma de vinagre.',
        'Desincrustante casero ecológico para remover el sarro (carbonato de calcio) de teteras.',
        'Fabricación de acetato de celulosa para fibras textiles y monturas de anteojos.',
        'Síntesis del monómero acetato de vinilo para la fabricación de cola fría (adhesivo PVA).',
      ],
      geometriaMolecular: 'Trigonal plana en carbono carboxílico, Angular en oxígeno hidroxílico y Tetraédrica en metilo',
      polaridad: 'polar',
      justificacionPolaridad: 'Muy polar (1.74 D) gracias a la presencia simultánea de un enlace carbonilo aceptor y un enlace hidroxilo donante de puentes de hidrógeno.',
    },
    kitFisico: {
      esferas: { C: 2, H: 4, O: 2 },
      conectores: { cortosRigidos: 6, largosFlexibles: 2 },
      descripcionConectores: '8 conectores: 2 flexibles para el doble enlace C=O y 6 cortos rígidos para enlaces simples.',
      tipsArmado: 'El carbono carboxílico central se une a 2 oxígenos distintos: uno con doble enlace (2 conectores flexibles) y otro con enlace simple (1 conector rígido). ¡El hidrógeno ácido debe ir conectado al oxígeno simple, no al carbono!',
    },
    trivia: {
      pregunta: 'Al disolverse en agua, el ácido acético (CH₃-COOH) cede el protón H⁺ del grupo hidroxilo. ¿Qué fenómeno electrónico otorga estabilidad a la base conjugada anión acetato (CH₃-COO⁻)?',
      opciones: [
        'La precipitación de enlaces metálicos entre los hidrógenos del grupo metilo.',
        'La absorción de neutrones por parte del carbono carboxílico sp².',
        'La deslocalización electrónica por resonancia de la carga negativa entre los dos átomos de oxígeno equivalentes.',
        'La reconfiguración del anión en una geometría lineal con hibridación sp del grupo carboxilo.',
      ],
      respuestaCorrecta: 2,
      explicacion: 'Al perder el protón H⁺, la carga negativa resultante no queda confinada a un solo átomo de oxígeno, sino que se distribuye de manera simétrica y equitativa entre los dos oxígenos a través de un sistema pi deslocalizado por resonancia. Esta deslocalización disminuye la densidad de carga local y estabiliza termodinámicamente al anión acetato.',
    },
  },

  // =========================================================================
  // 8. ACETATO DE ETILO (C₄H₈O₂ / Etanoato de etilo) — Desafío Avanzado
  // =========================================================================
  {
    id: 'ethyl-acetate',
    name: 'Acetato de Etilo',
    iupacName: 'Etanoato de etilo',
    formula: 'C₄H₈O₂',
    molarMass: 88.106,
    classification: 'Éster carboxílico alifático',
    difficultyLevel: 'avanzado',
    timeLimitSeconds: 150,
    atoms: [
      { id: 'ea-c2', element: 'C', symbol: 'C', label: 'C=O', x: -1.256, y: 0.448, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp2' },
      { id: 'ea-o1', element: 'O', symbol: 'O', label: 'O=', x: -1.306, y: 1.648, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp2' },
      { id: 'ea-c1', element: 'C', symbol: 'C', label: 'C1', x: -2.496, y: -0.412, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ea-h3', element: 'H', symbol: 'H', label: 'H1a', x: -2.396, y: -1.492, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-h4', element: 'H', symbol: 'H', label: 'H1b', x: -3.076, y: -0.122, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-h5', element: 'H', symbol: 'H', label: 'H1c', x: -3.076, y: -0.122, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-o2', element: 'O', symbol: 'O', label: '-O-', x: -0.096, y: -0.262, z: 0.000, color: CPK_COLORS.O, radius: ATOM_RADII.O, hybridization: 'sp3' },
      { id: 'ea-c3', element: 'C', symbol: 'C', label: 'C3', x: 1.134, y: 0.498, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ea-h8', element: 'H', symbol: 'H', label: 'H3a', x: 1.154, y: 1.148, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-h9', element: 'H', symbol: 'H', label: 'H3b', x: 1.154, y: 1.148, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-c4', element: 'C', symbol: 'C', label: 'C4', x: 2.334, y: -0.442, z: 0.000, color: CPK_COLORS.C, radius: ATOM_RADII.C, hybridization: 'sp3' },
      { id: 'ea-h11', element: 'H', symbol: 'H', label: 'H4a', x: 3.264, y: 0.128, z: 0.000, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-h12', element: 'H', symbol: 'H', label: 'H4b', x: 2.334, y: -1.082, z: 0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
      { id: 'ea-h13', element: 'H', symbol: 'H', label: 'H4c', x: 2.334, y: -1.082, z: -0.890, color: CPK_COLORS.H, radius: ATOM_RADII.H, hybridization: 's' },
    ],
    bonds: [
      { id: 'ea-b0', from: 0, to: 1, order: 2 },  // C2=O1
      { id: 'ea-b1', from: 0, to: 2, order: 1 },  // C2-C1
      { id: 'ea-b2', from: 2, to: 3, order: 1 },  // C1-H
      { id: 'ea-b3', from: 2, to: 4, order: 1 },  // C1-H
      { id: 'ea-b4', from: 2, to: 5, order: 1 },  // C1-H
      { id: 'ea-b5', from: 0, to: 6, order: 1 },  // C2-O2
      { id: 'ea-b6', from: 6, to: 7, order: 1 },  // O2-C3
      { id: 'ea-b7', from: 7, to: 8, order: 1 },  // C3-H
      { id: 'ea-b8', from: 7, to: 9, order: 1 },  // C3-H
      { id: 'ea-b9', from: 7, to: 10, order: 1 }, // C3-C4
      { id: 'ea-b10', from: 10, to: 11, order: 1 }, // C4-H
      { id: 'ea-b11', from: 10, to: 12, order: 1 }, // C4-H
      { id: 'ea-b12', from: 10, to: 13, order: 1 }, // C4-H
    ],
    didactica: {
      descripcionCientifica: 'Éster orgánico producto de la condensación (esterificación de Fischer) entre el ácido acético y el etanol. Su núcleo comprende un grupo carbonilo plano (sp²) unido por un puente de oxígeno éster (-O-) a una cadena etilo. Al no poseer átomos de hidrógeno unidos directamente a oxígenos, no puede formar puentes de hidrógeno consigo mismo, resultando en un punto de ebullición bajo (77 °C) a pesar de sus 14 átomos.',
      datosCuriosos: [
        'Tiene un agradable e inconfundible aroma a manzana verde, pera y piña; es el compuesto aromatizante natural de muchas frutas y golosinas.',
        'Es el solvente principal en los quitaesmaltes ecológicos "libres de acetona", ya que es mucho más suave para la piel y cutículas.',
        'En entomología se emplea en los frascos de captura para sacrificar insectos sin endurecer sus patas ni degradar su ADN.',
        'A pesar de ser más pesado que el ácido acético (88 g/mol vs 60 g/mol), hierve a 77 °C mientras el ácido acético hierve a 118 °C por carecer de puentes de hidrógeno intermoleculares.',
      ],
      usosVidaCotidiana: [
        'Disolvente quitaesmalte no agresivo para uñas y barnices.',
        'Extracción de cafeína en el procesamiento de café y té descafeinados.',
        'Aromatizante y potenciador de sabor en caramelos, chicles y repostería.',
        'Solvente en barnices flexográficos, adhesivos sintéticos y tintas de imprenta.',
      ],
      geometriaMolecular: 'Trigonal plana en C carbonilo, Angular en O éster y Tetraédrica en carbonos',
      polaridad: 'polar',
      justificacionPolaridad: 'Polaridad moderada (1.78 D) derivada del grupo carbonilo y los pares de electrones no enlazantes del oxígeno éster, actuando como aceptor de puentes de hidrógeno.',
    },
    kitFisico: {
      esferas: { C: 4, H: 8, O: 2 },
      conectores: { cortosRigidos: 12, largosFlexibles: 2 },
      descripcionConectores: '14 conectores: 2 flexibles para el doble enlace C=O y 12 cortos rígidos para enlaces simples.',
      tipsArmado: '¡Desafío Avanzado de 14 átomos! Divide y vencerás: 1° Construye el grupo acetilo izquierdo (CH₃-C=O con 2 flexibles en el doble enlace), 2° Conecta el oxígeno puente (-O-), 3° Añade el grupo etilo derecho (-CH₂-CH₃) en el otro extremo del oxígeno puente. ¡No conectes los dos oxígenos juntos!',
    },
    trivia: {
      pregunta: 'A pesar de tener una masa molar significativamente mayor (88 g/mol) que el ácido acético (60 g/mol) y el etanol (46 g/mol), el acetato de etilo hierve a solo 77 °C. ¿A qué se debe esta propiedad física?',
      opciones: [
        'A que el acetato de etilo es un compuesto iónico que sublima a presiones reducidas.',
        'A que los enlaces simples C-C se descomponen antes de alcanzar la temperatura de ebullición.',
        'A que la molécula es completamente plana impidiendo cualquier interacción electrostática.',
        'A que no posee átomos de hidrógeno unidos directamente al oxígeno, impidiéndole formar puentes de hidrógeno entre sus propias moléculas.',
      ],
      respuestaCorrecta: 3,
      explicacion: 'Tanto el ácido acético como el etanol poseen enlaces O-H que les permiten actuar como donantes y aceptores de puentes de hidrógeno intermoleculares (fuerzas intermoleculares muy intensas que elevan sus puntos de ebullición). El acetato de etilo es un éster cuyos hidrógenos están enlazados exclusivamente a carbonos (C-H); por tanto, entre moléculas de éster solo existen interacciones dipolo-dipolo y de London, mucho más débiles.',
    },
  },
];

export const getMoleculeById = (id: string): MoleculeData | undefined => {
  return MOLECULES_DATASET.find((m) => m.id === id);
};
