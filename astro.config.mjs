import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import robots from "astro-robots";

const serverIslandHostname =
  process.env.SERVER_ISLAND_HOSTNAME !== undefined
    ? process.env.SERVER_ISLAND_HOSTNAME
    : "";

let site = "http://localhost:4321";
if (import.meta.env.MODE === "production") {
  site = "https://mikeshouse.tv";
}

// https://astro.build/config
export default defineConfig({
  site: site,
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
    svelte(),
    robots({
      host: "mikeshouse.tv",
      sitemap: [`${site}/sitemap.xml`],
      policy: [
        {
          userAgent: [
            "Applebot",
            "Googlebot",
            "bingbot",
            "Yandex",
            "Yeti",
            "Baiduspider",
            "360Spider",
            "*",
          ],
          allow: ["/"],
          disallow: ["/cart"],
          crawlDelay: 5,
          cleanParam: ["sid /", "s /forum/showthread"],
        },
        {
          userAgent: "BLEXBot",
          disallow: ["/assets", "/uploades/1989-08-21/*jpg$"],
        },
      ],
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Norwester",
      cssVariable: "--font-norwester",
    },
  ],
});
