/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    colors : {
      'alt-green' : '#208D0F',
      'primary-green' : '#004200',
      'circle-silver' : "#D3D3D3",
      'primary-gold' : '#C69320',
      'light-gold' : '#EEB60980' 
    },
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
}