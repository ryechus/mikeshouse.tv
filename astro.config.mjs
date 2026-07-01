import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
// import mixpanel from "astrojs-mixpanel";
import sitemap from "@astrojs/sitemap";

const serverIslandHostname =
  process.env.SERVER_ISLAND_HOSTNAME !== undefined
    ? process.env.SERVER_ISLAND_HOSTNAME
    : "";

// https://astro.build/config
export default defineConfig({
  site: "https://mikeshouse.tv",
  //   adapter: node({
  //     mode: "standalone",
  //   }),
  //   server: {
  //     allowedHosts: true,
  //   },
  //   build: {
  //     apiPrefix: "https://api.mikeshouse.tv",
  //   },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    // mixpanel({
    //   token: "507de4cce4c41aa7cd5639fe06b1b0cd",
    //   config: {
    //     track_pageview: false,
    //     persistence: "localStorage",
    //     batch_requests: true,
    //     debug: process.env.NODE_ENV === "development",
    //   },
    //   autoTrack: true,
    //   autocapture: true, // Enable automatic page view tracking
    // }),
    // svelte({
    //   extensions: [".svelte"],
    // }),
  ],
});
