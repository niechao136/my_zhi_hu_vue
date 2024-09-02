import './assets/main.css'
import 'element-plus/dist/index.css'
import Element from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// VueQuill
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Element)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
