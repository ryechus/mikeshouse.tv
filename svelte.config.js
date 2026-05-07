import { vitePreprocess } from "@astrojs/svelte";

export default {
  preprocess: vitePreprocess(),
  extensions: [".svelte"],
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};
