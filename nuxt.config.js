import colors from 'vuetify/es5/util/colors'

export default {

  target: "server",
  mode: "spa",

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  dev: process.env.NODE_ENV !== 'production',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'myWMS',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/logo-spark.png'}
    ]
  },

  css: [
    "~/assets/styles.scss",
    "./node_modules/element-ui/packages/theme-chalk/src/table.scss",
  ],

  vendor: [
    'element-ui'
  ],

  babel: {
    "plugins": [["component", [
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-default"
      },
      'transform-async-to-generator',
      'transform-runtime'
    ]]],
    comments: true
  },

  plugins: [
    {src: "~/plugins/i18n.js"},
    {src: '@/plugins/vue-shortkey.js', mode: 'client'},
    {src: '~plugins/element-ui', ssr: true},
    "~/plugins/bus",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  /* Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules */
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    'nuxt-element-ui',
    {src: '@nuxtjs/pwa', options: {icon: {sizes: [512, 192, 380]}}}
  ],

  elementUI: {
    components: ['Button', 'Table'],
    locale: 'pt', //TODO
  },

  pwa: {
    manifest: {
      theme_color: "#3B8070",
      background_color: '#3B8070',
      name: 'Vuetify UI',
      short_name: 'Vue UI',
      lang: 'pt',
      display: 'fullscreen',
      orientation: 'landscape',
      dir: 'ltr',
      useWebmanifestExtension: false,
      icon: [

      ],
    },
  },

  // router: {
  //   middleware: ['authentication']
  // },

  // serverMiddleware: ['~/middleware/authentication'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: '#1697f6',
          accent: '#424242',
          // back: '#424242',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          inputs: '#5d5d5d',
          background: '#faf',
        },

        light: {
          primary: '#1697f6',
          accent: '#ffffff',
          back: '#bdbdbd',
          blank: '#fafafa',
          inputs: '#ffffff',
          background: '#fafafa',
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: 8081,
    host: '0.0.0.0' // '0.0.0.0' localhost
  },

  axios: {
    baseURL: 'https://api.tracebox.com.br/dev/'
  },

  // autenticação
  /*auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/sessions', method: 'post', propertyName: 'token' },
          // logout: { url: '/sessions', method: 'delete' },
          user: { url: '/sessions/user', method: 'get', propertyName: 'token' },
        },
        token_type: ''
      }
    }
  }*/
}
