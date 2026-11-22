import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("frames/:name", "routes/frames.ts"),
] satisfies RouteConfig;
