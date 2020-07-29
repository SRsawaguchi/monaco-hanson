import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueHotkey from 'v-hotkey'

Vue.config.productionTip = false
Vue.use(VueHotkey)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
