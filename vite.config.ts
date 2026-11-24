import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

const bundleGsapOnServer: Plugin = {
  name: "bundle-gsap-on-server",
  configEnvironment(name) {
    if (!name.startsWith("ssr")) return;
    return {
      resolve: {
        noExternal: ["gsap", "@gsap/react"],
      },
    };
  },
};

export default defineConfig({
  plugins: [tailwindcss(), bundleGsapOnServer, reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
