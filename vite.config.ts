import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

// Automatically use the Vercel serverless preset when building on Vercel
if (process.env.VERCEL) {
  process.env.NITRO_PRESET = "vercel";
}

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    viteTsConfigPaths(),
  ],
});
