// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  alias: {
    "@scss": resolve(__dirname, "/assets/scss"),
    "@components": resolve(__dirname, "/components/"),
  },
});
