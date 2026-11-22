import type { Route } from "./+types/home";
import { HeroSection } from "~/components/organisms";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cafetera" },
    {
      name: "description",
      content: "Secuencia de frames de una cafetera reproducida con el scroll.",
    },
  ];
}

export default function Home() {
  return (
    <main>
      <HeroSection
        title="¡Bienvenido! ¿Preparamos algo?"
        description="Me dedico a compartir lo que sé de café a través de cursos prácticos y asesorías. Dime qué necesitas y arrancamos."
        action={{ label: "Tomemos un café", to: "/contacto" }}
        imageLabel="Secuencia de la cafetera controlada con el scroll"
      />
      <section className="flex min-h-[40vh] items-center justify-center px-6 py-24">
        <p className="max-w-md text-center text-lg text-silver">
          Fin de la secuencia. Volvé hacia arriba para verla de nuevo.
        </p>
      </section>
    </main>
  );
}
