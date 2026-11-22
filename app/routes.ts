import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home/home.tsx"),
  route("frames/:name", "routes/frames.ts"),
] satisfies RouteConfig;
