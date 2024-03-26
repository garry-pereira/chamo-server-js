import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.PORT || 3000
import { handleDNE, handleError } from './middleware/error.js'
import connectDB from './db/connection.js'
import userRoute from './routes/user.js'

const app = express()

app.use(handleDNE)
app.use(handleError)
connectDB()
app.use(bodyParser.json())
app.use('/api/v1/user', userRoute)

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port)

// return proper status codes
