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
    description: 'ミリシタのチーム編成とライブシミュレーションができるシンプルなツール。',
    'og:description': 'ミリシタのチーム編成とライブシミュレーションができるシンプルなツール。',
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
      { hid: 'description', name: 'description', content: 'ミリシタのチーム編成とライブシミュレーションができるシンプルなツール。' },
      { hid: 'keywords', name: 'keywords', content: 'ミリシタ スコア計算 編成 ミリオンライブ うしろのこ シミュ' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ミリシタスコア計算機' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://million-livesimulation-analyzer.netlify.com/' },
      { hid: 'og:title', property: 'og:title', content: 'ミリシタスコア計算機' },
      { hid: 'og:description', property: 'og:description', content: 'ミリシタのチーム編成とライブシミュレーションができるシンプルなツール。'}
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
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_UA_ID
    }]
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
    GA_UA_ID:process.env.GA_UA_ID,
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
