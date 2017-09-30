import VueDirectionHover from './components/VueDirectionHover.vue'

// Install the components
export function install (Vue) {
  Vue.component('vue-direction-hover', VueDirectionHover)
}

export {
  VueDirectionHover,
}

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install,
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
