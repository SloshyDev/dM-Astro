// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'
import node from "@astrojs/node";



import react from "@astrojs/react";



// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: "standalone" }),
  image: {
    domains: ["api.sloshy.cloud"],
  },
  build: {
      inlineStylesheets: "always"
  },

  i18n:{
      locales:["es","en"],
      defaultLocale: "en"
  },

  vite:{
      plugins: [tailwindcss()]
  },

  integrations: [react()]
});
