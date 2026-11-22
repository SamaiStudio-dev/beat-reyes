export const content = {
  brand: "David Reyes",
  homePath: "/",
  navigation: {
    label: "Principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    links: [
      { label: "Sobre mí", to: "/sobre-mi" },
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
    heroActionLabel: "Tomemos un café",
    heroActionPath: "/contacto",
    heroImageLabel: "Secuencia de la cafetera controlada con el scroll",
    ending: "Fin de la secuencia. Volvé hacia arriba para verla de nuevo.",
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
