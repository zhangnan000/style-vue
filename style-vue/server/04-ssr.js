const express = require('express')

const app = express()

// 获取绝对地址
const resolve = dir => require('path').resolve(__dirname, dir)

// 静态文件服务
// 开发dist/client目录，关闭默认的index页面打开功能
app.use(express.static(resolve('../dist/client'), {index: false}))

// 创建渲染器
const { createBundleRenderer } = require('vue-server-renderer')

const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: require('fs').readFileSync(resolve('../public/index.html'), "utf-8"),
  clientManifest: require(resolve('../dist/client/vue-ssr-client-manifest.json'))
})
console.log(renderer,'renderer')
// 只做一件事，渲染
app.get('*', async(req, res) => {

  try {
    const context = {
      url: req.url
    }
    console.log(context,'context')
    // 渲染：得到html字符串
    const html = await renderer.renderToString(context)
    console.log(html,'html')
    // 发送回前端
    res.send(html)
  } catch (error) {
    res.status(500).send('服务器内部错误')
  }
})

// 监听端口
app.listen(3001)