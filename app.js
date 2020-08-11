require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./src/routes/index')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/api/v1/', routes)

app.use((req, res) => {
  res.status(404)
  res.send({
    error: {
      status: 404,
      message: 'URL Not Found'
    }
  })
})

const port = process.env.port
app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})
