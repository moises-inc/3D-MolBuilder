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
  Cu: '#B87333',
  Ag: '#C0C0C0',
};

// Radios relativos de esferas 3D en Three.js
export const ATOM_RADII: Record<ElementSymbol, number> = {
  C: 0.45,
  H: 0.25,
  O: 0.40,
  N: 0.42,
  Cl: 0.48,
  S: 0.46,
  Cu: 0.55,
  Ag: 0.58,
};

export const MOLECULES_DATASET: MoleculeData[] = [
  {
    "id": "ammonia",
    "name": "Amoníaco",
    "iupacName": "Azano",
    "formula": "NH₃",
    "molarMass": 17.031,
    "classification": "Base inorgánica de Lewis / Piramidal trigonal (sp³)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "nh3-n",
        "element": "N",
        "symbol": "N",
        "label": "N",
        "x": 0.0,
        "y": 0.116,
        "z": 0.0,
        "color": "#3B82F6",
        "radius": 0.42,
        "hybridization": "sp3"
      },
      {
        "id": "nh3-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": 0.0,
        "y": -0.27,
        "z": 0.937,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "nh3-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": 0.812,
        "y": -0.27,
        "z": -0.469,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "nh3-h3",
        "element": "H",
        "symbol": "H",
        "label": "H3",
        "x": -0.812,
        "y": -0.27,
        "z": -0.469,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "nh3-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "nh3-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "nh3-b3",
        "from": 0,
        "to": 3,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Compuesto nitrogenado fundamental con geometría piramidal trigonal (ángulo H-N-H ~107°). El nitrógeno presenta hibridación sp³ con tres enlaces covalentes simples N-H y un par de electrones no enlazantes volumétrico en el vértice superior que le confiere propiedades de base de Lewis y marcada polaridad.",
      "datosCuriosos": [
        "La síntesis industrial de amoníaco mediante el proceso Haber-Bosch consume aproximadamente el 1% de toda la energía mundial y sustenta la producción de fertilizantes.",
        "En Chile es un insumo indispensable en la producción agroindustrial de nitrato de amonio.",
        "Tiene un aroma sumamente penetrante e irritante, detectable por el olfato humano en concentraciones muy bajas.",
        "Su par libre le permite actuar como ligando eficiente coordinándose a cationes metálicos."
      ],
      "usosVidaCotidiana": [
        "Materia prima fundamental en la fabricación de fertilizantes nitrogenados agrícolas.",
        "Limpiador y desengrasante doméstico e industrial concentrado.",
        "Refrigerante industrial eficiente en plantas frigoríficas de alimentos y empaquetadoras de fruta de exportación chilena.",
        "Neutralización de efluentes ácidos y síntesis de productos farmacéuticos."
      ],
      "geometriaMolecular": "Piramidal trigonal (107°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.47 D). La repulsión del par solitario del nitrógeno comprime el ángulo a 107° y genera una resultante dipolar dirigida hacia el nitrógeno."
    },
    "kitFisico": {
      "esferas": {
        "N": 1,
        "H": 3
      },
      "conectores": {
        "cortosRigidos": 3,
        "largosFlexibles": 0
      },
      "descripcionConectores": "3 conectores cortos rígidos para los 3 enlaces simples covalentes N-H.",
      "tipsArmado": "Toma la esfera azul de nitrógeno (con 4 orificios tetraédricos piramidales). Inserta 3 conectores rígidos simples y acopla las 3 esferas blancas de hidrógeno formando un trípode. El cuarto orificio superior simboliza el par solitario de electrones."
    },
    "trivia": {
      "pregunta": "¿Por qué la molécula de amoníaco (NH₃) adopta una geometría piramidal trigonal con un ángulo H-N-H de 107° en lugar de un plano trigonal a 120°?",
      "opciones": [
        "Porque el nitrógeno central presenta hibridación sp³ con un par de electrones no enlazante que ejerce fuerte repulsión sobre los 3 enlaces simples N-H.",
        "Porque los 3 átomos de hidrógeno forman enlaces dobles alternados que doblan la estructura.",
        "Porque el enlace N-H es apolar y los hidrógenos se repelen magnéticamente.",
        "Porque el nitrógeno pierde electrones convirtiéndose en un catión plano simétrico."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El nitrógeno posee 5 electrones de valencia. Forma 3 enlaces covalentes simples con los hidrógenos y conserva 1 par libre solitario. La hibridación sp³ orienta las nubes hacia un tetraedro, pero la repulsión del par solitario comprime el ángulo H-N-H a 107° generando la pirámide trigonal."
    }
  },
  {
    "id": "hydrogen-chloride",
    "name": "Cloruro de Hidrógeno",
    "iupacName": "Cloruro de hidrógeno",
    "formula": "HCl",
    "molarMass": 36.461,
    "classification": "Haluro de hidrógeno / Ácido binario hidrácido",
    "difficultyLevel": "facil",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "hcl-h",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -0.637,
        "y": 0.0,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "hcl-cl",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl",
        "x": 0.637,
        "y": 0.0,
        "z": 0.0,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      }
    ],
    "bonds": [
      {
        "id": "hcl-b1",
        "from": 0,
        "to": 1,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Compuesto diatómico gaseoso constituido por un enlace covalente simple fuertemente polarizado entre el hidrógeno y el cloro.",
      "datosCuriosos": [
        "Es el componente ácido principal del jugo gástrico humano (concentración ~0.5% p/v, pH entre 1.5 y 2.0).",
        "En la alquimia clásica se le denominaba espíritu de sal o ácido muriático.",
        "Al entrar en contacto con el aire húmedo genera una densa niebla blanca visible de microgotas de ácido clorhídrico.",
        "Las emisiones de fumarolas de volcanes activos en la cordillera de los Andes expulsan gas HCl a la atmósfera."
      ],
      "usosVidaCotidiana": [
        "Ácido muriático doméstico utilizado para la limpieza profunda de sarro calcáreo.",
        "Decapado y desoxidación de planchas de acero en la industria metalmecánica.",
        "Ajuste y neutralización del pH en el agua de piscinas recreativas e industriales.",
        "Reactivo de síntesis farmacológica para convertir aminas insolubles en clorhidratos."
      ],
      "geometriaMolecular": "Lineal (180°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.08 D). La diferencia de electronegatividad (ΔEN = 0.96) concentra la densidad electrónica hacia el cloro."
    },
    "kitFisico": {
      "esferas": {
        "H": 1,
        "Cl": 1
      },
      "conectores": {
        "cortosRigidos": 1,
        "largosFlexibles": 0
      },
      "descripcionConectores": "1 conector corto rígido para representar el enlace covalente polar simple H-Cl.",
      "tipsArmado": "Molécula diatómica simple. Une la pequeña esfera blanca (hidrógeno) a la esfera verde (cloro) con un único conector corto rígido."
    },
    "trivia": {
      "pregunta": "El cloruro de hidrógeno es un gas covalente molecular (HCl(g)), pero al burbujear en agua produce una disolución con pH fuertemente ácido (HCl(aq)). ¿Cuál es la explicación físico-química?",
      "opciones": [
        "El enlace covalente polar H-Cl sufre ruptura heterolítica cuantitativa en agua por solvatación del protón como ion hidronio (H₃O⁺).",
        "El gas HCl contiene enlaces iónicos que se destruyen por calor de condensación al entrar en agua.",
        "El hidrógeno se disocia homolíticamente liberando radicales libres.",
        "El cloro absorbe electrones de la molécula de agua provocando la precipitación de cloruro."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El enlace H-Cl es muy polar (μ = 1.08 D). Las moléculas polares de H₂O solvatan la molécula de HCl, facilitando la ionización completa: HCl + H₂O → H₃O⁺ + Cl⁻ (Ka >> 1)."
    }
  },
  {
    "id": "methanol",
    "name": "Metanol",
    "iupacName": "Metanol",
    "formula": "CH₃OH",
    "molarMass": 32.042,
    "classification": "Alcohol alifático primario / Tetraédrica en C (sp³) y Angular en O (sp³)",
    "difficultyLevel": "avanzado",
    "timeLimitSeconds": 120,
    "atoms": [
      {
        "id": "met-c",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": -0.665,
        "y": 0.0,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "met-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -1.026,
        "y": 1.026,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "met-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -1.026,
        "y": -0.513,
        "z": -0.889,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "met-h3",
        "element": "H",
        "symbol": "H",
        "label": "H3",
        "x": -1.026,
        "y": -0.513,
        "z": 0.889,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "met-o",
        "element": "O",
        "symbol": "O",
        "label": "O",
        "x": 0.75,
        "y": 0.0,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "met-h4",
        "element": "H",
        "symbol": "H",
        "label": "H(OH)",
        "x": 1.15,
        "y": 0.89,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "met-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "met-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "met-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "met-b4",
        "from": 0,
        "to": 4,
        "order": 1
      },
      {
        "id": "met-b5",
        "from": 4,
        "to": 5,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "El alcohol alifático más simple. Presenta un carbono sp³ unido a 3 hidrógenos y a un grupo hidroxilo (-OH) cuya geometría en el oxígeno es angular (~108.9°). Todos sus enlaces son covalentes simples.",
      "datosCuriosos": [
        "En Chile, la región de Magallanes fue históricamente pionera en la producción industrial masiva de metanol sintético a partir de gas natural.",
        "Antiguamente se conocía como alcohol de madera al obtenerse por destilación seca de la madera.",
        "Es altamente tóxico por ingestión o inhalación: el cuerpo lo metaboliza mediante la alcohol deshidrogenasa a formaldehído y ácido fórmico, dañando el nervio óptico.",
        "Arde en aire con una llama azul prácticamente invisible a plena luz del día."
      ],
      "usosVidaCotidiana": [
        "Precursor industrial clave en la síntesis de formaldehído, resinas y plásticos.",
        "Solvente orgánico polar prototípico en laboratorios e industria química.",
        "Anticongelante y combustible alternativo limpio en motores de competición.",
        "Insumo químico para la producción de biodiesel por transesterificación en Chile."
      ],
      "geometriaMolecular": "Tetraédrica en C (~109.5°) y Angular en O-H (~108.9°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.70 D) originado por la polarización del grupo hidroxilo C-O-H y su capacidad de formar puentes de hidrógeno."
    },
    "kitFisico": {
      "esferas": {
        "C": 1,
        "O": 1,
        "H": 4
      },
      "conectores": {
        "cortosRigidos": 5,
        "largosFlexibles": 0
      },
      "descripcionConectores": "5 conectores cortos rígidos para los enlaces covalentes simples C-H, C-O y O-H.",
      "tipsArmado": "Construye primero el grupo metilo: une 3 hidrógenos blancos a la esfera negra de carbono. En el cuarto orificio conecta la esfera roja de oxígeno y a esta únele el último hidrógeno blanco en ángulo."
    },
    "trivia": {
      "pregunta": "¿Por qué la ingestión de metanol (CH₃OH) resulta extremadamente peligrosa para el organismo humano pudiendo provocar ceguera o la muerte?",
      "opciones": [
        "Porque la enzima alcohol deshidrogenasa lo metaboliza a formaldehído y ácido fórmico, acumulándose este último y atacando selectivamente las células de la retina y el nervio óptico.",
        "Porque el metanol reacciona con el agua del estómago formando ácido clorhídrico concentrado.",
        "Porque se solidifica a temperatura corporal bloqueando las arterias cerebrales.",
        "Porque destruye los glóbulos rojos por un proceso de saponificación lipídica acelerada."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "En el hígado, la enzima alcohol deshidrogenasa oxida el metanol a formaldehído (HCHO) y luego a ácido fórmico (HCOOH). El ácido fórmico produce acidosis metabólica severa e inhibe la citocromo c oxidasa mitocondrial, provocando hipoxia celular y necrosis del nervio óptico."
    }
  },
  {
    "id": "hydrogen-peroxide",
    "name": "Peróxido de Hidrógeno",
    "iupacName": "Dióxido de dihidrógeno",
    "formula": "H₂O₂",
    "molarMass": 34.015,
    "classification": "Peróxido inorgánico / Geometría abierta no coplanar (sp³)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "h2o2-o1",
        "element": "O",
        "symbol": "O",
        "label": "O1",
        "x": -0.735,
        "y": 0.0,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "h2o2-o2",
        "element": "O",
        "symbol": "O",
        "label": "O2",
        "x": 0.735,
        "y": 0.0,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "h2o2-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -1.18,
        "y": 0.89,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "h2o2-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": 1.18,
        "y": 0.0,
        "z": 0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "h2o2-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "h2o2-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "h2o2-b3",
        "from": 1,
        "to": 3,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Compuesto inorgánico con un enlace covalente simple peróxido O-O. Cada oxígeno presenta hibridación sp³ en una geometría abierta no coplanar con ángulo diédrico H-O-O-H cercano a 90° en fase gaseosa.",
      "datosCuriosos": [
        "Popularmente conocida como agua oxigenada comercial al 3% p/v (10 volúmenes).",
        "Al entrar en contacto con la sangre o heridas genera un efervescente burbujeo inmediato producido por la enzima catalasa que descompone catalíticamente el H₂O₂ en O₂ y H₂O.",
        "En altas concentraciones (>70%) se ha utilizado como propelente directo de cohetes y torpedos.",
        "Sus dos enlaces O-H no están en el mismo plano, formando una estructura retorcida similar a un libro abierto a 90°."
      ],
      "usosVidaCotidiana": [
        "Desinfectante y antiséptico tópico de heridas superficiales.",
        "Blanqueador ecológico industrial en la producción de celulosa y papel en Chile.",
        "Decolorante capilar estético en peluquería.",
        "Tratamiento y desinfección avanzada de agua potable y efluentes."
      ],
      "geometriaMolecular": "Abierta no coplanar (ángulo H-O-O: 94.8°, ángulo diédrico: 90.2°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Molécula fuertemente polar (μ = 2.26 D). La geometría retorcida no coplanar impide que los dos dipolos de enlace O-H se anulen."
    },
    "kitFisico": {
      "esferas": {
        "O": 2,
        "H": 2
      },
      "conectores": {
        "cortosRigidos": 3,
        "largosFlexibles": 0
      },
      "descripcionConectores": "3 conectores cortos rígidos para los enlaces simples O-O y O-H.",
      "tipsArmado": "Une las 2 esferas rojas de oxígeno mediante 1 conector corto rígido. En los orificios libres de cada oxígeno acopla las esferas blancas de hidrógeno de modo que no queden coplanares, formando un ángulo retorcido."
    },
    "trivia": {
      "pregunta": "¿Por qué al verter agua oxigenada (H₂O₂ al 3%) sobre una herida se produce una intensa efervescencia con formación instantánea de espuma blanca?",
      "opciones": [
        "Porque la enzima catalasa contenida en los glóbulos rojos y tejidos acelera la descomposición catalítica del H₂O₂ liberando gas oxígeno (O₂).",
        "Porque el H₂O₂ reacciona con el sodio de la sangre liberando gas hidrógeno (H₂).",
        "Porque el agua oxigenada se evapora instantáneamente por el calor corporal.",
        "Porque los gérmenes de la piel producen ácido clorhídrico al defenderse."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La enzima catalasa es un catalizador biológico extraordinariamente eficiente. Su función es proteger las células destruyendo el peróxido de hidrógeno: 2 H₂O₂ → 2 H₂O + O₂(g). El gas oxígeno liberado rápidamente genera la espumosa efervescencia desinfectante."
    }
  },
  {
    "id": "water",
    "name": "Agua",
    "iupacName": "Oxidano",
    "formula": "H₂O",
    "molarMass": 18.015,
    "classification": "Solvente inorgánico polar / Base hidrolítica universal",
    "difficultyLevel": "facil",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "h2o-o",
        "element": "O",
        "symbol": "O",
        "label": "O",
        "x": 0.0,
        "y": -0.391,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "h2o-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": 0.758,
        "y": 0.195,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "h2o-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -0.758,
        "y": 0.195,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "h2o-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "h2o-b2",
        "from": 0,
        "to": 2,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Molécula triatómica dipolar fundamental unida por dos enlaces covalentes simples polares O-H. El átomo de oxígeno posee hibridación sp³ con dos pares enlazantes y dos no enlazantes (ángulo 104.5°).",
      "datosCuriosos": [
        "El hielo flota sobre el agua líquida porque alcanza su densidad máxima a 3.98 °C.",
        "Presenta una tensión superficial extraordinariamente alta (72.8 mN/m a 20 °C).",
        "Posee un calor específico elevado (4.184 J/(g·°C)) actuando como estabilizador térmico.",
        "En una sola gota de agua hay aproximadamente 1.67 × 10²¹ moléculas."
      ],
      "usosVidaCotidiana": [
        "Solvente vital insustituible en todos los medios celulares.",
        "Medio de transporte y dilución biológica.",
        "Termorregulación de seres vivos por sudoración.",
        "Generación hidroeléctrica en Chile."
      ],
      "geometriaMolecular": "Angular (104.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Elevado momento dipolar neto (μ = 1.85 D) originado por la diferencia de electronegatividad en geometría angular."
    },
    "kitFisico": {
      "esferas": {
        "O": 1,
        "H": 2
      },
      "conectores": {
        "cortosRigidos": 2,
        "largosFlexibles": 0
      },
      "descripcionConectores": "2 conectores cortos rígidos para los dos enlaces simples covalentes O-H.",
      "tipsArmado": "Emplea los orificios angulares de la esfera roja del oxígeno para que los dos hidrógenos blancos queden formando una V abierta a ~104.5°."
    },
    "trivia": {
      "pregunta": "¿Por qué el ángulo de enlace H-O-H en el agua (104.5°) es menor que el ángulo tetraédrico regular (109.5°)?",
      "opciones": [
        "Porque los dos pares de electrones no enlazantes del oxígeno ejercen mayor repulsión volumétrica comprimiendo los enlaces O-H.",
        "Porque los dos átomos de hidrógeno se atraen magnéticamente.",
        "Porque el oxígeno tiene tendencia natural a los 180°.",
        "Porque los enlaces O-H son iónicos."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La intensa repulsión entre los dos pares solitarios voluminosos del oxígeno comprime el ángulo H-O-H desde 109.5° hasta 104.5°."
    }
  },
  {
    "id": "silver-chloride",
    "name": "Cloruro de Plata",
    "iupacName": "Cloruro de plata(I)",
    "formula": "AgCl",
    "molarMass": 143.321,
    "classification": "Sal halógena insoluble / Red iónico-covalente polarizable",
    "difficultyLevel": "facil",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "agcl-ag",
        "element": "Ag",
        "symbol": "Ag",
        "label": "Ag⁺",
        "x": -1.14,
        "y": 0.0,
        "z": 0.0,
        "color": "#C0C0C0",
        "radius": 0.58,
        "hybridization": "none"
      },
      {
        "id": "agcl-cl",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl⁻",
        "x": 1.14,
        "y": 0.0,
        "z": 0.0,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      }
    ],
    "bonds": [
      {
        "id": "agcl-b1",
        "from": 0,
        "to": 1,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Sal inorgánica binaria de plata y cloro representativa del enlace iónico-covalente polarizable simple.",
      "datosCuriosos": [
        "Fue la piedra angular de la fotografía química y analógica durante más de un siglo.",
        "Se disuelve al añadir amoníaco formando el catión complejo [Ag(NH₃)₂]⁺.",
        "Los lentes fotocromáticos incorporan microcristales de AgCl que se oscurecen al sol.",
        "En la historia minera de Chile, la clorargirita (plata córnea) fue descubierta en Chañarcillo en 1832."
      ],
      "usosVidaCotidiana": [
        "Electrodo de referencia Ag/AgCl en sensores de pH.",
        "Apósitos avanzados bactericidas.",
        "Lentes de anteojos fotocromáticos.",
        "Determinación de cloruros en aguas potables."
      ],
      "geometriaMolecular": "Lineal (180°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Compuesto altamente polar en par molecular (μ ≈ 5.73 D)."
    },
    "kitFisico": {
      "esferas": {
        "Ag": 1,
        "Cl": 1
      },
      "conectores": {
        "cortosRigidos": 1,
        "largosFlexibles": 0
      },
      "descripcionConectores": "1 conector corto rígido para modelar la unión del par iónico Ag⁺···Cl⁻.",
      "tipsArmado": "Une la esfera gris plateada de Plata (Ag) a la esfera verde de Cloro (Cl) mediante 1 conector corto rígido."
    },
    "trivia": {
      "pregunta": "¿Qué proceso químico explica el oscurecimiento del cloruro de plata (AgCl) al exponerse a la luz?",
      "opciones": [
        "La fotorreducción inducida por luz que promueve la transferencia de un electrón precipitando gránulos microscópicos de plata metálica neutra (Ag⁰).",
        "La pérdida inmediata de cloro gaseoso dejando óxido amarillo.",
        "La fusión térmica de los iones plata.",
        "La descomposición del precipitado en nitrógeno."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El fotón promueve un electrón del cloruro a la plata (Ag⁺ + Cl⁻ + hν → Ag⁰ + ½ Cl₂), depositando plata metálica oscura."
    }
  },
  {
    "id": "chloroform",
    "name": "Cloroformo",
    "iupacName": "Triclorometano",
    "formula": "CHCl₃",
    "molarMass": 119.378,
    "classification": "Haloalcano / Tetraédrica distorsionada (sp³)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "chcl3-c",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": 0.0,
        "y": 0.0,
        "z": 0.118,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "chcl3-h",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": 0.0,
        "y": 0.0,
        "z": 1.208,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "chcl3-cl1",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl1",
        "x": 1.669,
        "y": 0.0,
        "z": -0.442,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "chcl3-cl2",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl2",
        "x": -0.834,
        "y": 1.445,
        "z": -0.442,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "chcl3-cl3",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl3",
        "x": -0.834,
        "y": -1.445,
        "z": -0.442,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      }
    ],
    "bonds": [
      {
        "id": "chcl3-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "chcl3-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "chcl3-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "chcl3-b4",
        "from": 0,
        "to": 4,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Haloalcano tetraédrico con 4 enlaces covalentes simples C-H y C-Cl.",
      "datosCuriosos": [
        "En 1847 el médico James Simpson descubrió sus efectos anestésicos.",
        "Expuesto a la luz solar se oxida fotoquímicamente a fosgeno.",
        "Es un líquido denso (1.49 g/cm³) inmiscible que se va al fondo en agua.",
        "Requería varios minutos de inhalación continua para inducir anestesia."
      ],
      "usosVidaCotidiana": [
        "Solvente de extracción farmacéutica.",
        "Precursor industrial de polímeros teflón.",
        "Disolvente deuterado en RMN (CDCl₃).",
        "Síntesis química industrial."
      ],
      "geometriaMolecular": "Tetraédrica distorsionada (~109.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar permanente (μ = 1.15 D) por asimetría entre C-H y C-Cl."
    },
    "kitFisico": {
      "esferas": {
        "C": 1,
        "H": 1,
        "Cl": 3
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 0
      },
      "descripcionConectores": "4 conectores cortos rígidos para los 4 enlaces simples covalentes tetraédricos.",
      "tipsArmado": "Toma la esfera negra de carbono (4 orificios). Inserta 4 conectores rígidos simples: en 3 coloca esferas verdes de cloro y en la restante la esfera blanca de hidrógeno."
    },
    "trivia": {
      "pregunta": "¿Por qué el cloroformo (CHCl₃) es polar mientras que el CCl₄ es apolar?",
      "opciones": [
        "Porque la presencia de 1 enlace C-H y 3 enlaces C-Cl rompe la simetría tetraédrica impidiendo la cancelación de dipolos.",
        "Porque los cloros forman dobles enlaces.",
        "Porque el hidrógeno es negativo.",
        "Porque es plano."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "Al sustituirse un cloro por un hidrógeno de menor electronegatividad se destruye la compensación simétrica vectorial (μ = 1.15 D)."
    }
  },
  {
    "id": "carbon-tetrachloride",
    "name": "Tetracloruro de Carbono",
    "iupacName": "Tetraclorometano",
    "formula": "CCl₄",
    "molarMass": 153.823,
    "classification": "Haloalcano simétrico / Tetraédrica regular (109.5°)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "ccl4-c",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": 0.0,
        "y": 0.0,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "ccl4-cl1",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl1",
        "x": 1.022,
        "y": 1.022,
        "z": 1.022,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "ccl4-cl2",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl2",
        "x": -1.022,
        "y": -1.022,
        "z": 1.022,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "ccl4-cl3",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl3",
        "x": -1.022,
        "y": 1.022,
        "z": -1.022,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "ccl4-cl4",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl4",
        "x": 1.022,
        "y": -1.022,
        "z": -1.022,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      }
    ],
    "bonds": [
      {
        "id": "ccl4-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "ccl4-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "ccl4-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "ccl4-b4",
        "from": 0,
        "to": 4,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Haloalcano perclorado tetraédrico regular perfecto con 4 enlaces covalentes simples C-Cl idénticos a 109.5°.",
      "datosCuriosos": [
        "Fue prohibido por el Protocolo de Montreal debido a su efecto en el ozono estratosférico.",
        "Es un líquido apolar muy denso (1.59 g/cm³).",
        "No es combustible en aire: al calentarse genera vapor clorado extintor.",
        "Disuelve grasas pesadas y yodo elemental."
      ],
      "usosVidaCotidiana": [
        "Disolvente apolar de referencia.",
        "Precursor histórico de CFCs.",
        "Reactivo sintético en reacción de Appel.",
        "Patrón de viscosidad."
      ],
      "geometriaMolecular": "Tetraédrica regular (109.5°)",
      "polaridad": "apolar",
      "justificacionPolaridad": "Momento dipolar exactamente nulo (μ = 0.00 D) por alta simetría tetraédrica (Td)."
    },
    "kitFisico": {
      "esferas": {
        "C": 1,
        "Cl": 4
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 0
      },
      "descripcionConectores": "4 conectores cortos rígidos para los cuatro enlaces simples C-Cl equivalentes.",
      "tipsArmado": "Toma la esfera negra de carbono (4 orificios). Inserta 1 conector corto rígido en cada orificio y acopla 4 esferas verdes de cloro."
    },
    "trivia": {
      "pregunta": "¿Por qué el CCl₄ es estrictamente apolar (μ = 0 D) pese a tener enlaces C-Cl polares?",
      "opciones": [
        "La simetría tetraédrica regular orienta los 4 vectores dipolares a 109.5° anulando su suma vectorial a cero.",
        "Los cloros regalan electrones al carbono.",
        "Vibra anulando la carga.",
        "Los enlaces son apolares."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La suma vectorial de 4 dipolos idénticos proyectados hacia los vértices de un tetraedro regular da estrictamente cero."
    }
  },
  {
    "id": "ethanol",
    "name": "Etanol",
    "iupacName": "Etanol",
    "formula": "C₂H₅OH",
    "molarMass": 46.069,
    "classification": "Alcohol alifático primario / Tetraédrica en C (sp³) y Angular en O (sp³)",
    "difficultyLevel": "avanzado",
    "timeLimitSeconds": 120,
    "atoms": [
      {
        "id": "eth-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": -1.2,
        "y": 0.0,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "eth-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1a",
        "x": -1.56,
        "y": 1.026,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "eth-h2",
        "element": "H",
        "symbol": "H",
        "label": "H1b",
        "x": -1.56,
        "y": -0.513,
        "z": -0.889,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "eth-h3",
        "element": "H",
        "symbol": "H",
        "label": "H1c",
        "x": -1.56,
        "y": -0.513,
        "z": 0.889,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "eth-c2",
        "element": "C",
        "symbol": "C",
        "label": "C2",
        "x": 0.3,
        "y": 0.0,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "eth-h4",
        "element": "H",
        "symbol": "H",
        "label": "H2a",
        "x": 0.66,
        "y": -0.513,
        "z": -0.889,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "eth-h5",
        "element": "H",
        "symbol": "H",
        "label": "H2b",
        "x": 0.66,
        "y": -0.513,
        "z": 0.889,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "eth-o",
        "element": "O",
        "symbol": "O",
        "label": "O",
        "x": 0.85,
        "y": 1.25,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "eth-h6",
        "element": "H",
        "symbol": "H",
        "label": "H(OH)",
        "x": 1.78,
        "y": 1.25,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "eth-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "eth-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "eth-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "eth-b4",
        "from": 0,
        "to": 4,
        "order": 1
      },
      {
        "id": "eth-b5",
        "from": 4,
        "to": 5,
        "order": 1
      },
      {
        "id": "eth-b6",
        "from": 4,
        "to": 6,
        "order": 1
      },
      {
        "id": "eth-b7",
        "from": 4,
        "to": 7,
        "order": 1
      },
      {
        "id": "eth-b8",
        "from": 7,
        "to": 8,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Alcohol de cadena corta con dos carbonos sp³, un grupo hidroxilo (-OH) terminal y 8 enlaces covalentes simples C-C, C-H, C-O y O-H.",
      "datosCuriosos": [
        "Es el alcohol presente en bebidas fermentadas e ingrediente principal del alcohol gel desinfectante de uso masivo (70% v/v).",
        "En Chile es producido a escala bioindustrial como biocombustible sustentable.",
        "Se mezcla en cualquier proporción con agua debido a la formación de puentes de hidrógeno.",
        "Su punto de ebullición (78.37 °C) es significativamente mayor que el del etano (-88.6 °C) gracias a las interacciones intermoleculares por puente de H."
      ],
      "usosVidaCotidiana": [
        "Alcohol gel desinfectante antiséptico para manos y superficies.",
        "Solvente cosmético y farmacéutico de elixires y perfumes.",
        "Biocombustible ecológico y aditivo oxigenado para gasolinas.",
        "Insumo de síntesis química para éteres y ésteres."
      ],
      "geometriaMolecular": "Tetraédrica en C1 y C2 (~109.5°) y Angular en O-H (~108.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.69 D) originado por el grupo hidroxilo polar -OH en el extremo de la cadena etílica."
    },
    "kitFisico": {
      "esferas": {
        "C": 2,
        "O": 1,
        "H": 6
      },
      "conectores": {
        "cortosRigidos": 8,
        "largosFlexibles": 0
      },
      "descripcionConectores": "8 conectores cortos rígidos para todos los enlaces simples C-C, C-H, C-O y O-H.",
      "tipsArmado": "Enlaza las 2 esferas negras de carbono entre sí con 1 conector rígido. En un carbono coloca 3 hidrógenos (metilo). En el otro carbono coloca 2 hidrógenos y la esfera roja de oxígeno, y a esta únele el hidrógeno final del grupo -OH."
    },
    "trivia": {
      "pregunta": "¿Por qué el alcohol gel desinfectante (etanol al 70% v/v) es más eficaz para eliminar virus envueltos y bacterias que el etanol puro al 100%?",
      "opciones": [
        "Porque el agua (30%) frena la evaporación instantánea del alcohol y facilita la penetración de las moléculas de etanol solubilizando la membrana lipídica y denaturalizando las proteínas virales.",
        "Porque el etanol al 100% es un gas que no moja las manos.",
        "Porque el agua oxigena las bacterias haciéndolas estallar.",
        "Porque el etanol gelificado contiene cloro iónico activo."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El etanol desnaturaliza las proteínas al romper sus interacciones hidrofóbicas. El agua presente al 30% retarda la evaporación manteniendo húmeda la zona y actúa como vehículo acelerando la hidratación y desestructuración proteica celular."
    }
  }
];

export const getMoleculeById = (id: string): MoleculeData | undefined => {
  return MOLECULES_DATASET.find((m) => m.id === id);
};
