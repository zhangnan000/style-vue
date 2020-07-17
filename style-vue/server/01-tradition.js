const express = require('express')
const app = express()

app.get('/',(req, res) => {
  res.send(
    `
      <html>
        <div>飞流直下三千尺</div>
        <div>疑似银河落九天</div>
      </html>
    `
  )
})

app.listen(3001, ()=> {
  console.log('启动成功')
})