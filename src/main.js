import Vue from 'vue'
import './plugins/components'
import vuetify from './plugins/vuetify'
import VueAxios from './plugins/axios'
import VueAuthenticate from 'vue-authenticate'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import VueCurrencyFilter from 'vue-currency-filter'
import VueLodash from 'vue-lodash'
import VueGeolocation from 'vue-browser-geolocation'
export const bus = new Vue()

Vue.use(VueGeolocation)
Vue.use(VueCurrencyFilter)
Vue.use(VueLodash)
Vue.use(VueAxios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://104.131.62.182:4000', // Your API domain

  providers: {
    google: {
      redirectUri: 'http://localhost:8080/dashboard' // Your client app URL
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
