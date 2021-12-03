import Vue from 'vue'
import App from './App.vue'
import Bump from './src/plugin/bump.js'

Vue.config.productionTip = false

Vue.use(Bump)

new Vue({
  render: h => h(App)
}).$mount('#app')
