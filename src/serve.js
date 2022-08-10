const express = require('express')
const app = express()
app.use(express.static('example'))
app.listen(9898, () => {
  console.log('server start: http://localhost:9898/')
})