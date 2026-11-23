const aboutSectionId = "sobre-mi";

export const content = {
  brand: "David Reyes",
  homePath: "/",
  navigation: {
    label: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    links: [
      { label: "Sobre mí", to: `/#${aboutSectionId}` },
      { label: "Cursos", to: "/cursos" },
      { label: "Asesoría", to: "/asesoria" },
      { label: "Contacto", to: "/contacto" },
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
    title: "TÉCNICA REAL, BUENA ONDA.",
    description:
      "Soy David Reyes. Nací en Colombia, pero fue acá en Buenos Aires donde me hice barista de verdad. Llevo más de seis años trabajando en cafeterías de especialidad, jugando con todo: desde calibrar una máquina espresso profesional hasta sacar lo mejor de una AeroPress o una italiana. Hoy vuelco toda esa experiencia en clases, catas y asesorías para que disfrutes el café sin vueltas.",
    stats: [
      { value: "+6 AÑOS", label: "DE EXPERIENCIA REAL" },
      { value: "+120", label: "BARISTAS FORMADOS" }
    ],
  },
  courses: {
    metaTitle: "Cursos",
    metaDescription: "Cursos de café con David Reyes.",
    title: "Cursos",
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
