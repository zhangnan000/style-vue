import { createApp } from "./main"
export default context => {
  const {app, router, store} = createApp(context)
  return new Promise((resolve, reject) => {
    router.push(context.url)

    // 等待路由就绪
    router.onReady(() => {
      const comps = router.getMatchedComponents()
      Promise.all(comps.map(comp => {
        if (comp.asyncData) {
          return comp.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      })
      .catch(reject)
    }, reject)
  })
}