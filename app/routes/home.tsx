import type { Route } from "./+types/home";
import { CafeteraSequence } from "../cafetera-sequence";

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
      <CafeteraSequence />
      <section className="flex min-h-[40vh] items-center justify-center px-6 py-24">
        <p className="max-w-md text-center text-lg text-neutral-300">
          Fin de la secuencia. Volvé hacia arriba para verla de nuevo.
        </p>
      </section>
    </main>
  );
}
