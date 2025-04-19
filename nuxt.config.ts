// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  alias: {
    "@scss": resolve(__dirname, "/assets/scss"),
    "@components": resolve(__dirname, "/components/"),
    "@pages": resolve(__dirname, "/pages/"),
  },
  css: ["@/assets/scss/themes.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/scss/main.scss" as *;@use "~/assets/scss/global/_reset.scss" as *;',
        },
      },
    },
  },
  modules: ["@nuxtjs/color-mode"],
  colorMode: {
    preference: "system",
    fallback: "light",
    globalName: "__NUXT_COLOR_MODE__",
    storage: "localStorage",
    storageKey: "theme-mode",
    classSuffix: "-theme",
  },
});
