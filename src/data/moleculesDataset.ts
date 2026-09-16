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
    "id": "ozone",
    "name": "Ozono",
    "iupacName": "Trioxígeno",
    "formula": "O₃",
    "molarMass": 47.998,
    "classification": "Alótropo del oxígeno / Gas triatómico oxidante",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "o3-o2",
        "element": "O",
        "symbol": "O",
        "label": "O(cen)",
        "x": 0.0,
        "y": 0.446,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "o3-o1",
        "element": "O",
        "symbol": "O",
        "label": "O1",
        "x": 1.089,
        "y": -0.223,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "o3-o3",
        "element": "O",
        "symbol": "O",
        "label": "O2",
        "x": -1.089,
        "y": -0.223,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      }
    ],
    "bonds": [
      {
        "id": "o3-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "o3-b2",
        "from": 0,
        "to": 2,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Forma alotrópica triatómica del oxígeno molecular constituida por enlaces covalentes resonantes (orden de enlace 1.5). El átomo de oxígeno central presenta hibridación sp² con dos pares electrónicos enlazantes y un par solitario en disposición angular (116.8°), lo que rompe la simetría y le otorga un momento dipolar permanente. Es un agente oxidante muy poderoso que absorbe la radiación ultravioleta perjudicial en la estratosfera terrestre.",
      "datosCuriosos": [
        "La capa de ozono estratosférica (entre 15 y 35 km de altitud) absorbe entre el 97% y el 99% de la radiación UV de alta frecuencia (UV-B y UV-C), haciendo posible la vida en la superficie terrestre.",
        "En Chile, por su proximidad a la Antártica, la disminución estacional del ozono en el vórtice polar durante la primavera austral generó históricamente altos índices de radiación UV en ciudades australes como Punta Arenas.",
        "Su nombre deriva del griego 'ozein' (oler), debido a su aroma acre y picante similar al cloro, detectable por el olfato humano en concentraciones tan diminutas como 0.01 ppm tras tormentas eléctricas.",
        "A nivel del suelo (troposfera) actúa como un peligroso contaminante secundario del smog fotoquímico urbano, originado por reacciones fotocatalizadas entre óxidos de nitrógeno y compuestos orgánicos volátiles."
      ],
      "usosVidaCotidiana": [
        "Desinfección y purificación avanzada de agua potable y piscinas sin dejar residuos organoclorados ni sabor residual.",
        "Ozonoterapia médica controlada en el tratamiento coadyuvante de úlceras crónicas y desinfección en odontología.",
        "Tratamiento de aguas residuales industriales y efluentes mineros en Chile para destruir cianuro y degradar materia orgánica.",
        "Esterilización de cámaras frigoríficas y conservación de frutas de exportación en la industria agrofrutícola chilena al neutralizar el etileno."
      ],
      "geometriaMolecular": "Angular (116.8°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar permanente (μ = 0.53 D). El par de electrones no enlazante del oxígeno central rompe la simetría lineal forzando un ángulo de 116.8°; la resonancia genera cargas formales (+1 en el oxígeno central y -1/2 en cada oxígeno terminal) que producen un dipolo neto sustancial."
    },
    "kitFisico": {
      "esferas": {
        "O": 3
      },
      "conectores": {
        "cortosRigidos": 1,
        "largosFlexibles": 2
      },
      "descripcionConectores": "3 conectores: 2 largos flexibles para modelar el doble enlace representativo O=O y 1 corto rígido para el enlace simple O-O (estructura de resonancia de Lewis).",
      "tipsArmado": "¡No armes una molécula lineal ni un ciclo triangular! Elige la esfera roja central con orificios angulares a ~120°. Coloca los 2 conectores flexibles en una dirección (doble enlace resonante) y el conector rígido en la otra (enlace simple) para fijar el ángulo abierto de 117°."
    },
    "trivia": {
      "pregunta": "¿Por qué la molécula de ozono (O₃) posee una geometría angular (~116.8°) y un momento dipolar neto (μ = 0.53 D), a pesar de estar formada exclusivamente por átomos del mismo elemento (oxígeno)?",
      "opciones": [
        "Porque el átomo de oxígeno central presenta hibridación sp² con un par de electrones no enlazante y carga formal positiva que quiebra la simetría molecular.",
        "Porque los tres átomos de oxígeno se disponen en un anillo triangular equilátero con enlaces iónicos alternados.",
        "Porque los enlaces O-O son covalentes apolares y la molécula adopta una geometría lineal simétrica a 180°.",
        "Porque el oxígeno central cede electrones de valencia al núcleo de los oxígenos terminales formando enlaces dativos."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "En el modelo RPECV, el ozono corresponde a una geometría electrónica AX₂E: el átomo central posee hibridación sp² con 2 enlaces y un par no enlazante. Dicho par ejerce una intensa repulsión que comprime el ángulo a ~116.8°. Además, las estructuras resonantes de Lewis asignan una carga formal de +1 al oxígeno central y -1/2 a los terminales, generando un momento dipolar neto permanente de μ = 0.53 D."
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
      "descripcionCientifica": "Compuesto diatómico gaseoso constituido por un enlace covalente simple fuertemente polarizado entre el hidrógeno y el cloro. El cloro posee una electronegatividad (3.16) significativamente superior a la del hidrógeno (2.20), atrayendo la nube electrónica y adquiriendo una densidad de carga parcial negativa (δ⁻). En solución acuosa se ioniza de forma completa y espontánea, dando origen al ácido clorhídrico, uno de los ácidos inorgánicos fuertes más fundamentales.",
      "datosCuriosos": [
        "Es el componente ácido principal del jugo gástrico humano (concentración ~0.5% p/v, pH entre 1.5 y 2.0), indispensable para desnaturalizar proteínas y activar la enzima digestiva pepsina.",
        "En la alquimia clásica se le denominaba 'espíritu de sal' o 'ácido muriático' (del latín muria, salmuera), obtenido por destilación de sal común con sulfato ferroso o ácido sulfúrico.",
        "Al entrar en contacto con el aire húmedo genera una densa niebla blanca visible: el gas HCl reacciona de inmediato con el vapor de agua formando microgotas de ácido clorhídrico en aerosol.",
        "Las emisiones de fumarolas de volcanes activos en la cordillera de los Andes en Chile (como el Villarrica y el Láscar) expulsan toneladas diarias de gas HCl a la atmósfera circundante."
      ],
      "usosVidaCotidiana": [
        "Ácido muriático doméstico utilizado para la limpieza profunda y remoción de incrustaciones de sarro calcáreo en baños y pisos cerámicos.",
        "Decapado y desoxidación de planchas de acero en la industria metalmecánica y siderúrgica chilena previo al galvanizado.",
        "Ajuste y neutralización del pH en el agua de piscinas recreativas e industriales para maximizar la eficacia del cloro desinfectante.",
        "Reactivo de síntesis farmacológica para convertir aminas insolubles en clorhidratos hidrosolubles asimilables por el cuerpo humano."
      ],
      "geometriaMolecular": "Lineal (180°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar neto notable (μ = 1.08 D). La marcada diferencia de electronegatividad (ΔEN = 0.96) concentra la densidad electrónica hacia el átomo de cloro, generando una polarización permanente en el eje intermolecular."
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
      "tipsArmado": "Molécula diatómica simple. Une la pequeña esfera blanca (hidrógeno) a la esfera verde (cloro) con un único conector corto rígido. Visualiza cómo el conector une dos esferas de tamaños y electronegatividades contrastantes."
    },
    "trivia": {
      "pregunta": "El cloruro de hidrógeno es un gas covalente molecular (HCl(g)), pero al burbujear en agua produce una disolución con pH fuertemente ácido denominada ácido clorhídrico (HCl(aq)). ¿Cuál es la explicación físico-química de este comportamiento?",
      "opciones": [
        "El enlace covalente polar H-Cl sufre ruptura heterolítica cuantitativa en agua debido a la alta constante dieléctrica del solvente y la fuerte solvatación del protón como ion hidronio (H₃O⁺).",
        "El gas HCl contiene enlaces iónicos que se destruyen por calor de condensación al entrar en agua.",
        "El hidrógeno se disocia homolíticamente liberando radicales libres que atacan a los iones oxhidrilo del agua.",
        "El cloro absorbe electrones de la molécula de agua provocando la precipitación de iones cloruro metálicos."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El enlace H-Cl es muy polar (μ = 1.08 D). Las moléculas polares de H₂O solvatan la molécula de HCl, facilitando la ionización completa: HCl + H₂O → H₃O⁺ + Cl⁻ (Ka >> 1). Por ello, el HCl en disolución acuosa es un electrolito fuerte prototípico que se disocia al 100%."
    }
  },
  {
    "id": "sulfuric-acid",
    "name": "Ácido Sulfúrico",
    "iupacName": "Sulfato de dihidrógeno",
    "formula": "H₂SO₄",
    "molarMass": 98.079,
    "classification": "Oxácido fuerte diprótico / Tetraédrica respecto al S central",
    "difficultyLevel": "avanzado",
    "timeLimitSeconds": 120,
    "atoms": [
      {
        "id": "h2so4-s",
        "element": "S",
        "symbol": "S",
        "label": "S",
        "x": 0.0,
        "y": 0.0,
        "z": 0.42,
        "color": "#F59E0B",
        "radius": 0.46,
        "hybridization": "sp3"
      },
      {
        "id": "h2so4-o1",
        "element": "O",
        "symbol": "O",
        "label": "O1(=)",
        "x": 0.0,
        "y": 1.25,
        "z": 1.099,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "h2so4-o2",
        "element": "O",
        "symbol": "O",
        "label": "O2(=)",
        "x": 0.0,
        "y": -1.25,
        "z": 1.099,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "h2so4-o3",
        "element": "O",
        "symbol": "O",
        "label": "O3(-)",
        "x": 1.223,
        "y": 0.0,
        "z": -0.57,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "h2so4-o4",
        "element": "O",
        "symbol": "O",
        "label": "O4(-)",
        "x": -1.223,
        "y": 0.0,
        "z": -0.57,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "h2so4-h1",
        "element": "H",
        "symbol": "H",
        "label": "H1",
        "x": 1.431,
        "y": 0.932,
        "z": -0.739,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "h2so4-h2",
        "element": "H",
        "symbol": "H",
        "label": "H2",
        "x": -1.431,
        "y": -0.932,
        "z": -0.739,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "h2so4-b1",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "h2so4-b2",
        "from": 0,
        "to": 2,
        "order": 2
      },
      {
        "id": "h2so4-b3",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "h2so4-b4",
        "from": 0,
        "to": 4,
        "order": 1
      },
      {
        "id": "h2so4-b5",
        "from": 3,
        "to": 5,
        "order": 1
      },
      {
        "id": "h2so4-b6",
        "from": 4,
        "to": 6,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "Oxácido fuerte poliprótico con azufre central en estado de oxidación +6 con hibridación sp³. Presenta una geometría tetraédrica distorsionada en torno al azufre, enlazado a dos oxígenos terminales mediante enlaces dobles (S=O, 1.42 Å) y a dos grupos hidroxilo mediante enlaces simples (S-OH, 1.57 Å). La fuerte repulsión de los dobles enlaces ensancha el ángulo O=S=O a 123° y comprime el ángulo HO-S-OH a 102°. Es un ácido sumamente ávido de agua y un reactivo clave en la industria química global.",
      "datosCuriosos": [
        "Es el compuesto químico más producido a nivel mundial (>260 millones de toneladas anuales), considerado el principal termómetro del desarrollo industrial de una nación.",
        "En Chile es un insumo estratégico de magnitud colosal: la gran minería de cobre en Antofagasta, Calama y Atacama consume millones de toneladas anuales en los procesos de lixiviación en pilas.",
        "Las densas nubes de la atmósfera de Venus no están formadas por agua, sino por microgotas concentradas de ácido sulfúrico al 80-85% producidas fotoquímicamente.",
        "Posee una voracidad deshidratante tan extrema que al verterlo sobre azúcar de mesa (sacarosa) arranca todos los elementos de agua, dejando un cilindro humeante de carbón puro que se expande hacia arriba."
      ],
      "usosVidaCotidiana": [
        "Electrolito ácido líquido en las baterías recargables de plomo-ácido de vehículos y camiones.",
        "Lixiviación hidrometalúrgica de minerales oxidados de cobre en la gran minería chilena para producir cátodos de alta pureza (99.99%).",
        "Fabricación masiva de fertilizantes fosfatados (superfosfatos y sulfato de amonio) indispensables para el agro chileno.",
        "Refinación de derivados del petróleo, síntesis de detergentes sulfonados y decapado químico de aceros."
      ],
      "geometriaMolecular": "Tetraédrica distorsionada en S (O=S=O: 123°, HO-S-OH: 102°) y Angular en O-H (~106°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Molécula altamente polar (μ = 2.72 D). La coexistencia de dos enlaces dobles S=O axiales fuertemente polarizados y dos enlaces simples polares S-O-H genera una resultante dipolar neta intensa y gran avidez por formar puentes de hidrógeno."
    },
    "kitFisico": {
      "esferas": {
        "S": 1,
        "O": 4,
        "H": 2
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 4
      },
      "descripcionConectores": "8 conectores: 4 largos flexibles (para los 2 enlaces dobles S=O) y 4 cortos rígidos (2 para enlaces simples S-O y 2 para enlaces O-H).",
      "tipsArmado": "El azufre central es la esfera amarilla con 4 orificios tetraédricos. En dos de ellos inserta parejas de conectores flexibles para los 2 oxígenos terminales con enlace doble S=O. En los otros dos coloca conectores rígidos hacia los oxígenos hidroxílicos, y a estos últimos acopla los dos hidrógenos blancos."
    },
    "trivia": {
      "pregunta": "¿Por qué en la regla fundamental de seguridad en el laboratorio de química se insiste tajantemente: 'Nunca des de beber agua al ácido; dale ácido al agua' al diluir ácido sulfúrico concentrado (H₂SO₄ al 98%)?",
      "opciones": [
        "Porque la hidratación del H₂SO₄ es extremadamente exotérmica (ΔH ≈ -880 kJ/mol); si se añade agua al ácido, la pequeña masa de agua añadida hierve instantáneamente proyectando gotas cáusticas y ácidas.",
        "Porque el agua pura descompone al ácido sulfúrico en gas sulfhídrico (H₂S) altamente inflamable.",
        "Porque el ácido sulfúrico concentrado es más denso que el agua y reacciona liberando gas hidrógeno explosivo.",
        "Porque los hidrógenos del ácido sulfúrico forman una capa protectora impermeable que rechaza las moléculas de agua."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La disolución del ácido sulfúrico en agua es fuertemente exotérmica. Si se vierte una gota de agua sobre ácido concentrado, la tremenda energía liberada en un volumen diminuto hace hervir el agua instantáneamente, provocando violentas salpicaduras de ácido hirviente hacia el operador. En cambio, verter el ácido lentamente sobre un gran volumen de agua permite que la masa acuosa absorba y disipe gradualmente el calor generado."
    }
  },
  {
    "id": "copper-sulfate",
    "name": "Sulfato de Cobre(II)",
    "iupacName": "Tetraoxosulfato(VI) de cobre(II)",
    "formula": "CuSO₄",
    "molarMass": 159.609,
    "classification": "Sal oxisustituida inorgánica / Red iónico-coordinada",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "cuso4-cu",
        "element": "Cu",
        "symbol": "Cu",
        "label": "Cu²⁺",
        "x": 0.0,
        "y": 0.0,
        "z": -1.999,
        "color": "#B87333",
        "radius": 0.55,
        "hybridization": "none"
      },
      {
        "id": "cuso4-s",
        "element": "S",
        "symbol": "S",
        "label": "S",
        "x": 0.0,
        "y": 0.0,
        "z": 0.4,
        "color": "#F59E0B",
        "radius": 0.46,
        "hybridization": "sp3"
      },
      {
        "id": "cuso4-o1",
        "element": "O",
        "symbol": "O",
        "label": "O1(coord)",
        "x": 1.2,
        "y": 0.0,
        "z": -0.449,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "cuso4-o2",
        "element": "O",
        "symbol": "O",
        "label": "O2(coord)",
        "x": -1.2,
        "y": 0.0,
        "z": -0.449,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp3"
      },
      {
        "id": "cuso4-o3",
        "element": "O",
        "symbol": "O",
        "label": "O3(=)",
        "x": 0.0,
        "y": 1.2,
        "z": 1.249,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "cuso4-o4",
        "element": "O",
        "symbol": "O",
        "label": "O4(=)",
        "x": 0.0,
        "y": -1.2,
        "z": 1.249,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      }
    ],
    "bonds": [
      {
        "id": "cuso4-b1",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "cuso4-b2",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "cuso4-b3",
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "id": "cuso4-b4",
        "from": 1,
        "to": 3,
        "order": 1
      },
      {
        "id": "cuso4-b5",
        "from": 1,
        "to": 4,
        "order": 2
      },
      {
        "id": "cuso4-b6",
        "from": 1,
        "to": 5,
        "order": 2
      }
    ],
    "didactica": {
      "descripcionCientifica": "Sal inorgánica oxisustituida de cobre formada por la interacción electrostática y de coordinación entre el catión divalente cobre(II) (Cu²⁺, configuración d⁹) y el anión tetraédrico sulfato (SO₄²⁻). El azufre central presenta hibridación sp³ con resonancia equivalente entre sus cuatro oxígenos. En fase sólida o en disolución acuosa, el Cu²⁺ se coordina a oxígenos con distancias características de ~1.96 Å afectadas por la distorsión tetragonal de Jahn-Teller.",
      "datosCuriosos": [
        "Su forma mineral hidratada más famosa es la calcantita natural (CuSO₄·5H₂O), un cristal de color azul ultramar brillante hallado en zonas de oxidación de yacimientos chilenos como Chuquicamata.",
        "A finales del siglo XIX se creó el 'caldo bordelés' (CuSO₄ con cal hidratada), el primer fungicida a gran escala del planeta que salvó a los viñedos franceses de la plaga del mildiu.",
        "Es el compuesto preferido en laboratorios escolares y universitarios de Chile para cultivo de monocristales triclínicos azules por evaporación lenta.",
        "El reactivo de Fehling (usado para cuantificar azúcares reductores en orina en el diagnóstico clásico de diabetes) basa su viraje en la reducción de Cu²⁺ azul a óxido de cobre(I) rojo ladrillo."
      ],
      "usosVidaCotidiana": [
        "Fungicida cúprico agrícola indispensable para la protección foliar de viñas y frutales en valles de la zona central de Chile.",
        "Alguicida para el tratamiento y clarificación de aguas en piscinas recreativas y tranques de riego agrícola.",
        "Suplemento mineral traza en nutrición de ganado ovino y bovino para prevenir deficiencias metabólicas de cobre.",
        "Electrolito base en celdas de electrorefinación y recubrimiento galvánico de piezas metálicas con cobre."
      ],
      "geometriaMolecular": "Tetraédrica en SO₄²⁻ (~109.5°) con coordinación Jahn-Teller al catión Cu²⁺",
      "polaridad": "polar",
      "justificacionPolaridad": "Compuesto iónico fuertemente polar con separación formal de cargas divalentes (Cu²⁺ y SO₄²⁻). El par iónico coordinado exhibe un enorme gradiente de potencial electrostático dipolar (μ ≈ 7.8 D en par iónico de fase gaseosa)."
    },
    "kitFisico": {
      "esferas": {
        "Cu": 1,
        "S": 1,
        "O": 4
      },
      "conectores": {
        "cortosRigidos": 4,
        "largosFlexibles": 2
      },
      "descripcionConectores": "6 conectores: 2 largos flexibles para los dobles enlaces representativos S=O, 2 cortos rígidos para enlaces S-O y 2 cortos rígidos para la coordinación Cu²⁺···O.",
      "tipsArmado": "Construye primero el ion sulfato: coloca la esfera amarilla de azufre al centro y únele las 4 esferas rojas de oxígeno en tetraedro (usando flexibles en dos oxígenos). Luego conecta la esfera cobriza de Cobre (Cu) a 2 oxígenos para modelar la coordinación bidentada del par iónico."
    },
    "trivia": {
      "pregunta": "El sulfato de cobre(II) anhidro (CuSO₄) es un polvo blanquecino, pero al humedecerse o disolverse en agua adquiere de inmediato un color azul intenso característico. ¿Cuál es el fundamento químico-cuántico de esta coloración?",
      "opciones": [
        "El desdoblamiento de los orbitales 3d del catión Cu²⁺ (configuración d⁹) en el campo ligando octaédrico distorsionado del agua, permitiendo transiciones electrónicas d-d que absorben radiación roja y transmiten azul.",
        "La precipitación coloidal de nanopartículas de cobre metálico puro que reflejan luz azul.",
        "La reducción del átomo de azufre de estado de oxidación +6 a +2 catalizada por el agua.",
        "Una emisión de fotones azulados producida por la descomposición radiactiva natural del cobre."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El catión Cu²⁺ tiene subcapa d incompleta ([Ar] 3d⁹). Al rodearse de moléculas de agua (ligandos coordinados), los 5 orbitales d degenerados se desdoblan en niveles energéticos distintos (efecto del campo cristalino / ligando con distorsión Jahn-Teller). La energía requerida para excitar un electrón entre estos niveles d corresponde exactamente a fotones de luz roja (~600-650 nm); al absorberse el rojo, la disolución transmite el color complementario que es el azul brillante."
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
      "descripcionCientifica": "Molécula triatómica dipolar fundamental unida por dos enlaces covalentes polares O-H. El átomo de oxígeno posee hibridación sp³ con dos pares electrónicos enlazantes y dos pares de electrones no enlazantes. La intensa repulsión entre los pares solitarios comprime el ángulo tetraédrico ideal de 109.5° a 104.5°. Es el solvente universal de la biología y la geología gracias a su capacidad de formar redes tridimensionales cooperativas de puentes de hidrógeno.",
      "datosCuriosos": [
        "El hielo flota sobre el agua líquida porque alcanza su densidad máxima a 3.98 °C; por debajo de esa temperatura, los puentes de hidrógeno se rigidizan en una red hexagonal abierta y hueca que expande su volumen en un 9%.",
        "Presenta una tensión superficial extraordinariamente alta (72.8 mN/m a 20 °C), lo que permite a insectos como los zapateros caminar sobre ella y posibilita el ascenso por capilaridad en árboles de más de 100 metros de altura.",
        "Posee un calor específico muy elevado (4.184 J/(g·°C)), lo que convierte a los océanos y a la vasta corriente de Humboldt en Chile en un inmenso estabilizador térmico climático.",
        "En una sola gota de agua (0.05 mL) hay aproximadamente 1.67 × 10²¹ moléculas, un número muy superior a todos los granos de arena existentes en todas las playas del planeta Tierra."
      ],
      "usosVidaCotidiana": [
        "Solvente vital insustituible en todos los medios celulares (citosol, plasma sanguíneo y linfa).",
        "Medio de transporte, dilución y formulación de fármacos, jarabes y soluciones de rehidratación hospitalaria.",
        "Termorregulación biológica de mamíferos y seres humanos mediante evaporación superficial por sudoración.",
        "Generación hidroeléctrica de energía limpia en centrales del centro-sur de Chile y fluido caloportador industrial."
      ],
      "geometriaMolecular": "Angular (104.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Elevado momento dipolar neto (μ = 1.85 D) originado por la fuerte diferencia de electronegatividad (ΔEN = 1.24) sumada vectorialmente en una geometría angular no simétrica."
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
      "tipsArmado": "¡No uses los orificios a 180°! Emplea los orificios angulares de la esfera roja del oxígeno para que los dos hidrógenos blancos queden formando una 'V' abierta con un ángulo aproximado de 104.5°."
    },
    "trivia": {
      "pregunta": "Según el modelo de Repulsión de Pares Electrónicos de la Capa de Valencia (RPECV), ¿por qué el ángulo de enlace H-O-H en el agua (104.5°) es notablemente menor que el ángulo tetraédrico regular (109.5°)?",
      "opciones": [
        "Porque los dos pares de electrones no enlazantes del oxígeno ocupan más espacio volumétrico y ejercen mayor repulsión que los pares enlazantes, comprimiendo los enlaces O-H.",
        "Porque los dos átomos de hidrógeno presentan polaridades magnéticas opuestas que los atraen fuertemente en el espacio.",
        "Porque el oxígeno tiene hibridación sp con tendencia natural a los 180°, deformada por la gravedad terrestre.",
        "Porque los enlaces O-H son iónicos y los cationes hidrógeno sufren una atracción electrostática intermolecular."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "En el modelo RPECV, los pares no enlazantes interactúan con un solo núcleo atómico (oxígeno) y sus nubes electrónicas son más difusas y voluminosas. La jerarquía repulsiva es: par libre-par libre > par libre-par enlazante > par enlazante-par enlazante. La intensa repulsión entre los dos pares solitarios comprime el ángulo H-O-H desde 109.5° hasta 104.5°."
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
      "descripcionCientifica": "Sal inorgánica binaria de plata y cloro representativa del enlace iónico con marcado carácter covalente polarizable. En fase sólida cristaliza en una red cúbica compacta similar a la del NaCl donde cada ion Ag⁺ está coordinado a 6 iones Cl⁻. Destaca por su extrema insolubilidad en agua (Ksp = 1.77 × 10⁻¹⁰) y por su marcada fotosensibilidad: al recibir fotones UV o de luz visible sufre fotorreducción liberando nanopartículas oscuras de plata metálica.",
      "datosCuriosos": [
        "Fue la piedra angular de la fotografía química y analógica durante más de un siglo: sus cristales fotosensibles suspendidos en gelatina formaban la emulsión que retenía la imagen latente.",
        "A pesar de ser prácticamente insoluble en agua pura (se disuelven solo 1.9 miligramos por litro), se disuelve con rapidez al añadir amoníaco por formación del catión complejo incoloro diamincobreplata [Ag(NH₃)₂]⁺.",
        "Los lentes fotosensibles fotocromáticos incorporan microcristales de AgCl que se fotorreducen con la radiación solar exterior oscureciéndose en segundos para proteger la vista.",
        "En la historia minera de Chile, la clorargirita (mineral natural de AgCl llamado 'plata córnea') fue uno de los minerales más ricos y fáciles de fundir descubiertos en el mítico mineral de Chañarcillo en 1832."
      ],
      "usosVidaCotidiana": [
        "Electrodo de referencia Ag/AgCl de uso universal en potenciómetros escolares y sensores de pH electroquímicos.",
        "Apósitos avanzados y vendas hospitalarias con acción bactericida prolongada para el tratamiento de quemaduras.",
        "Lentes de anteojos fotocromáticos que se adaptan a la intensidad de la luz solar.",
        "Método argentométrico de Mohr para la determinación analítica exacta de cloruros en aguas potables y salmueras."
      ],
      "geometriaMolecular": "Lineal en par molecular didáctico / Cúbica centrada en las caras en red sólida",
      "polaridad": "polar",
      "justificacionPolaridad": "Compuesto iónico altamente polar (momento dipolar en fase vapor μ ≈ 5.73 D). La enorme diferencia electrostática entre el catión plata y el ion cloruro genera un dipolo neto intenso en el par iónico."
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
      "descripcionConectores": "1 conector corto rígido para modelar la unión de contacto del par iónico Ag⁺···Cl⁻.",
      "tipsArmado": "Une la esfera gris plateada de Plata (Ag) a la esfera verde de Cloro (Cl) mediante 1 conector corto rígido. Esta pareja didáctica simboliza la unidad de contacto de la red cristalina sólida."
    },
    "trivia": {
      "pregunta": "Al mezclar una disolución acuosa de nitrato de plata (AgNO₃) con una de cloruro de sodio (NaCl), se produce de inmediato un precipitado blanco de cloruro de plata (AgCl) que se oscurece al exponerse a la luz. ¿Qué proceso químico explica este oscurecimiento?",
      "opciones": [
        "La fotorreducción de los cationes Ag⁺ inducida por la luz, que promueve la transferencia de un electrón desde el ion Cl⁻ precipitando gránulos microscópicos oscuros de plata metálica neutra (Ag⁰).",
        "La pérdida inmediata de cloro gaseoso dejando óxido de plata amarillo en suspensión.",
        "La fusión térmica de los iones plata que forman una película reflectante homogénea.",
        "La descomposición del precipitado en nitrógeno molecular por absorción de calor ambiental."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El AgCl es un compuesto fotosensible. Al absorber fotones de radiación luminosa (hν), un electrón es promovido desde el cloruro hacia el catión plata: Ag⁺ + Cl⁻ + hν → Ag⁰ + ½ Cl₂. Los cúmulos microscópicos de plata metálica elemental (Ag⁰) dispersos en el sólido absorben toda la luz visible confiriendo el color gris-púrpura oscuro característico de la fotografía química tradicional."
    }
  },
  {
    "id": "chloroform",
    "name": "Cloroformo",
    "iupacName": "Triclorometano",
    "formula": "CHCl₃",
    "molarMass": 119.378,
    "classification": "Haloalcano / Tetraédrica distorsionada",
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
      "descripcionCientifica": "Haloalcano derivado del metano por sustitución de tres hidrógenos por átomos de cloro. El carbono central presenta hibridación sp³ con geometría tetraédrica asimétrica distorsionada (grupo puntual C₃v). El mayor volumen estérico de los cloros amplía el ángulo Cl-C-Cl a 110.4° y comprime el ángulo H-C-Cl a 108.5°. Debido a la diferencia de electronegatividad entre el enlace C-H y los tres enlaces polares C-Cl, los dipolos de enlace no se cancelan, confiriéndole un momento dipolar permanente neto.",
      "datosCuriosos": [
        "En 1847 el médico James Simpson descubrió sus efectos anestésicos; cobró fama mundial cuando la Reina Victoria lo inhaló durante el nacimiento del príncipe Leopoldo en 1853.",
        "Expuesto al aire y a la luz solar se oxida fotoquímicamente generando fosgeno (COCl₂), un gas extremadamente tóxico y asfixiante empleado como arma química en la Primera Guerra Mundial.",
        "Es un líquido notablemente denso (d ≈ 1.49 g/cm³, casi 1.5 veces más denso que el agua): al mezclarse con agua en un tubo de decantación forma siempre la fase inferior.",
        "En el cine se suele mostrar que un trapo con cloroformo duerme a una persona en dos segundos, pero en la realidad clínica se requerían entre 5 y 10 minutos de inhalación continua para inducir anestesia."
      ],
      "usosVidaCotidiana": [
        "Solvente de extracción y partición de principios activos, alcaloides y antibióticos en la industria químico-farmacéutica.",
        "Precursor industrial en la síntesis del monómero tetrafluoroetileno para la fabricación de politetrafluoroetileno (Teflón).",
        "Disolvente deuterado universal (CDCl₃) en espectroscopía de Resonancia Magnética Nuclear (RMN).",
        "Reactivo químico en la síntesis de refrigerantes hidroclorofluorocarbonados (HCFC-22)."
      ],
      "geometriaMolecular": "Tetraédrica distorsionada en C (Cl-C-Cl: 110.4°, H-C-Cl: 108.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Momento dipolar permanente significativo (μ = 1.15 D). Los tres dipolos de enlace C-Cl apuntan hacia los vértices de la base clorada y no son contrarrestados por el enlace C-H, generando una resultante neta que apunta hacia los cloros."
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
      "tipsArmado": "Toma la esfera negra de carbono (4 orificios tetraédricos). Inserta conectores rígidos en los 4 orificios. En 3 de ellos coloca esferas verdes de cloro formando un trípode piramidal, y en el orificio superior coloca la pequeña esfera blanca de hidrógeno."
    },
    "trivia": {
      "pregunta": "A pesar de poseer una geometría tetraédrica similar a la del metano (CH₄) y tetracloruro de carbono (CCl₄), ¿por qué el cloroformo (CHCl₃) es una molécula netamente polar (μ = 1.15 D) mientras que CH₄ y CCl₄ son apolares (μ = 0 D)?",
      "opciones": [
        "Porque la presencia de un enlace C-H y tres enlaces C-Cl rompe la simetría tetraédrica perfecta (C₃v vs Td); los tres dipolos C-Cl no se anulan vectorialmente con el dipolo C-H.",
        "Porque los tres átomos de cloro forman dobles enlaces resonantes que giran en el plano.",
        "Porque el átomo de hidrógeno adquiere carga parcial negativa mientras el carbono se neutraliza.",
        "Porque el cloroformo tiene una geometría plana trigonal donde los cloros se agrupan en un lado."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "La polaridad molecular depende de la suma vectorial de los dipolos de enlace en el espacio 3D. En el tetracloruro de carbono (CCl₄), los 4 enlaces idénticos orientados hacia los vértices de un tetraedro regular cancelan vectorialmente sus dipolos a cero exacto. En el cloroformo (CHCl₃), al sustituirse un cloro por un hidrógeno de mucha menor electronegatividad, se destruye la compensación simétrica y el dipolo neto resultante es de μ = 1.15 D."
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
      "descripcionCientifica": "Haloalcano perclorado derivado de la sustitución total de los hidrógenos del metano por cuatro átomos de cloro. El carbono central presenta hibridación sp³ en el centro de un tetraedro regular perfecto de alta simetría (grupo puntual Td) con ángulos de enlace exactos de 109.47°. Aunque cada enlace C-Cl es individualmente muy polar por la diferencia de electronegatividad (ΔEN = 0.61), la disposición espacial tetraédrica anula vectorialmente todos los momentos dipolares, resultando en una molécula rigurosamente apolar.",
      "datosCuriosos": [
        "En el siglo XX se utilizó ampliamente en tintorerías para lavado en seco y en extintores de incendios portátiles, hasta que se demostró su alta hepatotoxicidad y su efecto destructor de la capa de ozono.",
        "Fue prohibido a escala planetaria por el Protocolo de Montreal de 1987 debido a su alto potencial de agotamiento del ozono estratosférico.",
        "Es un líquido extraordinariamente denso e inmiscible con agua (densidad de 1.59 g/cm³): si se junta con agua forma dos capas separadas donde el agua flota nítidamente en la parte superior.",
        "A diferencia de los hidrocarburos no es combustible en aire: al calentarse no arde, sino que genera una capa densa de vapor clorado que extingue las llamas por sofocación de oxígeno."
      ],
      "usosVidaCotidiana": [
        "Disolvente apolar de referencia en laboratorios para disolver ceras, grasas pesadas, yodo molecular elemental y fósforo blanco.",
        "Precursor histórico industrial en la fabricación masiva de los clorofluorocarbonos CFC-11 y CFC-12.",
        "Reactivo sintético en química orgánica en la reacción de halogenación selectiva de Appel para convertir alcoholes en cloruros.",
        "Líquido patrón de alta densidad y baja viscosidad para calibración de viscosímetros e investigaciones termodinámicas."
      ],
      "geometriaMolecular": "Tetraédrica regular (109.5°)",
      "polaridad": "apolar",
      "justificacionPolaridad": "Momento dipolar neto exactamente nulo (μ = 0.00 D). La simetría tetraédrica regular perfecta (Td) provoca que los cuatro momentos dipolares de enlace C-Cl idénticos se anulen mutuamente por suma vectorial en las tres dimensiones espaciales."
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
      "descripcionConectores": "4 conectores cortos rígidos para los cuatro enlaces simples C-Cl equivalentes en geometría tetraédrica regular.",
      "tipsArmado": "Toma la esfera negra de carbono (con 4 orificios tetraédricos a 109.5°). Inserta un conector rígido en cada uno de los 4 orificios y monta una esfera verde de cloro en cada punta. Comprueba que al rotar la molécula se ve exactamente igual desde cualquier perspectiva."
    },
    "trivia": {
      "pregunta": "El tetracloruro de carbono (CCl₄) contiene cuatro enlaces covalentes fuertemente polares C-Cl, pero su momento dipolar neto experimental es estrictamente cero (μ = 0 D). ¿Qué principio geométrico y vectorial justifica esta propiedad?",
      "opciones": [
        "La simetría tetraédrica regular perfecta (Td) orienta los 4 vectores dipolares hacia los vértices de un tetraedro a 109.5°, haciendo que su suma vectorial espacial resulte exactamente igual a cero.",
        "Los átomos de cloro transfieren sus pares libres al núcleo del carbono cancelando la diferencia de electronegatividad.",
        "La molécula vibra a una frecuencia que anula el campo eléctrico externo de forma periódica.",
        "Los enlaces C-Cl se convierten en covalentes apolares por resonancia en el estado fundamental."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "Una molécula con enlaces polares puede ser macroscópicamente apolar si su geometría molecular es simétrica. En el CCl₄, el carbono sp³ se sitúa en el centro de un tetraedro regular: los cuatro dipolos de enlace C-Cl poseen la misma magnitud y se proyectan en ángulos mutuos de 109.5°. La suma vectorial de cuatro vectores de igual magnitud dirigidos a los vértices de un tetraedro regular es algebraicamente idéntica a cero: Σ μ = 0."
    }
  },
  {
    "id": "acetone",
    "name": "Acetona",
    "iupacName": "Propan-2-ona",
    "formula": "C₃H₆O",
    "molarMass": 58.08,
    "classification": "Cetona alifática / Carbonilo plano trigonal (sp²)",
    "difficultyLevel": "intermedio",
    "timeLimitSeconds": 90,
    "atoms": [
      {
        "id": "ace-c2",
        "element": "C",
        "symbol": "C",
        "label": "C=O",
        "x": 0.0,
        "y": 0.421,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp2"
      },
      {
        "id": "ace-o",
        "element": "O",
        "symbol": "O",
        "label": "O",
        "x": 0.0,
        "y": 1.641,
        "z": 0.0,
        "color": "#EF4444",
        "radius": 0.4,
        "hybridization": "sp2"
      },
      {
        "id": "ace-c1",
        "element": "C",
        "symbol": "C",
        "label": "C1",
        "x": -1.281,
        "y": -0.379,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "ace-c3",
        "element": "C",
        "symbol": "C",
        "label": "C3",
        "x": 1.281,
        "y": -0.379,
        "z": 0.0,
        "color": "#262626",
        "radius": 0.45,
        "hybridization": "sp3"
      },
      {
        "id": "ace-h1a",
        "element": "H",
        "symbol": "H",
        "label": "H1a",
        "x": -1.516,
        "y": 0.685,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ace-h1b",
        "element": "H",
        "symbol": "H",
        "label": "H1b",
        "x": -1.743,
        "y": -0.668,
        "z": 0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ace-h1c",
        "element": "H",
        "symbol": "H",
        "label": "H1c",
        "x": -1.743,
        "y": -0.668,
        "z": -0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ace-h3a",
        "element": "H",
        "symbol": "H",
        "label": "H3a",
        "x": 1.516,
        "y": 0.685,
        "z": 0.0,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ace-h3b",
        "element": "H",
        "symbol": "H",
        "label": "H3b",
        "x": 1.743,
        "y": -0.668,
        "z": 0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      },
      {
        "id": "ace-h3c",
        "element": "H",
        "symbol": "H",
        "label": "H3c",
        "x": 1.743,
        "y": -0.668,
        "z": -0.89,
        "color": "#FFFFFF",
        "radius": 0.25,
        "hybridization": "s"
      }
    ],
    "bonds": [
      {
        "id": "ace-b0",
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "id": "ace-b1",
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "id": "ace-b2",
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "id": "ace-b3",
        "from": 2,
        "to": 4,
        "order": 1
      },
      {
        "id": "ace-b4",
        "from": 2,
        "to": 5,
        "order": 1
      },
      {
        "id": "ace-b5",
        "from": 2,
        "to": 6,
        "order": 1
      },
      {
        "id": "ace-b6",
        "from": 3,
        "to": 7,
        "order": 1
      },
      {
        "id": "ace-b7",
        "from": 3,
        "to": 8,
        "order": 1
      },
      {
        "id": "ace-b8",
        "from": 3,
        "to": 9,
        "order": 1
      }
    ],
    "didactica": {
      "descripcionCientifica": "La cetona alifática más elemental. Su núcleo comprende un grupo carbonilo central cuyo carbono presenta hibridación sp² con geometría trigonal plana (~120°), enlazado mediante un doble enlace (σ y π) a un oxígeno electronegativo y mediante enlaces simples a dos grupos metilo tetraédricos (-CH₃, sp³). La notable polarización de la unión C=O confiere a la molécula un elevado momento dipolar permanente, haciéndola un solvente polar aprótico arquetípico.",
      "datosCuriosos": [
        "El cuerpo humano produce acetona de forma fisiológica durante la cetosis (ayuno prolongado, dietas cetogénicas o diabetes descompensada), expulsándose por la respiración y otorgando el característico 'aliento cetónico'.",
        "Colapsa el poliestireno expandido (plumavit) de forma casi mágica: disuelve de inmediato la matriz polimérica liberando más del 95% de aire atrapado en su volumen.",
        "Es el solvente de limpieza por excelencia en laboratorios de química: disuelve grasas, es totalmente miscible con agua y con disolventes orgánicos, y se evapora a 56 °C sin dejar marcas.",
        "Durante la Primera Guerra Mundial se produjo a escala colosal mediante fermentación bacteriana bacteriana con Clostridium acetobutylicum (proceso Weizmann) para fabricar la pólvora cordita."
      ],
      "usosVidaCotidiana": [
        "Quitaesmalte tradicional de uñas y removedor eficaz de pegamentos instantáneos de cianoacrilato.",
        "Limpieza y desengrasado profundo de componentes mecánicos, electrónicos y material de laboratorio.",
        "Disolvente industrial de resinas, lacas, esmaltes sintéticos y pinturas epóxicas.",
        "Materia prima en la síntesis del monómero metacrilato de metilo (acrílico transparente) y bisfenol A."
      ],
      "geometriaMolecular": "Trigonal plana en C=O (120°) y Tetraédrica en metilos (109.5°)",
      "polaridad": "polar",
      "justificacionPolaridad": "Elevado momento dipolar neto (μ = 2.88 D) debido a la fuerte polarización del enlace carbonílico C=O (oxígeno con dos pares libres no enlazantes) no compensada por los metilos alifáticos."
    },
    "kitFisico": {
      "esferas": {
        "C": 3,
        "H": 6,
        "O": 1
      },
      "conectores": {
        "cortosRigidos": 8,
        "largosFlexibles": 2
      },
      "descripcionConectores": "10 conectores: 2 largos flexibles para el doble enlace C=O y 8 cortos rígidos para enlaces simples (2 C-C y 6 C-H).",
      "tipsArmado": "¡Cuidado con el carbono central! Debe tener geometría trigonal plana (120°). Únelo al oxígeno rojo usando los 2 tubos flexibles simultáneos para el doble enlace C=O. Luego acopla los 2 carbonos metilo a los lados (con 3 hidrógenos cada uno)."
    },
    "trivia": {
      "pregunta": "¿Qué tipo de hibridación orbital presenta el carbono central del grupo carbonilo (C=O) en la acetona y qué características geométricas y de enlaces genera?",
      "opciones": [
        "Hibridación sp² con geometría trigonal plana (~120°), formando un enlace sigma (σ) y un enlace pi (π) con el oxígeno.",
        "Hibridación sp con geometría lineal (180°) y dos enlaces pi concéntricos.",
        "Hibridación sp³ con geometría tetraédrica (109.5°) y dos enlaces sigma coaxiales.",
        "Hibridación sp³d con geometría bipiramidal trigonal y enlaces dativos coordinados."
      ],
      "respuestaCorrecta": 0,
      "explicacion": "El carbono carbonílico forma 3 enlaces sigma (σ) coplanares a ~120° empleando orbitales híbridos sp² (dos dirigidos a los carbonos de los metilos y uno hacia el oxígeno). El orbital 2p puro restante perpendicular al plano se solapa lateralmente con un orbital p del oxígeno para formar el enlace pi (π) que compone la doble ligadura C=O."
    }
  }
];

export const getMoleculeById = (id: string): MoleculeData | undefined => {
  return MOLECULES_DATASET.find((m) => m.id === id);
};
