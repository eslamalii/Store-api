import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index'
import { errorHandler } from './middleware/errorHandler'
import { connectToDatabase } from './config/db'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

// Initialize database connection
connectToDatabase()

app.use('/api/v1', routes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
