import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

//Routes
//Error handler

//Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})
