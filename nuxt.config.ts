import { pwa } from './config/pwa'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@formkit/nuxt',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    experimental: {
      wasm: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
    storage: {
      fs: {
        driver: 'fs',
        base: './data',
      },
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'The only karaoke app you need.' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  // devServer: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'dev-certs', 'utapoi.com+4-key.pem'), { encoding: 'utf-8' }),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'dev-certs', 'utapoi.com+4.pem'), { encoding: 'utf-8' }),
  //   },
  //   url: 'https://localhost:3000',
  // },
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      DOMAIN: 'localhost',
      API_URL: 'https://localhost:7215', // 'http://localhost:5215',
    },
  },
})
