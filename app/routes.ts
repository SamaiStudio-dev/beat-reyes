import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/home.tsx"),
  route("cursos/:id", "pages/curso/curso.tsx"),
  route("herramientas", "pages/herramientas/herramientas.tsx"),
  route("herramientas/datos", "routes/drive-library.ts"),
  route("herramientas/archivo/:id", "routes/drive-file.ts"),
  route("frames/:name", "routes/frames.ts"),
] satisfies RouteConfig;
