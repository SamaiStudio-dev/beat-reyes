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
      // { label: "Contacto", to: "/contacto" },
      // { label: "Herramientas", to: "/herramientas" },
    ],
  },
  home: {
    metaTitle: "Cafetera",
    metaDescription: "Secuencia de frames de una cafetera reproducida con el scroll.",
    heroTitle: "¡Bienvenido! ¿Preparamos algo?",
    heroDescription: "Me dedico a compartir lo que sé de café a través de cursos prácticos y asesorías. Dime qué necesitas y arrancamos.",
    heroActionLabel: "Hablemos",
    heroActionPath: "/contacto",
    heroImageLabel: "Secuencia de la cafetera controlada con el scroll",
  },
  about: {
    id: aboutSectionId,
    imageSrc: "/about.png",
    imageAlt: "David Reyes",
    title: "TÉCNICA REAL Y BUENA ONDA.",
    description:
      "Soy David Reyes. Nací en Colombia, pero fue acá en Buenos Aires donde me hice barista de verdad. Llevo más de seis años trabajando en cafeterías de especialidad, jugando con todo: desde calibrar una máquina espresso profesional hasta sacar lo mejor de una AeroPress o una italiana. Hoy vuelco toda esa experiencia en clases, catas y asesorías para que disfrutes el café sin vueltas.",
    stats: [
      { value: "+6 AÑOS", label: "DE EXPERIENCIA REAL" },
      { value: "+120", label: "BARISTAS FORMADOS" }
    ],
  },
  courses: {
    id: coursesSectionId,
    badges: [
      { label: "Formación 100% práctica", variant: "solid" },
      { label: "Grupos reducidos · barra real", variant: "outline" },
    ],
    title: "Cursos de barista sin rodeos.",
    description:
      "Aprende en barra real con David Reyes (Beat Reyes). Poca teoría aburrida, mucha calibración, flujo de trabajo y ritmo urbano.",
    filters: [
      { id: "all", label: "Todos" },
      { id: "presencial", label: "Presencial" },
      { id: "intensivo", label: "Intensivo" },
    ],
    items: [
      {
        id: "espresso",
        category: "presencial",
        variant: "image",
        imageSrc: "/courses/espresso.png",
        imageAlt: "Extracción de espresso en una taza",
        meta: "Presencial · 6H",
        // price: "$120 USD",
        title: "Espresso & Calibración",
        description:
          "Domina molienda, ratio de extracción y consistencia en horas pico sin recetas rígidas.",
        actionLabel: "Ver más",
        actionTo: "/cursos/espresso",
      },
      {
        id: "latte-art",
        category: "intensivo",
        variant: "image",
        imageSrc: "/courses/latte-art.png",
        imageAlt: "Barista sirviendo latte art",
        meta: "Intensivo · 4H",
        // price: "$95 USD",
        title: "Latte Art & Textura",
        description:
          "Control de lanza de vapor, microespuma sedosa y vertido libre (corazón, rosetta y tulipán).",
        actionLabel: "Ver más",
        actionTo: "/cursos/latte-art",
      },
      {
        id: "flujo",
        category: "presencial",
        variant: "image",
        imageSrc: "/courses/flujo.png",
        imageAlt: "Barra de café de especialidad con estética urbana",
        meta: "Presencial · 5H",
        // price: "$110 USD",
        title: "Flujo & Velocidad",
        description:
          "Coreografía de barra, limpieza en movimiento y servicio ágil con música y buena vibra.",
        actionLabel: "Ver más",
        actionTo: "/cursos/flujo",
      },
    ],
  },
  advisory: {
    id: advisorySectionId,
    eyebrow: "Consultoría 1:1 · David Reyes",
    title: "Barras con criterio,\nflujo y carácter.",
    description:
      "Acompaño a cafeterías independientes desde el diseño ergonómico de la barra hasta la calibración diaria de espresso y el entrenamiento de equipo.",
    imageSrc: "/asesoria.png",
    imageAlt: "Cafetería de especialidad con barra de madera",
    scopeEyebrow: "Alcance del proyecto",
    scopeTitle: "Áreas a trabajar",
    areas: [
      {
        id: "infraestructura",
        index: "01",
        label: "Infraestructura",
        title: "Apertura de Barra",
        description: "Equipamiento, filtración y ergonomía.",
      },
      {
        id: "producto",
        index: "02",
        label: "Producto",
        title: "Carta & Recetas",
        description: "Menú de especialidad y costeo por taza.",
      },
      {
        id: "equipo",
        index: "03",
        label: "Equipo",
        title: "Entrenamiento",
        description: "Consistencia y ritmo en horas pico.",
      },
      {
        id: "auditoria",
        index: "04",
        label: "Auditoría",
        title: "Control de Calidad",
        description: "Diagnóstico de extracción y mantenimiento.",
      },
    ],
  },
  footer: {
    label: "Pie de página",
    note: "Cursos prácticos y asesorías de café en Buenos Aires.",
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
