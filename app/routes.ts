import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/home.tsx"),
  route("cursos", "pages/cursos/cursos.tsx"),
  route("frames/:name", "routes/frames.ts"),
] satisfies RouteConfig;
