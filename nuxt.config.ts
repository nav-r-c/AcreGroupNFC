// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css : [
    '~/assets/main.css',
    '~/assets/fonts/Roboto.css'
  ], 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true }
})