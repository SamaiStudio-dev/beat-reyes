import portrait from "~/assets/retrato-david.png";
import yearsHighlight from "~/assets/6anios.png";
import baristasHighlight from "~/assets/120baristas.png";
import espressoImage from "~/assets/nathan-dumlao-KixfBEdyp64-unsplash.jpg";
import latteArtImage from "~/assets/jonas-jacobsson-RFHFV7lVQBY-unsplash.jpg";
import flowImage from "~/assets/karl-fredrickson-TYIzeCiZ_60-unsplash.jpg";
import footerEdge from "~/assets/bottom.png";
import heroGraffiti from "~/assets/grafiti-hero.svg";
import advisoryImage from "~/assets/cafeteria.jpeg";

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
      // { label: "Contacto", to: "/contacto" },
      // { label: "Herramientas y recursos", to: "/herramientas" },
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
      "Soy David Reyes. Nací en Colombia, pero fue acá en Buenos Aires donde me hice barista de verdad. Llevo más de seis años trabajando en cafeterías de especialidad, jugando con todo: desde calibrar una máquina espresso profesional hasta sacar lo mejor de una AeroPress o una italiana. Hoy vuelco toda esa experiencia en clases, catas y asesorías para que disfrutes el café sin vueltas.",
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
        imageSrc: advisoryImage,
        imageAlt: "Máquina de espresso en una cafetería",
        meta: "Presencial",
        title: "Barista inicial",
        description:
          "Primeros pasos en barra: molienda, espresso, leche y servicio para arrancar con criterio.",
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
          "Domina molienda, ratio de extracción y consistencia en horas pico sin recetas rígidas.",
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
          "Control de lanza de vapor, microespuma sedosa y vertido libre (corazón, rosetta y tulipán).",
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
          "Coreografía de barra, limpieza en movimiento y servicio ágil con música y buena vibra.",
        actionLabel: "Ver más",
        actionTo: "/cursos/flujo",
      },
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
  errors: {
    title: "Oops!",
    fallback: "Error",
    unexpected: "An unexpected error occurred.",
    notFoundTitle: "404",
    notFound: "The requested page could not be found.",
    frameNotFound: "Frame no encontrado",
  },
} as const;
