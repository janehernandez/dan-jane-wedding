// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  experimental: { renderJsonPayloads: false },

  modules: ['@nuxt/eslint', '@nuxt/hints', '@nuxt/image', '@nuxt/scripts', '@nuxt/ui', '@nuxtjs/leaflet', 'nuxt-swiper', 'nuxt-mail'],

  css: ['~/assets/css/main.css'],

  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    ipx: {
      sharpOptions: {
        autoOrient: true,
      },
    },
  },

  nitro: {
    routeRules: {
      // Hashed build assets — immutable, cache forever
      '/_nuxt/**': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
      // Static images in public/
      '/images/**': {
        headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' },
      },
      // Root static files (hero-bg, bg, og-image, favicons)
      '/**/*.jpg': {
        headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' },
      },
      '/**/*.png': {
        headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' },
      },
      '/**/*.ico': {
        headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' },
      },
      '/**/*.svg': {
        headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' },
      },
      // Font files
      '/**/*.otf': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
      '/**/*.woff2': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
    },
  },

  app: {
    head: {
      title: 'Dan Jomel & Jane | May 16, 2026',
      meta: [
        { name: 'description', content: 'You are invited to the wedding of Dan Jomel & Jane — May 16, 2026. #JANEuineNaPagibigNiDAN' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Dan Jomel & Jane | Wedding Invitation' },
        { property: 'og:description', content: 'You are invited to the wedding of Dan Jomel & Jane — May 16, 2026. #JANEuineNaPagibigNiDAN' },
        { property: 'og:image', content: 'https://dan-jane-wedding.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://dan-jane-wedding.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Dan Jomel & Jane | Wedding Invitation' },
        { name: 'twitter:description', content: 'You are invited to the wedding of Dan Jomel & Jane — May 16, 2026.' },
        { name: 'twitter:image', content: 'https://dan-jane-wedding.com/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
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

  mail: {
    message: {
      to: process.env.NUXT_MAIL_TO || '',
    },
    smtp: {
      host: process.env.NUXT_MAIL_SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.NUXT_MAIL_SMTP_PORT) || 587,
      auth: {
        user: process.env.NUXT_MAIL_SMTP_USER || '',
        pass: process.env.NUXT_MAIL_SMTP_PASS || '',
      },
    },
  },

  runtimeConfig: {
    mailFrom: process.env.NUXT_MAIL_FROM || 'Dan & Jane Wedding <noreply@dan-jane-wedding.com>',
    rsvpUrl: process.env.NUXT_RSVP_URL || 'https://dan-jane-wedding.com',
    baseUrl: process.env.NUXT_BASE_URL || 'https://dan-jane-wedding.com',
    public: {
      googleSheetUrl: process.env.NUXT_PUBLIC_GOOGLE_SHEET_URL || ''
    }
  }
})