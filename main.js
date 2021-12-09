import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from 'vue'
import App from './App.vue'
import './style/main.sass'

import Bump from './src/plugin/bump.js'

Vue.config.productionTip = false

Vue.use(Bump)

new Vue({
  render: h => h(App)
}).$mount('#app')
