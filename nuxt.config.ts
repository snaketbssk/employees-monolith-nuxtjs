import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {

  server: {
    host: 'localhost', // '10.0.0.2', // default: localhost
    port: 8080 // default: 3000
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - employees-monolith-app',
    title: 'employees-monolith-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    // apiBaseUrl: env.apiBaseUrl,
    //  defaultLocale: env.defaultLocale
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   baseURL: 'https://10.0.0.2:5001'
  // },

  axios: {
    proxy: false
  },
  // proxy: {
  //   '/products_api/': { target: env.apiBaseUrl, changeOrigin: true, pathRewrite: { '^/products_api/': '/api/' } }
  // },

  // sitemap: {
  //   hostname: 'http://178.157.82.52',
  //   port: 1234,
  //   path: '/sitemap.xml',
  //   cacheTime: 1000 * 60 * 60 * 2,
  //   trailingSlash: true,
  //   // i18n: true,
  //   gzip: true,
  //   exclude: [],
  //   defaults: {
  //     changefreq: 'daily',
  //     priority: 1,
  //     lastmod: new Date()
  //   }
  // },

  optimizedImages: {
    optimizeImages: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#4E6EA1',
          accent: '#393982',
          secondary: '#ffe18d',
          success: '#217645',
          info: '#1976D2',
          warning: '#ab6100',
          error: '#b1260b',
          customDark: '#1d2741'
        },
        light: {
          primary: '#FF8A00',
          accent: '#fdc681',
          secondary: '#f3f3f3',
          success: '#4CAF50',
          info: '#82aad3',
          warning: '#ffe18d',
          error: '#FF5252'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

export default config
