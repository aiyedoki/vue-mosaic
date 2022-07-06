import VmSpan from './components/vm-span/index.vue'
import VmImg from './components/vm-img/index.vue'

const components = [VmSpan, VmImg]

export default {
  install: (app, options) => {
    components.forEach(item => {
      app.component(item.name, item)
    })
  }
}
