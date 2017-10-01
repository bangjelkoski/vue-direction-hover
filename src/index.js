import VueDirectionHover from './components/VueDirectionHover.vue'
import VueDirectionHoverItem from './components/VueDirectionHoverItem.vue'

// Install the components
export function install (Vue) {
  Vue.component('vue-dh', VueDirectionHover)
  Vue.component('vue-dh-item', VueDirectionHoverItem)
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
