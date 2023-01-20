import express from 'express'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
// connecting the database
connectDb()

const app = express()
app.use(express.json())

// we define the routes
app.use('/users', userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
