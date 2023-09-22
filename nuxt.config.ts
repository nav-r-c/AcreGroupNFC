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
  devtools: { enabled: true },
  app: {
    head : {
      link : [
        {rel:"stylesheet", href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"},
      ]
    }
  }
})