const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./db/routes')

const db = require('./db/connection')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.options('/api/*', cors())

app.all('/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.send('Online')
})

app.use('/api', router)

const apiPort = 8000

app.listen(process.env.PORT || apiPort, () => console.log(`Server running on port ${apiPort}`))
