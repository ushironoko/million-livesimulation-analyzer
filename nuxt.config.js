const pkg = require('./package')
require('dotenv').config()

module.exports = {
  mode:'spa',
  srcDir: 'app',

  /**
   * PWA manifests
   */
  manifest: {
    name: 'ミリシタスコア計算機',
    short_name: 'MSC',
    title: 'ミリシタスコア計算機',
    'og:title': 'ミリシタスコア計算機',
    description: 'ミリシタのライブスコア計算機。',
    'og:description': 'ミリシタのライブスコア計算機。',
    lang: 'ja',
    theme_color: '#24292D',
    background_color: '#e6ecf0'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'ミリシタスコア計算機',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ミリシタのライブスコア計算機。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ミリシタスコア計算機' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://millionlive-simple-score-calc.me/' },
      { hid: 'og:title', property: 'og:title', content: 'ミリシタスコア計算機' },
      { hid: 'og:description', property: 'og:description', content: 'ミリシタのライブスコア計算機。'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00adb8' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/localStorage'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_UA_ID
    }]
  ],

  /*
   ** dotenv module alies
   */
  env: {
    FIREBASE_V1_CARDS_SSR_ENDPOINT:process.env.FIREBASE_V1_CARDS_SSR_ENDPOINT,
    MEGMEGWORK_API_ENDPOINT:process.env.MEGMEGWORK_API_ENDPOINT,
    MATSURIHIME_ICON:process.env.MATSURIHIME_ICON,
    GA_UA_ID:process.env.GA_UA_ID,
  },

  /*
   ** PWA module ops
   */
  workbox: {
    runtimeCaching: [
      {
        urlPattern: 'https:\/\/storage.matsurihi.me\/mltd/icon_l\/*',
        handler: 'staleWhileRevalidate'
      }
    ]
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
