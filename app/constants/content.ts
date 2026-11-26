import portrait from "~/assets/retrato-david.jpeg";
import yearsHighlight from "~/assets/6anios.png";
import baristasHighlight from "~/assets/120baristas.png";
import espressoImage from "~/assets/nathan-dumlao-KixfBEdyp64-unsplash.jpg";
import latteArtImage from "~/assets/jonas-jacobsson-RFHFV7lVQBY-unsplash.jpg";
import flowImage from "~/assets/karl-fredrickson-TYIzeCiZ_60-unsplash.jpg";
import footerEdge from "~/assets/bottom.png";
import heroGraffiti from "~/assets/grafiti-hero.svg";
import advisoryImage from "~/assets/cafeteria.jpeg";
import baristaInicialImage from "~/assets/vincent-leyva-fdUwaeewqt8-unsplash.jpg";
import carouselKettle from "~/assets/carousel/41-IMG-20250914-WA0079(1).jpg";
import carouselServe from "~/assets/carousel/51-IMG-20250914-WA0061(1).jpg";
import carouselCupping from "~/assets/carousel/35-IMG-20250918-WA0027.jpg";
import carouselBrew from "~/assets/carousel/128-98-20250914_124453.jpg";
import carouselChemex from "~/assets/carousel/_DSC1104.jpg";
import carouselBar from "~/assets/carousel/_DSC1183.jpg";

const whatsappHref = "https://wa.me/5491127034860";
const instagramHref = "https://www.instagram.com/beatreyes_/";
const aboutSectionId = "sobre-mi";
const coursesSectionId = "cursos";
const advisorySectionId = "asesoria";

export const content = {
  brand: "David Reyes",
  homePath: "/",
  navigation: {
    label: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    links: [
      { label: "Sobre mí", to: `/#${aboutSectionId}` },
      { label: "Cursos", to: `/#${coursesSectionId}` },
      { label: "Asesoría", to: `/#${advisorySectionId}` },
      { label: "Herramientas y recursos", to: "/herramientas" },
    ],
  },
  home: {
    metaTitle: "Cafetera",
    metaDescription: "Secuencia de frames de una cafetera reproducida con el scroll.",
    heroTitle: "¡Bienvenido! ¿Preparamos algo?",
    heroDescription: "Me dedico a compartir lo que sé de café a través de cursos prácticos y asesorías. Dime qué necesitas y arrancamos.",
    heroActionLabel: "Hablemos",
    heroActionPath: whatsappHref,
    heroImageLabel: "Secuencia de la cafetera controlada con el scroll",
    heroDecorationSrc: heroGraffiti,
    heroDecorationAlt: "",
    heroScrollHint: "Desliza hacia abajo",
  },
  about: {
    id: aboutSectionId,
    imageSrc: portrait,
    imageAlt: "David Reyes",
    title: "TÉCNICA REAL Y BUENA ONDA.",
    description:
      "Soy David Reyes, barista profesional, tostador y capacitador. Nací en Colombia, pero fue acá en Buenos Aires donde me hice barista de verdad. Con más de seis años en el mundo gastronómico y del café de especialidad, pasé por barras clave como Rangitoto, Onze y Seattle Coffee —donde fui barista principal—, además de sumar experiencia como barista e instructor de cursos en Negro Café y formarme como tostador y especialista técnico en máquinas en Fuego y Avo Coffee Roasters. En todo este recorrido fui explorando el café desde distintos ángulos: desde la calibración fina de espresso hasta diferentes métodos de filtrado como AeroPress o cafetera italiana. Hoy vuelco toda esa experiencia en barras, tueste y extracción dirigiendo catas, cursos, capacitaciones corporativas y asesorías gastronómicas para que entiendas y disfrutes el café sin vueltas.",
    highlights: [
      { src: yearsHighlight, alt: "+6 años de experiencia real" },
      { src: baristasHighlight, alt: "+120 baristas formados" },
    ],
  },
  courses: {
    id: coursesSectionId,
    badges: [
      { label: "ENTRENAMIENTO EN MÁQUINA", variant: "solid" },
      { label: "Grupos reducidos · barra real", variant: "outline" },
    ],
    title: "FORMACIÓN DE BARISTAS DE ALTO NIVEL.",
    description:
      "Entrena detrás de la máquina para dominar la extracción, la textura de leche y el ritmo de despacho con criterio profesional.",
    filters: [
      { id: "all", label: "Todos" },
      { id: "presencial", label: "Presencial" },
      { id: "intensivo", label: "Intensivo" },
    ],
    items: [
      {
        id: "barista-inicial",
        category: "presencial",
        variant: "image",
        imageSrc: baristaInicialImage,
        imageAlt: "Dos baristas detrás de la barra de una cafetería",
        meta: "Presencial",
        title: "Barista inicial",
        description:
          "Este programa está diseñado para sumergirte desde cero en el universo del café de especialidad, transformando la curiosidad en criterio técnico y seguridad detrás de la barra. A lo largo de las sesiones comprenderás el viaje completo del grano, desde su cultivo en finca y los distintos procesos de beneficio hasta cómo el tueste define el perfil sensorial que luego encontrarás en la taza. Aprenderás a reconocer la anatomía y el funcionamiento interno de la máquina de espresso y del molino profesional, dominando los protocolos de seguridad, ergonomía y limpieza diaria indispensables en cualquier cafetería de alto nivel. El enfoque es eminentemente práctico: desarrollarás memoria muscular para la dosificación, la distribución y el prensado uniforme, evitando errores habituales como la canalización. También entrenarás tu paladar para distinguir defectos básicos de extracción y equilibrar acidez, dulzor y amargor. Al finalizar, contarás con la base operativa y sensorial necesaria para preparar bebidas clásicas con consistencia y dar tus primeros pasos en una barra profesional.\n\n" +
          "1. Del grano a la taza: Especies botánicas (Arábica y Robusta), terroir, procesos de beneficio (lavado, natural, honey) y niveles de tueste.\n" +
          "2. Anatomía del equipamiento: Partes, funcionamiento y mantenimiento preventivo de máquinas de espresso comerciales y molinos on-demand.\n" +
          "3. Preparación del puck: Técnicas de dosificación precisa, distribución homogénea, nivelación y prensado (tamping) con presión constante.\n" +
          "4. Fundamentos de extracción: Variables críticas (dosis, molienda, tiempo, temperatura y rendimiento) y lectura visual del flujo.\n" +
          "5. Introducción a la texturización de leche: Incorporación de aire, emulsión y control de temperatura para bebidas clásicas (flat white, cappuccino, latte).\n" +
          "6. Protocolos de higiene y barra: Purgado de lanzas, retrolavado (backflushing), limpieza de fresas y organización del espacio de trabajo.",
        actionLabel: "Ver más",
        actionTo: "/cursos/barista-inicial",
      },
      {
        id: "espresso",
        category: "presencial",
        variant: "image",
        imageSrc: espressoImage,
        imageAlt: "Extracción de espresso en una taza",
        meta: "Presencial · 6H",
        // price: "$120 USD",
        title: "Espresso & Calibración",
        description:
          "Pensado para baristas con conocimientos básicos que buscan dominar la ciencia detrás de la extracción y lograr reproducibilidad absoluta taza tras taza. En este curso dejarás de calibrar por intuición para trabajar bajo métricas exactas, utilizando refractometría, ratios de extracción y análisis sensorial estructurado. Profundizarás en la física y química del agua, entendiendo cómo la dureza, la alcalinidad y el equilibrio mineral impactan directamente en la solubilidad de los compuestos aromáticos y en la salud de la caldera. Aprenderás a diagnosticar subextracciones y sobreextracciones complejas, ajustando variables de forma aislada para resolver problemas en tiempo real durante el servicio. Explorarás perfiles de presión, preinfusión y curvas de temperatura según el origen, la densidad y el desarrollo del tueste de cada lote. Al terminar, podrás diseñar recetas de espresso desde cero y mantener la estabilidad del perfil sensorial de una cafetería frente a cambios climáticos y desgaste de muelas.\n\n" +
          "1. Química del agua para café: Impacto de los sólidos disueltos totales (TDS), dureza general, alcalinidad y estándares de filtración.\n" +
          "2. Matemática de la extracción: Cálculo de Brew Ratios, porcentaje de extracción (%EY), uso de refractómetro y lectura de cartas de control.\n" +
          "3. Granulometría y molienda: Geometría de muelas planas vs. cónicas, retención, distribución de partículas (boulders y fines) y ajuste micrométrico.\n" +
          "4. Variables avanzadas de máquina: Manipulación de temperatura PID, tiempos de preinfusión y perfiles de presión según la densidad del grano.\n" +
          "5. Calibración sensorial (Dialing-in): Metodología paso a paso para ajustar recetas nuevas y corregir desequilibrios de astringencia, acidez agresiva o cuerpo plano.\n" +
          "6. Control de calidad en servicio: Protocolos de recalibración durante el turno por cambios de humedad, temperatura ambiente y calentamiento del molino.",
        actionLabel: "Ver más",
        actionTo: "/cursos/espresso",
      },
      {
        id: "latte-art",
        category: "intensivo",
        variant: "image",
        imageSrc: latteArtImage,
        imageAlt: "Barista sirviendo latte art",
        meta: "Intensivo · 4H",
        // price: "$95 USD",
        title: "Latte Art & Textura",
        description:
          "Este curso aborda la leche como un ingrediente técnico tan complejo como el propio espresso, enfocándose en la microespuma perfecta y la precisión del vertido libre (free pour). Estudiarás la composición bioquímica de las proteínas y grasas lácteas, así como el comportamiento de bebidas vegetales (avena, almendra, soja) frente al vapor seco. Dominarás las dos fases críticas del vaporizado —aireación e integración— controlando el ángulo de la lanceta, la posición de la jarra y el punto exacto de corte térmico para lograr una textura sedosa, brillante y sin burbujas visibles. Una vez consolidada la emulsión, trabajarás la biomecánica del vertido: altura de caída, caudal, control de muñeca y simetría en la taza. Aprenderás a construir bases limpias con alto contraste sobre la crema del espresso antes de avanzar hacia figuras clásicas y diseños complejos. Al concluir, tendrás el control técnico para ejecutar vertidos limpios, repetibles y estéticamente equilibrados en cualquier formato de taza.\n\n" +
          "1. Ciencia de la leche y alternativas vegetales: Comportamiento de proteínas, grasas y azúcares bajo temperatura; manejo de bebidas de avena y soja.\n" +
          "2. Mecánica del vaporizado: Control de presión de vapor, purgado, posicionamiento de la lanceta, creación del vórtice y umbral térmico óptimo (55 °C – 62 °C).\n" +
          "3. Diagnóstico de microespuma: Identificación y corrección de espuma seca, sobrecalentada o falta de integración entre fases líquida y aérea.\n" +
          "4. Física del vertido libre (Free Pour): Control de altura para penetrar la crema vs. acercamiento para dibujar, manejo de caudal y ángulo de inclinación de la taza.\n" +
          "5. Construcción de figuras base: Ejecución técnica de corazón, tulipán de múltiples capas y rosetta con simetría y contraste definidos.\n" +
          "6. Selección de herramientas: Ergonomía de jarras (picos finos vs. anchos) y geometría de tazas según el volumen y la complejidad del diseño.",
        actionLabel: "Ver más",
        actionTo: "/cursos/latte-art",
      },
      {
        id: "flujo",
        category: "presencial",
        variant: "image",
        imageSrc: flowImage,
        imageAlt: "Barra de café de especialidad con estética urbana",
        meta: "Presencial · 5H",
        // price: "$110 USD",
        title: "Flujo & Velocidad",
        description:
          "Un entrenamiento intensivo diseñado para optimizar el rendimiento operativo en barras de alto volumen sin sacrificar ni un gramo de calidad sensorial. En el servicio real, la técnica individual no basta si el movimiento en barra genera cuellos de botella, tiempos muertos o fatiga innecesaria. Analizarás el diseño ergonómico de la estación de trabajo, aplicando principios de eficiencia de movimiento para reducir desplazamientos y pasos redundantes. Aprenderás a encadenar tareas en paralelo —como molienda, texturización, extracción y limpieza— manteniendo un ritmo fluido y constante durante las horas pico. Se trabajará intensamente en la gestión de comandas múltiples, la sincronización entre el barista de espresso y el de leche, y la comunicación clara bajo presión. Además, incorporarás hábitos de limpieza continua (clean-as-you-go) que mantienen la barra impecable en todo momento. Al finalizar, serás capaz de despachar tandas consecutivas de bebidas complejas con tiempos récord y consistencia total.\n\n" +
          "1. Ergonomía y diseño de estación: Distribución estratégica de molinos, knock-box, jarras, leche y tazas para minimizar recorridos de brazos y torso.\n" +
          "2. Secuenciación y trabajo en paralelo: Encadenamiento eficiente de rutinas (moler, distribuir, extraer y vaporizar simultáneamente) eliminando tiempos muertos.\n" +
          "3. Gestión de alto volumen: Estrategias para agrupar comandas, batching inteligente de leche y priorización de bebidas frías y calientes en hora pico.\n" +
          "4. Dinámica de equipo en barra: División de roles (barista principal, apoyo de leche, runner) y comunicación efectiva durante el despacho continuo.\n" +
          "5. Consistencia bajo presión: Mantenimiento de estándares de pesaje, temperatura y vertido cuando aumenta la velocidad de despacho.\n" +
          "6. Orden y limpieza continua: Implementación de hábitos de purgado, paños diferenciados y reposición en movimiento para evitar colapsos operativos.",
        actionLabel: "Ver más",
        actionTo: "/cursos/flujo",
      },
    ],
  },
  gallery: {
    label: "Galería",
    previousLabel: "Imagen anterior",
    nextLabel: "Imagen siguiente",
    slides: [
      { src: carouselServe, alt: "David Reyes sirviendo café de filtro en una cata" },
      { src: carouselCupping, alt: "David Reyes catando café junto a un grupo en la barra" },
      { src: carouselBrew, alt: "Preparación de café de filtro para una clienta" },
      { src: carouselChemex, alt: "Chemex con café recién extraído sobre una balanza" },
      { src: carouselBar, alt: "Barra de café en movimiento con máquina de espresso" },
      { src: carouselKettle, alt: "David Reyes vertiendo agua en un filtro de café" },
    ],
  },
  advisory: {
    id: advisorySectionId,
    eyebrow: "Consultoría 1:1 · David Reyes",
    title: "Barras eficientes,\nrentables y con identidad.",
    description:
      "Asesoría integral para cafeterías de especialidad y proyectos gastronómicos: desde la arquitectura de barra y selección de equipamiento hasta la estandarización de recetas y capacitación del equipo.",
    imageSrc: advisoryImage,
    imageAlt: "Cafetería de especialidad con barra de madera",
    scopeEyebrow: "ALCANCE DE CONSULTORÍA",
    scopeTitle: "Módulos de trabajo",
    areas: [
      {
        id: "infraestructura",
        index: "01",
        label: "Infraestructura",
        title: "Diseño & Apertura de Barra",
        description: "Layout ergonómico, selección de maquinaria y sistemas de filtración de agua.",
      },
      {
        id: "producto",
        index: "02",
        label: "Producto",
        title: "Ingeniería de Menú & Recetas",
        description: "Desarrollo de carta de especialidad, fichas técnicas y costeo exacto por taza..",
      },
      {
        id: "equipo",
        index: "03",
        label: "Equipo",
        title: "Capacitación & Flujo",
        description: "Entrenamiento operativo para sostener velocidad y consistencia en horas pico.",
      },
      {
        id: "auditoria",
        index: "04",
        label: "Auditoría",
        title: "Control de Calidad & Procesos",
        description: "Diagnóstico de extracción, calibración diaria y protocolos de mantenimiento.",
      },
    ],
  },
  social: {
    label: "Redes sociales",
    links: [
      { icon: "whatsapp", label: "WhatsApp", href: whatsappHref },
      { icon: "instagram", label: "Instagram", href: instagramHref },
    ],
  },
  footer: {
    label: "Pie de página",
    note: "Cursos prácticos y asesorías de café en Buenos Aires.",
    edgeSrc: footerEdge,
    edgeAlt: "",
  },
  tools: {
    title: "Herramientas y recursos",
    description: "Material para consultar y abrir sin salir de la página.",
    empty: "Esta carpeta no tiene archivos.",
    loading: "Cargando recursos",
    failureTitle: "Por ahora no pudimos mostrar el contenido.",
    failureHint: "Volvé a intentar más tarde.",
    close: "Cerrar",
    preview: "Vista",
    download: "Descargar",
    previewFallback: "No se pudo mostrar la presentación.",
    root: "Recursos",
    unavailable: "Los recursos todavía no están publicados.",
    setup:
      "Definí GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY y GOOGLE_DRIVE_FOLDER_ID. Compartí esa carpeta con el correo de la cuenta de servicio.",
    kinds: {
      folder: "Carpeta",
      sharedDrive: "Unidad compartida",
      document: "Documento",
      sheet: "Hoja de cálculo",
      slides: "Presentación",
      file: "Archivo",
    },
    errors: {
      config: "Falta la configuración de Google Drive.",
      auth: "Las variables están cargadas, pero Google rechazó la clave. El correo y la clave privada tienen que salir del mismo archivo JSON de la cuenta de servicio.",
      disabled:
        "La API de Google Drive está apagada en el proyecto de la cuenta de servicio. Activala y esperá un minuto: https://console.cloud.google.com/apis/library/drive.googleapis.com",
      missing:
        "La cuenta de servicio no ve esa carpeta. Compartila con el correo de GOOGLE_SERVICE_ACCOUNT_EMAIL, con permiso de lectura.",
      read: "No se pudo leer el contenido del Drive.",
    },
  },
  errors: {
    title: "Oops!",
    fallback: "Error",
    unexpected: "An unexpected error occurred.",
    notFoundTitle: "404",
    notFound: "The requested page could not be found.",
    frameNotFound: "Frame no encontrado",
  },
} as const;
