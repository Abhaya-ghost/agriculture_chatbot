const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const chatRoutes = require('./routes/chatRoutes')

dotenv.config()
const app = express() 
const PORT = process.env.PORT || 4000

//middlewares
app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

//APIs
app.use('/', chatRoutes)