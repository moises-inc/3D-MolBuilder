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
    "timeLimitSeconds": 45,
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
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.47 D). La repulsión del par solitario del nitrógeno comprime el ángulo a 107° y genera una resultante dipolar dirigida hacia el nitrógeno.",
      "datoClaveTrivia": "El nitrógeno central posee hibridación sp³ con un par de electrones no enlazante que ejerce fuerte repulsión sobre los 3 enlaces simples N-H, comprimiendo el ángulo a 107° en geometría piramidal trigonal."
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
      "tipsArmado": "Toma la esfera azul de nitrógeno (con 4 orificios tetraédricos piramidales). Inserta 3 conectores rígidos simples y acopla las 3 esferas blancas de hidrógeno formando un trípode. El cuarto orificio superior simboliza el par solitario de electrones.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 45,
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
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.08 D). La diferencia de electronegatividad (ΔEN = 0.96) concentra la densidad electrónica hacia el cloro.",
      "datoClaveTrivia": "El enlace covalente polar H-Cl sufre ruptura heterolítica cuantitativa en agua por solvatación ácida generando iones hidronio (H₃O⁺) y cloruro (Cl⁻)."
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
      "tipsArmado": "Molécula diatómica simple. Une la pequeña esfera blanca (hidrógeno) a la esfera verde (cloro) con un único conector corto rígido.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 50,
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
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.70 D) originado por la polarización del grupo hidroxilo C-O-H y su capacidad de formar puentes de hidrógeno.",
      "datoClaveTrivia": "La enzima alcohol deshidrogenasa oxida el metanol a formaldehído y ácido fórmico, metabolito tóxico que produce acidosis metabólica y ataca selectivamente el nervio óptico."
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
      "tipsArmado": "Construye primero el grupo metilo: une 3 hidrógenos blancos a la esfera negra de carbono. En el cuarto orificio conecta la esfera roja de oxígeno y a esta únele el último hidrógeno blanco en ángulo.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 45,
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
      "justificacionPolaridad": "Molécula fuertemente polar (μ = 2.26 D). La geometría retorcida no coplanar impide que los dos dipolos de enlace O-H se anulen.",
      "datoClaveTrivia": "La enzima catalasa contenida en glóbulos rojos y tejidos cataliza la descomposición rápida del H₂O₂ liberando agua líquida y gas oxígeno (O₂), produciendo efervescencia."
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
      "tipsArmado": "Une las 2 esferas rojas de oxígeno mediante 1 conector corto rígido. En los orificios libres de cada oxígeno acopla las esferas blancas de hidrógeno de modo que no queden coplanares, formando un ángulo retorcido.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 45,
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
      "justificacionPolaridad": "Elevado momento dipolar neto (μ = 1.85 D) originado por la diferencia de electronegatividad en geometría angular.",
      "datoClaveTrivia": "Los dos pares de electrones no enlazantes del oxígeno ejercen mayor repulsión volumétrica que los pares enlazantes, comprimiendo el ángulo H-O-H desde 109.5° a 104.5°."
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
      "tipsArmado": "Emplea los orificios angulares de la esfera roja del oxígeno para que los dos hidrógenos blancos queden formando una V abierta a ~104.5°.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 45,
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
      "justificacionPolaridad": "Compuesto altamente polar en par molecular (μ ≈ 5.73 D).",
      "datoClaveTrivia": "La radiación luminosa induce fotorreducción donde los iones cloruro transfieren electrones a los iones plata, precipitando microgránulos oscuros de plata metálica (Ag⁰)."
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
      "tipsArmado": "Une la esfera gris plateada de Plata (Ag) a la esfera verde de Cloro (Cl) mediante 1 conector corto rígido.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 50,
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
      "justificacionPolaridad": "Momento dipolar permanente (μ = 1.15 D) por asimetría entre C-H y C-Cl.",
      "datoClaveTrivia": "La presencia de un enlace C-H y tres enlaces C-Cl rompe la simetría esférica perfecta, impidiendo la cancelación de dipolos y produciendo un momento dipolar neto de 1.15 D."
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
      "tipsArmado": "Toma la esfera negra de carbono (4 orificios). Inserta 4 conectores rígidos simples: en 3 coloca esferas verdes de cloro y en la restante la esfera blanca de hidrógeno.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 50,
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
      "justificacionPolaridad": "Momento dipolar exactamente nulo (μ = 0.00 D) por alta simetría tetraédrica (Td).",
      "datoClaveTrivia": "La simetría tetraédrica regular perfecta (Td) orienta los 4 vectores dipolares C-Cl idénticos a 109.5°, haciendo que su suma vectorial sea estrictamente cero (μ = 0 D)."
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
      "tipsArmado": "Toma la esfera negra de carbono (4 orificios). Inserta 1 conector corto rígido en cada orificio y acopla 4 esferas verdes de cloro.",
      "compatibilidad": "estandar_rigido"
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
    "timeLimitSeconds": 60,
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
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.69 D) originado por el grupo hidroxilo polar -OH en el extremo de la cadena etílica.",
      "datoClaveTrivia": "El agua al 30% en el alcohol gel retarda la evaporación instantánea y actúa como vehículo acelerando la hidratación y desnaturalización de las proteínas virales y bacterianas."
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
      "tipsArmado": "Enlaza las 2 esferas negras de carbono entre sí con 1 conector rígido. En un carbono coloca 3 hidrógenos (metilo). En el otro carbono coloca 2 hidrógenos y la esfera roja de oxígeno, y a esta únele el hidrógeno final del grupo -OH.",
      "compatibilidad": "estandar_rigido"
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
  },
  {
    "id": "dichloromethane",
    "name": "Diclorometano",
    "iupacName": "Diclorometano",
    "formula": "CH₂Cl₂",
    "molarMass": 84.93,
    "classification": "Haloalcano / Tetraédrica distorsionada (sp³)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 45,
    "atoms": [
      {
        "id": "dcm-c",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": 0.0,
        "y": 0.0,
        "z": 0.153,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "dcm-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": 0.0,
        "y": 0.904,
        "z": 0.763,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "dcm-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": 0.0,
        "y": -0.904,
        "z": 0.763,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "dcm-cl1",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl1",
        "x": 1.466,
        "y": 0.0,
        "z": -0.839,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "dcm-cl2",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl2",
        "x": -1.466,
        "y": 0.0,
        "z": -0.839,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      }
    ],
    "bonds": [
      {
        "id": "dcm-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "dcm-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "dcm-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "dcm-b4",
        "from": 0,
        "to": 4,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Haloalcano derivado del metano con dos átomos de cloro y dos de hidrógeno enlazados covalentemente al carbono central sp³ en geometría tetraédrica distorsionada.",
      "datosCuriosos": [
        "Es un solvente orgánico clorado ampliamente utilizado en la descafeinización industrial de granos de café y té.",
        "Tiene una densidad de 1.33 g/cm³, siendo más denso que el agua y formando una fase inferior en extracciones.",
        "Presenta un bajo punto de ebullición (39.6 °C), evaporándose con suma rapidez a temperatura ambiente.",
        "En la industria chilena de adhesivos y decapantes de pintura fue un componente histórico clave antes de las normativas de reducción de COVs."
      ],
      "usosVidaCotidiana": [
        "Extracción y aislamiento de cafeína en la industria alimentaria.",
        "Disolvente decapante para la remoción rápida de pinturas, barnices y recubrimientos.",
        "Agente espumante en la síntesis y expansión de polímeros de poliuretano.",
        "Solvente de elución y extracción química en laboratorios analíticos."
      ],
      "geometriaMolecular": "Tetraédrica distorsionada (~109.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ ≈ 1.60 D). Los dos enlaces polares C-Cl y los dos C-H no se anulan vectorialmente debido a la asimetría tetraédrica.",
      "datoClaveTrivia": "La asimetría entre dos enlaces polares C-Cl y dos enlaces C-H en geometría tetraédrica produce una suma dipolar vectorial neta no nula (μ ≈ 1.60 D)."
    },
    "kitFisico": {
      "esferas": {
        "C": 1,
        "H": 2,
        "Cl": 2
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 0
      },
      "descripcionConectores": "4 conectores cortos rígidos para los 4 enlaces covalentes simples C-H y C-Cl.",
      "tipsArmado": "Toma la esfera negra de carbono (4 orificios tetraédricos). Inserta 4 conectores cortos rígidos: acopla 2 esferas verdes de cloro en dos orificios y 2 esferas blancas de hidrógeno en los otros dos.",
      "compatibilidad": "estandar_rigido"
    },
    "trivia": {
      "pregunta": "¿Por qué el diclorometano (CH₂Cl₂) posee un momento dipolar neto apreciable (μ ≈ 1.60 D), mientras que el tetracloruro de carbono (CCl₄) es estrictamente apolar (μ = 0 D)?",
      "opciones": [
        "Porque la presencia simultánea de dos enlaces polares C-Cl y dos C-H rompe la simetría esférica perfecta, impidiendo la anulación vectorial de los dipolos de enlace.",
        "Porque el carbono central adopta una hibridación sp² plana que orienta los cloros en ángulo de 90°.",
        "Porque los dos átomos de cloro forman un enlace doble covalente directamente entre sí.",
        "Porque los hidrógenos se desprenden espontáneamente como protones libres en fase gaseosa."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "En el CCl₄ la simetría tetraédrica perfecta (Td) cancela los cuatro dipolos idénticos C-Cl. En el CH₂Cl₂, los enlaces C-Cl tienen un dipolo mucho mayor que los C-H y una orientación angular asimétrica, generando una resultante dipolar neta permanente de 1.60 D."
    }
  },
  {
    "id": "tert-butanol",
    "name": "Terbutanol",
    "iupacName": "2-metilpropan-2-ol",
    "formula": "C₄H₁₀O",
    "molarMass": 74.12,
    "classification": "Alcohol terciario alifático / Tetraédrica en carbonos (sp³) y Angular en oxígeno (sp³)",
    "difficultyLevel": "avanzado",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "tbut-c0",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": -0.061,
        "y": -0.0,
        "z": 0.31,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "tbut-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": 1.382,
        "y": -0.0,
        "z": -0.2,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "tbut-c2",
        "element": "C",
        "symbol": "C",
        "label": "C2",
        "x": -0.782,
        "y": 1.249,
        "z": -0.2,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "tbut-c3",
        "element": "C",
        "symbol": "C",
        "label": "C3",
        "x": -0.782,
        "y": -1.249,
        "z": -0.2,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "tbut-o",
        "element": "O",
        "symbol": "O",
        "label": "O",
        "x": -0.061,
        "y": -0.0,
        "z": 1.74,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "tbut-ho",
        "element": "H",
        "symbol": "H",
        "label": "H(O)",
        "x": 0.85,
        "y": -0.0,
        "z": 1.436,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h11",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": 1.382,
        "y": -0.0,
        "z": -1.29,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h12",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": 1.896,
        "y": 0.89,
        "z": 0.164,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h13",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": 1.896,
        "y": -0.89,
        "z": 0.164,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h21",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -0.782,
        "y": 1.249,
        "z": -1.29,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h22",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -1.81,
        "y": 1.249,
        "z": 0.164,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h23",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -0.268,
        "y": 2.139,
        "z": 0.164,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h31",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -0.782,
        "y": -1.249,
        "z": -1.29,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h32",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -0.268,
        "y": -2.139,
        "z": 0.164,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "tbut-h33",
        "element": "H",
        "symbol": "H",
        "label": "H",
        "x": -1.81,
        "y": -1.249,
        "z": 0.164,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "tbut-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "tbut-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "tbut-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "tbut-b4",
        "from": 0,
        "to": 4,
        "order": 1
      },
      {
        "id": "tbut-b5",
        "from": 4,
        "to": 5,
        "order": 1
      },
      {
        "id": "tbut-b6",
        "from": 1,
        "to": 6,
        "order": 1
      },
      {
        "id": "tbut-b7",
        "from": 1,
        "to": 7,
        "order": 1
      },
      {
        "id": "tbut-b8",
        "from": 1,
        "to": 8,
        "order": 1
      },
      {
        "id": "tbut-b9",
        "from": 2,
        "to": 9,
        "order": 1
      },
      {
        "id": "tbut-b10",
        "from": 2,
        "to": 10,
        "order": 1
      },
      {
        "id": "tbut-b11",
        "from": 2,
        "to": 11,
        "order": 1
      },
      {
        "id": "tbut-b12",
        "from": 3,
        "to": 12,
        "order": 1
      },
      {
        "id": "tbut-b13",
        "from": 3,
        "to": 13,
        "order": 1
      },
      {
        "id": "tbut-b14",
        "from": 3,
        "to": 14,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Alcohol terciario ramificado donde el carbono central sp³ está unido a tres grupos metilo (-CH₃) y a un grupo hidroxilo (-OH). Presenta 15 átomos y 14 enlaces covalentes simples.",
      "datosCuriosos": [
        "Tiene un punto de fusión inusualmente elevado de 25.7 °C, por lo que en laboratorios suele encontrarse en estado sólido en invierno y líquido en verano.",
        "A diferencia de los alcoholes primarios y secundarios, es muy resistente a la oxidación con reactivos como permanganato o dicromato por carecer de hidrógenos alfa.",
        "Posee un característico olor alcanforado penetrante y agradable.",
        "Es completamente miscible con agua en todas las proporciones gracias a los puentes de hidrógeno del grupo -OH."
      ],
      "usosVidaCotidiana": [
        "Solvente industrial para recubrimientos y removedores de pintura.",
        "Intermediario en la síntesis de éteres antidetonantes oxigenados para combustibles (MTBE y ETBE).",
        "Desnaturalizante de alcohol etílico cosmético y de perfumería.",
        "Precursor en la síntesis química de peróxidos orgánicos e iniciadores de polimerización."
      ],
      "geometriaMolecular": "Tetraédrica en C central y metilos (~109.5°), Angular en C-O-H (~108.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ ≈ 1.66 D) originado por la elevada electronegatividad del átomo de oxígeno en el grupo hidroxilo (-OH).",
      "datoClaveTrivia": "Su conformación molecular globular y casi esférica permite un empaquetamiento cristalino altamente simétrico que eleva su punto de fusión a 25.7 °C."
    },
    "kitFisico": {
      "esferas": {
        "C": 4,
        "O": 1,
        "H": 10
      },
      "conectores": {
        "cortosRigidos": 14,
        "largosFlexibles": 0
      },
      "descripcionConectores": "14 conectores cortos rígidos para todos los enlaces covalentes simples C-C, C-O, O-H y C-H.",
      "tipsArmado": "Toma la esfera central negra de carbono y acopla 4 conectores cortos rígidos. Conecta 3 esferas negras de carbono (metilos) y 1 roja de oxígeno. A cada metilo añade 3 hidrógenos blancos y une 1 hidrógeno final al oxígeno.",
      "compatibilidad": "estandar_rigido"
    },
    "trivia": {
      "pregunta": "¿Por qué el terbutanol (2-metilpropan-2-ol) tiene un punto de fusión inusualmente alto (25.7 °C) y es sólido a temperatura ambiente, mientras que su isómero lineal 1-butanol funde a -89.8 °C?",
      "opciones": [
        "Por su estructura molecular globular y compacta casi esférica, que facilita un empaquetamiento extraordinariamente simétrico y eficiente en la red cristalina sólida.",
        "Porque forma puentes de hidrógeno iónicos cuatro veces más fuertes que los alcoholes lineales.",
        "Porque posee dobles enlaces covalentes internos que rigidizan los enlaces carbono-carbono.",
        "Porque reacciona con el aire formando polímeros sólidos de alto peso molecular."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La simetría compacta y esférica del tert-butanol minimiza la entropía de fusión y optimiza el empaquetamiento de las moléculas en la red sólida cristalina, elevando su punto de fusión a 25.7 °C en marcado contraste con la cadena lineal y flexible del 1-butanol."
    }
  },
  {
    "id": "urea",
    "name": "Urea",
    "iupacName": "Carbamida",
    "formula": "(NH₂)₂CO",
    "molarMass": 60.06,
    "classification": "Diamida carbónica / Trigonal plana en C (sp²) y planarizada en N (sp² por resonancia)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "urea-c",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": 0.0,
        "y": 0.544,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "urea-o",
        "element": "O",
        "symbol": "O",
        "label": "=O",
        "x": 0.0,
        "y": 1.794,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "urea-n1",
        "element": "N",
        "symbol": "N",
        "label": "N1",
        "x": -1.16,
        "y": -0.206,
        "z": 0.0,
        "color": "#3B82F6",
        "radius": 0.42,
        "hybridization": "sp2"
      },
      {
        "id": "urea-n2",
        "element": "N",
        "symbol": "N",
        "label": "N2",
        "x": 1.16,
        "y": -0.206,
        "z": 0.0,
        "color": "#3B82F6",
        "radius": 0.42,
        "hybridization": "sp2"
      },
      {
        "id": "urea-h11",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -2.06,
        "y": 0.244,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "urea-h12",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -1.12,
        "y": -1.206,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "urea-h21",
        "element": "H",
        "symbol": "H",
        "label": "H3",
        "x": 2.06,
        "y": 0.244,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "urea-h22",
        "element": "H",
        "symbol": "H",
        "label": "H4",
        "x": 1.12,
        "y": -1.206,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "urea-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "urea-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "urea-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "urea-b4",
        "from": 2,
        "to": 4,
        "order": 1
      },
      {
        "id": "urea-b5",
        "from": 2,
        "to": 5,
        "order": 1
      },
      {
        "id": "urea-b6",
        "from": 3,
        "to": 6,
        "order": 1
      },
      {
        "id": "urea-b7",
        "from": 3,
        "to": 7,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Diamida primaria del ácido carbónico con un grupo carbonilo central (C=O, enlace doble) enlazado a dos grupos amino (-NH₂). Debido a la conjugación por resonancia, la molécula es prácticamente coplanar con hibridación sp².",
      "datosCuriosos": [
        "En 1828 Friedrich Wöhler sintetizó urea a partir de cianato de amonio inorgánico, marcando el nacimiento formal de la química orgánica.",
        "Es el principal producto final de excreción del metabolismo de las proteínas y del nitrógeno en mamíferos y seres humanos.",
        "Posee un alto contenido de nitrógeno (~46% en masa), convirtiéndola en el fertilizante sólido más utilizado en la agricultura mundial.",
        "En el cuerpo humano, el ciclo de la urea hepático previene la acumulación de amoníaco tóxico en el torrente sanguíneo."
      ],
      "usosVidaCotidiana": [
        "Fertilizante nitrogenado agrícola de liberación directa en cultivos de la zona centro-sur de Chile.",
        "Materia prima en la producción de resinas de urea-formaldehído para tableros aglomerados de madera.",
        "Aditivo reductor catalítico (AdBlue / Arla 32) para neutralizar emisiones contaminantes de óxidos de nitrógeno (NOx) en motores diésel.",
        "Ingrediente activo humectante y queratolítico en cremas dermatológicas de alta hidratación."
      ],
      "geometriaMolecular": "Trigonal plana en carbono (~120°) y planar en nitrógenos por deslocalización de resonancia",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar extremadamente alto (μ ≈ 4.56 D) debido a la fuerte separación de carga inducida por la resonancia del grupo carbonilo y los pares solitarios de ambos nitrógenos.",
      "datoClaveTrivia": "La síntesis de urea por Friedrich Wöhler en 1828 a partir de cianato de amonio inorgánico derrocó la teoría del vitalismo, fundando la química orgánica moderna."
    },
    "kitFisico": {
      "esferas": {
        "C": 1,
        "O": 1,
        "N": 2,
        "H": 4
      },
      "conectores": {
        "cortosRigidos": 6,
        "largosFlexibles": 2
      },
      "descripcionConectores": "6 conectores cortos rígidos para los enlaces simples C-N y N-H, y 2 conectores largos flexibles para modelar el doble enlace C=O.",
      "tipsArmado": "Une el carbono central a la esfera roja de oxígeno usando 2 conectores largos flexibles curvados para el doble enlace C=O. Luego usa conectores cortos rígidos para los 2 nitrógenos azules y sus respectivos hidrógenos en disposición coplanar.",
      "compatibilidad": "requiere_flexibles"
    },
    "trivia": {
      "pregunta": "¿Cuál es la trascendencia histórica fundamental del descubrimiento de la síntesis de la urea realizado por Friedrich Wöhler en 1828?",
      "opciones": [
        "Demostró que una sustancia orgánica podía sintetizarse en el laboratorio a partir de un compuesto inorgánico (cianato de amonio), refutando la doctrina del vitalismo.",
        "Permitió aislar por primera vez el nitrógeno elemental puro en estado gaseoso.",
        "Demostró la existencia de los enlaces peptídicos en las proteínas globulares.",
        "Estableció la primera escala empírica de electronegatividad para compuestos carbonílicos."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "Hasta 1828 prevalecía la doctrina del vitalismo, según la cual la síntesis de materia orgánica requería una fuerza biológica viva. Wöhler sintetizó urea calentando cianato de amonio puramente inorgánico (AgNCO + NH₄Cl → NH₄CNO → (NH₂)₂CO), demostrando la universalidad de las leyes químicas."
    }
  },
  {
    "id": "formaldehyde",
    "name": "Formaldehído",
    "iupacName": "Metanal",
    "formula": "HCHO",
    "molarMass": 30.03,
    "classification": "Aldehído alifático / Trigonal plana (sp²)",
    "difficultyLevel": "facil",
    "timeLimitSeconds": 45,
    "atoms": [
      {
        "id": "form-c",
        "element": "C",
        "symbol": "C",
        "label": "C",
        "x": 0.0,
        "y": -0.013,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "form-o",
        "element": "O",
        "symbol": "O",
        "label": "=O",
        "x": 0.0,
        "y": 1.198,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "form-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -0.94,
        "y": -0.593,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "form-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": 0.94,
        "y": -0.593,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "form-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "form-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "form-b3",
        "from": 0,
        "to": 3,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "El aldehído más simple. Molécula coplanar constituida por un carbono central con hibridación sp² unido a un oxígeno mediante enlace doble (C=O) y a dos átomos de hidrógeno por enlaces simples C-H.",
      "datosCuriosos": [
        "En solución acuosa al 37% p/v estabilizada con metanol se comercializa con el nombre de formalina.",
        "Es un gas incoloro de olor extremadamente penetrante y sofocante, altamente soluble en agua.",
        "En el universo interestelar es una de las moléculas orgánicas más abundantes detectadas por radioastronomía.",
        "Tiene una elevada electrofilia en el carbono carbonílico, lo que lo hace muy reactivo en reacciones de adición."
      ],
      "usosVidaCotidiana": [
        "Líquido fijador y conservante de muestras biológicas y piezas anatómicas en facultades de medicina y biología.",
        "Fabricación de resinas termoestables de fenol-formaldehído (baquelita) y melamina.",
        "Desinfectante de amplio espectro en instalaciones pecuarias y avícolas.",
        "Producción industrial de polioles y precursores de poliuretanos."
      ],
      "geometriaMolecular": "Trigonal plana (H-C-H ~116.5°, H-C=O ~121.8°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Marcado momento dipolar (μ ≈ 2.33 D) derivado del doble enlace C=O altamente polarizado hacia el átomo de oxígeno.",
      "datoClaveTrivia": "La disolución acuosa al 37-40% p/v de formaldehído estabilizada con metanol se denomina formalina, fijador histológico de tejidos biológicos."
    },
    "kitFisico": {
      "esferas": {
        "C": 1,
        "O": 1,
        "H": 2
      },
      "conectores": {
        "cortosRigidos": 2,
        "largosFlexibles": 2
      },
      "descripcionConectores": "2 conectores cortos rígidos para los enlaces simples C-H y 2 conectores largos flexibles para modelar el doble enlace C=O.",
      "tipsArmado": "Toma el carbono negro trigonal (orificios a 120°). Une la esfera roja de oxígeno empleando 2 conectores largos flexibles para curvar el doble enlace C=O. Luego acopla los 2 hidrógenos blancos con conectores rígidos cortos en el mismo plano.",
      "compatibilidad": "requiere_flexibles"
    },
    "trivia": {
      "pregunta": "¿Por qué el formaldehído (HCHO) actúa como un potente agente preservante y fijador de muestras histológicas y anatómicas en disolución acuosa (formalina)?",
      "opciones": [
        "Porque reacciona con los grupos amino de las proteínas celulares formando puentes metileno (-CH₂-) cruzados que inmovilizan y coagulan la estructura tisular impidiendo la autólisis.",
        "Porque congela instantáneamente el agua celular formando cristales amorfos protectores.",
        "Porque oxida los lípidos convirtiéndolos en ceras impermeables a las bacterias.",
        "Porque neutraliza de forma irreversible las sales de potasio del citoplasma celular."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El formaldehído es un electrófilo muy reactivo que forma enlaces covalentes entre residuos proteicos (principalmente lisinas) generando entrecruzamientos por puentes metileno (-CH₂-). Esto inactiva enzimas autolíticas y fija la arquitectura de las células."
    }
  },
  {
    "id": "methoxymethane",
    "name": "Metoximetano",
    "iupacName": "Metoximetano",
    "formula": "C₂H₆O",
    "molarMass": 46.07,
    "classification": "Éter alifático simétrico / Angular en oxígeno (sp³) y Tetraédrica en carbonos (sp³)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "mox-o",
        "element": "O",
        "symbol": "O",
        "label": "O",
        "x": -0.0,
        "y": 0.84,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "mox-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": -1.167,
        "y": 0.048,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "mox-c2",
        "element": "C",
        "symbol": "C",
        "label": "C2",
        "x": 1.167,
        "y": 0.048,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "mox-h11",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -0.891,
        "y": -1.006,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "mox-h12",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -1.756,
        "y": 0.269,
        "z": 0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "mox-h13",
        "element": "H",
        "symbol": "H",
        "label": "H3",
        "x": -1.756,
        "y": 0.269,
        "z": -0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "mox-h21",
        "element": "H",
        "symbol": "H",
        "label": "H4",
        "x": 0.891,
        "y": -1.006,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "mox-h22",
        "element": "H",
        "symbol": "H",
        "label": "H5",
        "x": 1.756,
        "y": 0.269,
        "z": 0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "mox-h23",
        "element": "H",
        "symbol": "H",
        "label": "H6",
        "x": 1.756,
        "y": 0.269,
        "z": -0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "mox-b1",
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "id": "mox-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "mox-b3",
        "from": 1,
        "to": 3,
        "order": 1
      },
      {
        "id": "mox-b4",
        "from": 1,
        "to": 4,
        "order": 1
      },
      {
        "id": "mox-b5",
        "from": 1,
        "to": 5,
        "order": 1
      },
      {
        "id": "mox-b6",
        "from": 2,
        "to": 6,
        "order": 1
      },
      {
        "id": "mox-b7",
        "from": 2,
        "to": 7,
        "order": 1
      },
      {
        "id": "mox-b8",
        "from": 2,
        "to": 8,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "El éter más sencillo, constituido por un átomo central de oxígeno sp³ unido a dos grupos metilo (-CH₃) formando un ángulo de enlace C-O-C de ~111.7° con dos pares de electrones no enlazantes.",
      "datosCuriosos": [
        "Es un isómero de función del etanol: ambos tienen la fórmula C₂H₆O, pero el etanol hierve a 78.4 °C mientras que el dimetil éter es un gas que hierve a -24 °C.",
        "Se perfila a nivel global y en Chile como un biocombustible limpio sustituto del diésel debido a su alto índice de cetano (55-60) y cero emisión de hollín.",
        "Es ampliamente empleado como propelente ecológico en aerosoles cosméticos en reemplazo de los clorofluorocarbonos (CFCs).",
        "Presenta una baja reactividad química frente a bases y oxidantes comparado con los alcoholes."
      ],
      "usosVidaCotidiana": [
        "Propelente no contaminante de la capa de ozono en aerosoles desodorantes y fijadores de cabello.",
        "Combustible alternativo y aditivo de combustión limpia en transporte y generación eléctrica.",
        "Refrigerante ecológico en sistemas de refrigeración comercial de baja temperatura.",
        "Precursor sintético en la producción de sulfato de dimetilo y otros derivados metilantes."
      ],
      "geometriaMolecular": "Angular en el oxígeno central (C-O-C ~111.7°) y Tetraédrica en metilos (~109.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar permanente (μ ≈ 1.30 D) debido a la geometría angular del oxígeno central que impide la anulación de los dos dipolos de enlace C-O.",
      "datoClaveTrivia": "Es un isómero de función del etanol (C₂H₆O); a diferencia del etanol, carece de enlaces O-H, por lo que no forma puentes de hidrógeno intermoleculares y hierve a -24 °C."
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
      "descripcionConectores": "8 conectores cortos rígidos para los enlaces simples covalentes C-O y C-H.",
      "tipsArmado": "Toma la esfera roja de oxígeno y acopla 2 conectores rígidos cortos en sus orificios angulares (~109°). Conecta una esfera negra de carbono en cada lado para formar el puente éter C-O-C y completa cada carbono con 3 hidrógenos blancos.",
      "compatibilidad": "estandar_rigido"
    },
    "trivia": {
      "pregunta": "El metoximetano (dimetil éter, CH₃-O-CH₃) y el etanol (CH₃-CH₂-OH) comparten exactamente la misma fórmula molecular (C₂H₆O). ¿A qué se debe que el etanol hierva a 78.4 °C mientras que el dimetil éter es un gas que hierve a -24 °C?",
      "opciones": [
        "El etanol posee un grupo hidroxilo (-OH) capaz de formar intensas redes de puentes de hidrógeno intermoleculares, mientras que el dimetil éter solo interactúa mediante dipolo-dipolo más débiles.",
        "El dimetil éter es una molécula completamente apolar sin ningún momento dipolar medible.",
        "El etanol tiene una masa molecular mucho mayor que distorsiona las fuerzas de dispersión de London.",
        "El oxígeno en el dimetil éter posee enlaces iónicos que repelen otras moléculas vecinas."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "Son isómeros de función. En el etanol, el hidrógeno unido al oxígeno altamente electronegativo genera enlaces de puente de hidrógeno intermoleculares que demandan gran energía térmica para romperse. El dimetil éter carece de enlace O-H, por lo que solo experimenta fuerzas dipolares y de dispersión más débiles, bullendo a -24 °C."
    }
  },
  {
    "id": "ethene",
    "name": "Eteno",
    "iupacName": "Eteno",
    "formula": "C₂H₄",
    "molarMass": 28.05,
    "classification": "Alqueno lineal / Trigonal plana en ambos carbonos (sp²)",
    "difficultyLevel": "facil",
    "timeLimitSeconds": 45,
    "atoms": [
      {
        "id": "ethene-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": -0.67,
        "y": 0.0,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "ethene-c2",
        "element": "C",
        "symbol": "C",
        "label": "C2",
        "x": 0.67,
        "y": 0.0,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "ethene-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -1.24,
        "y": 0.93,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ethene-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -1.24,
        "y": -0.93,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ethene-h3",
        "element": "H",
        "symbol": "H",
        "label": "H3",
        "x": 1.24,
        "y": 0.93,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ethene-h4",
        "element": "H",
        "symbol": "H",
        "label": "H4",
        "x": 1.24,
        "y": -0.93,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "ethene-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "ethene-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "ethene-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "ethene-b4",
        "from": 1,
        "to": 4,
        "order": 1
      },
      {
        "id": "ethene-b5",
        "from": 1,
        "to": 5,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "El hidrocarburo insaturado más elemental. Consta de dos carbonos sp² unidos por un doble enlace covalente (un enlace sigma σ y un enlace pi π) con cuatro hidrógenos coplanares a ~120°.",
      "datosCuriosos": [
        "Es el compuesto químico orgánico con mayor volumen de producción industrial en el mundo (>150 millones de toneladas al año).",
        "Actúa como una fitohormona vegetal natural que desencadena de forma sincronizada la maduración de frutas climatéricas.",
        "El doble enlace C=C impide la rotación libre a temperatura ambiente, estableciendo una geometría planar rígida.",
        "En el sector agroexportador de Chile, las cámaras de fruta controlan minuciosamente los niveles de etileno para retardar o acelerar la madurez de exportación."
      ],
      "usosVidaCotidiana": [
        "Monomero principal para la polimerización de polietileno de alta y baja densidad (PEAD y PEBD) en envases plásticos.",
        "Hormona de maduración controlada en cámaras frigoríficas de frutas como plátanos y paltas.",
        "Precursor para la síntesis de óxido de etileno, etilenglicol (anticongelante) y acetato de vinilo.",
        "Síntesis de estireno para poliestireno expandido aislante térmico."
      ],
      "geometriaMolecular": "Trigonal plana en ambos carbonos (ángulos H-C-H ~117.4°, H-C=C ~121.3°)",
      "polaridad": "apolar",
      "justificacionPolaridad": "Momento dipolar estrictamente nulo (μ = 0.00 D) debido a la elevada simetría planar centro-simétrica (grupo puntual D2h) donde los vectores de enlace C-H se anulan mutuamente.",
      "datoClaveTrivia": "Es una fitohormona gaseosa natural producida por vegetales que estimula y coordina la maduración de frutas climatéricas como manzanas, plátanos y paltas en Chile."
    },
    "kitFisico": {
      "esferas": {
        "C": 2,
        "H": 4
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 2
      },
      "descripcionConectores": "4 conectores cortos rígidos para los enlaces simples C-H y 2 conectores largos flexibles para modelar el doble enlace C=C.",
      "tipsArmado": "Toma las 2 esferas negras de carbono sp² (orificios a 120°). Conecta entre sí los carbonos usando 2 conectores largos flexibles para curvar el doble enlace C=C. Luego acopla 2 esferas blancas de hidrógeno en los orificios restantes de cada carbono en el mismo plano.",
      "compatibilidad": "requiere_flexibles"
    },
    "trivia": {
      "pregunta": "¿Por qué al almacenar plátanos o manzanas maduras junto a frutas verdes (como paltas chilenas) se acelera notablemente la maduración de estas últimas?",
      "opciones": [
        "Porque las frutas maduras desprenden etileno (eteno, C₂H₄) gaseoso, una fitohormona que activa enzimas de degradación de clorofila y ablandamiento de la pared celular en las frutas vecinas.",
        "Porque las frutas maduras consumen todo el oxígeno del ambiente impidiendo la fotosíntesis del fruto verde.",
        "Porque el etileno transporta levaduras aéreas que fermentan la cáscara del fruto verde.",
        "Porque el etileno calienta el aire circundante por una reacción exotérmica de condensación."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El eteno o etileno es la única hormona vegetal gaseosa conocida. En frutos climatéricos desencadena una cascada bioquímica que activa amilasas (hidrólisis de almidón en azúcares), pectinasas (ablandamiento tisular) y enzimas degradadoras de clorofila."
    }
  },
  {
    "id": "vinyl-chloride",
    "name": "Cloruro de Vinilo",
    "iupacName": "Cloroeteno",
    "formula": "C₂H₃Cl",
    "molarMass": 62.5,
    "classification": "Haloalqueno / Trigonal plana en ambos carbonos (sp²)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 50,
    "atoms": [
      {
        "id": "vc-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": -0.585,
        "y": -0.018,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "vc-c2",
        "element": "C",
        "symbol": "C",
        "label": "C2",
        "x": 0.745,
        "y": -0.128,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "vc-cl",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl",
        "x": -1.655,
        "y": 1.382,
        "z": 0.0,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp2"
      },
      {
        "id": "vc-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -1.115,
        "y": -0.958,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "vc-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": 1.295,
        "y": -1.058,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "vc-h3",
        "element": "H",
        "symbol": "H",
        "label": "H3",
        "x": 1.315,
        "y": 0.782,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "vc-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "vc-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "vc-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "vc-b4",
        "from": 1,
        "to": 4,
        "order": 1
      },
      {
        "id": "vc-b5",
        "from": 1,
        "to": 5,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Haloalqueno plano monoclorado con dos carbonos sp² unidos por un doble enlace C=C. El átomo de cloro altamente electronegativo polariza la nube electrónica sobre el plano molecular.",
      "datosCuriosos": [
        "Fue sintetizado por primera vez en 1835 por Justus von Liebig y Henri Victor Regnault.",
        "Es el monómero exclusivo para fabricar PVC, el tercer polímero plástico más producido del planeta tras el polietileno y polipropileno.",
        "Es un gas incoloro a temperatura ambiente con un olor ligeramente dulce, inflamable y de manejo industrial estrictamente regulado.",
        "En la construcción chilena, las tuberías sanitarias y canalizaciones eléctricas de PVC son omnipresentes por su resistencia a la corrosión y durabilidad sísmica."
      ],
      "usosVidaCotidiana": [
        "Monómero para la polimerización por suspensión de policloruro de vinilo (PVC rígido y flexible).",
        "Tuberías de saneamiento, alcantarillado y agua potable en edificación urbana.",
        "Perfiles de ventanas aislantes termoacústicas y revestimientos vinílicos de pisos.",
        "Dispositivos médicos descartables como bolsas de suero, tubos de diálisis y catéteres."
      ],
      "geometriaMolecular": "Trigonal plana en ambos carbonos (~120°, planar coplanar)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ ≈ 1.45 D) por la asimetría creada por el átomo de cloro fuertemente electronegativo sobre el enlace C=C planar.",
      "datoClaveTrivia": "Es el monómero industrial esencial que se polimeriza por adición radicálica para fabricar PVC (policloruro de vinilo), uno de los plásticos más empleados del mundo."
    },
    "kitFisico": {
      "esferas": {
        "C": 2,
        "Cl": 1,
        "H": 3
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 2
      },
      "descripcionConectores": "4 conectores cortos rígidos para los enlaces simples C-Cl y C-H, y 2 conectores largos flexibles para modelar el doble enlace C=C.",
      "tipsArmado": "Une las 2 esferas de carbono sp² con 2 conectores largos flexibles formando el doble enlace C=C. En un carbono coloca 1 esfera verde de cloro y 1 hidrógeno blanco; en el otro carbono coloca los 2 hidrógenos blancos restantes, manteniendo la planaridad.",
      "compatibilidad": "requiere_flexibles"
    },
    "trivia": {
      "pregunta": "¿Cuál es el principal proceso industrial que utiliza el cloruro de vinilo (C₂H₃Cl) como materia prima fundamental en la ingeniería química de materiales?",
      "opciones": [
        "La polimerización por radicales libres para producir policloruro de vinilo (PVC), empleado universalmente en tuberías de agua potable, perfiles de construcción y aislantes eléctricos.",
        "La hidrólisis catalítica para obtener ácido acético y gas cloro para desinfección de piscinas.",
        "La combustión en antorchas para sintetizar fibras de carbono aeroespaciales.",
        "La fermentación bacteriana para producir bioplásticos biodegradables en compostaje marino."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La polimerización de adición de miles de moléculas de cloroeteno rompe el enlace pi (π) del doble enlace C=C formando cadenas lineales saturadas de policloruro de vinilo (-[CH₂-CHCl]ₙ-), el polímero termoplástico PVC utilizado mundialmente en tuberías y construcción."
    }
  },
  {
    "id": "chloroacetic-acid",
    "name": "Ácido Cloroacético",
    "iupacName": "Ácido 2-cloroetanoico",
    "formula": "ClCH₂COOH",
    "molarMass": 94.5,
    "classification": "Ácido carboxílico halogenado / Trigonal plana en C1 (sp²) y Tetraédrica en C2 (sp³)",
    "difficultyLevel": "avanzado",
    "timeLimitSeconds": 60,
    "atoms": [
      {
        "id": "caa-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": 0.48,
        "y": 0.366,
        "z": -0.075,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "caa-o1",
        "element": "O",
        "symbol": "O",
        "label": "=O",
        "x": 0.58,
        "y": 1.576,
        "z": -0.075,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "caa-o2",
        "element": "O",
        "symbol": "O",
        "label": "-OH",
        "x": 1.5,
        "y": -0.484,
        "z": -0.075,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "caa-ho",
        "element": "H",
        "symbol": "H",
        "label": "H(O)",
        "x": 2.31,
        "y": 0.026,
        "z": -0.075,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "caa-c2",
        "element": "C",
        "symbol": "C",
        "label": "C2",
        "x": -0.92,
        "y": -0.174,
        "z": -0.075,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "caa-cl",
        "element": "Cl",
        "symbol": "Cl",
        "label": "Cl",
        "x": -1.32,
        "y": -1.104,
        "z": 1.405,
        "color": "#10B981",
        "radius": 0.48,
        "hybridization": "sp3"
      },
      {
        "id": "caa-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": -0.98,
        "y": -0.834,
        "z": -0.955,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "caa-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -1.65,
        "y": 0.626,
        "z": -0.075,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "caa-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "caa-b2",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "caa-b3",
        "from": 2,
        "to": 3,
        "order": 1
      },
      {
        "id": "caa-b4",
        "from": 0,
        "to": 4,
        "order": 1
      },
      {
        "id": "caa-b5",
        "from": 4,
        "to": 5,
        "order": 1
      },
      {
        "id": "caa-b6",
        "from": 4,
        "to": 6,
        "order": 1
      },
      {
        "id": "caa-b7",
        "from": 4,
        "to": 7,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Ácido carboxílico monoclorado en la posición alfa. El grupo carbonilo C1 presenta hibridación sp² coplanar con el grupo carboxilo, mientras que el carbono C2 presenta hibridación sp³ enlazado al cloro electronegativo y dos hidrógenos.",
      "datosCuriosos": [
        "Es casi 100 veces más ácido que el ácido acético común (pKa = 2.86 vs 4.76) gracias al efecto inductivo -I del cloro.",
        "A temperatura ambiente es un sólido cristalino blanco incoloro delicuescente que funde a 63 °C.",
        "Es un agente alquilante potente que inhibe irreversiblemente enzimas dependientes de tioles (-SH) como la gliceraldehído-3-fosfato deshidrogenasa.",
        "En la síntesis de herbicidas hormonales como el 2,4-D (ácido 2,4-diclorofenoxiacético) es el reactivo clave de condensación con clorofenoles."
      ],
      "usosVidaCotidiana": [
        "Materia prima en la producción de carboximetilcelulosa (CMC), estabilizante y espesante en alimentos y detergentes en Chile.",
        "Síntesis de agentes quelantes industriales de metales pesados como el EDTA.",
        "Precursor en la manufactura de herbicidas agrícolas fenoxiacéticos y colorantes textiles.",
        "Síntesis de fármacos antiinflamatorios como el ibuprofeno y derivados analgésicos."
      ],
      "geometriaMolecular": "Trigonal plana en C carboxílico (~120°), Tetraédrica en C alfa (~109.5°), Angular en O-H (~106°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Elevado momento dipolar neto (μ ≈ 2.80 D) resultado de la polaridad sinérgica del grupo carboxilo (-COOH) y el dipolo del enlace polar C-Cl en el carbono alfa.",
      "datoClaveTrivia": "Es aproximadamente 80 a 100 veces más ácido que el ácido acético común (pKa 2.86 vs 4.76) debido al efecto inductivo atractor de electrones (-I) del cloro."
    },
    "kitFisico": {
      "esferas": {
        "C": 2,
        "O": 2,
        "Cl": 1,
        "H": 3
      },
      "conectores": {
        "cortosRigidos": 6,
        "largosFlexibles": 2
      },
      "descripcionConectores": "6 conectores cortos rígidos para los enlaces simples C-C, C-Cl, C-H, C-O y O-H, y 2 conectores largos flexibles para el doble enlace carboxílico C=O.",
      "tipsArmado": "Toma el C1 sp² y conéctalo al oxígeno carbonilo (=O) con 2 conectores largos flexibles. Únelo con conectores cortos al oxígeno hidroxilo (-OH) y al C2 sp³. En el C2 acopla la esfera verde de Cl y 2 hidrógenos blancos en geometría tetraédrica.",
      "compatibilidad": "requiere_flexibles"
    },
    "trivia": {
      "pregunta": "¿Por qué el ácido cloroacético (Cl-CH₂-COOH, pKa = 2.86) es casi 100 veces más ácido y se disocia mucho más en agua que el ácido acético común (CH₃-COOH, pKa = 4.76)?",
      "opciones": [
        "Por el fuerte efecto inductivo atractor de electrones (-I) del átomo de cloro electronegativo, que deslocaliza la carga negativa y estabiliza el anión carboxilato resultante.",
        "Porque el enlace C-Cl se rompe liberando iones cloruro que reaccionan violentamente con el agua.",
        "Porque el grupo carboxilo pierde dos protones simultáneamente en lugar de uno.",
        "Porque la molécula de ácido cloroacético es apolar y precipita más rápido en solución acuosa."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La alta electronegatividad del cloro retira densidad electrónica a lo largo de los enlaces sigma (efecto inductivo -I). Esto debilita el enlace O-H del carboxilo y estabiliza el anión carboxilato (ClCH₂COO⁻) al dispersar la carga negativa entre más átomos, aumentando enormemente la acidez."
    }
  }
];

export const getMoleculeById = (id: string): MoleculeData | undefined => {
  return MOLECULES_DATASET.find((m) => m.id === id);
};
