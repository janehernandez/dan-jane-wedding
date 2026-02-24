// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/hints', '@nuxt/image', '@nuxt/scripts', '@nuxt/ui', '@nuxtjs/leaflet', 'nuxt-swiper'],

  css: ['~/assets/css/main.css'],

  app: {
    baseURL: '/dan-jane-wedding/',
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap'
        }
      ]
    }
  },
 devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  runtimeConfig: {
    public: {
      googleSheetUrl: process.env.NUXT_PUBLIC_GOOGLE_SHEET_URL || ''
    }
  }
})