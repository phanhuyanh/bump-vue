export default {
  install(Vue) {
    const Bump = () => import('./Bump.vue')
    Vue.component('bump', Bump)
  }
}
