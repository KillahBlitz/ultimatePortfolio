export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  nitro: {
    preset: 'netlify-static',
    output: {
      publicDir: '.output/public'
    }
  },
  hooks: {
    'close': async () => {
      const { closeDatabase } = await import('./server/utils/db')
      await closeDatabase()
    },
    'nitro:init'(nitro) {
      nitro.hooks.hook('close', async () => {
        const { closeDatabase } = await import('./server/utils/db')
        await closeDatabase()
      })
    }
  },
  components: [
    {
      path: '~/components',
      extensions: ['.vue']
    }
  ],
  app: {
    head: {
      title: 'Jacobo Monroy | Portfolio',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Jacobo Monroy - Computer Engineering & Jr FullStack Developer Portfolio' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/favicon.jpg' }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js',
          defer: true
        }
      ]
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/css/base.css',
    '~/assets/css/glass-system.css'
  ],
  runtimeConfig: {
    mongoUrl: process.env.VITE_MONGO_URL || process.env.MONGO_URL || '',
    public: {
      emailjsPublicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY || '',
      emailjsServiceId: process.env.VITE_EMAILJS_SERVICE_ID || process.env.EMAILJS_SERVICE_ID || '',
      emailjsTemplateId: process.env.VITE_EMAILJS_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID || ''
    }
  }
})
