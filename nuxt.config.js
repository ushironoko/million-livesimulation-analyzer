const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode:'spa',
  srcDir: 'app',

  /**
   * PWA manifests
   */
  manifest: {
    name: 'MillionLive Team Analyzer',
    short_name: 'MTA',
    title: 'ミリシタチームアナライザー',
    'og:title': 'ミリシタチームアナライザー',
    description: 'ミリシタチームアナライザー',
    'og:description': 'ミリシタチームアナライザー',
    lang: 'ja',
    theme_color: '#00adb8',
    background_color: '#FAFAFA'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'ミリシタチームアナライザー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ea5b76' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/localStorage'

  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** dotenv module alies
   */
  env: {
    FIREBASE_V1_CARDS_SSR_ENDPOINT:process.env.FIREBASE_V1_CARDS_SSR_ENDPOINT,
    MEGMEGWORK_API_ENDPOINT:process.env.MEGMEGWORK_API_ENDPOINT,
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
