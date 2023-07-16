// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@element-plus/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],
  colorMode: {
    classSuffix: "",
  },
});
