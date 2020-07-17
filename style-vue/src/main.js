import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

Vue.config.productionTip = false

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      })
    }
  }
})

// 需要每个请求返回一个Vue实例
export function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  })
  return {app, router, store}
}

