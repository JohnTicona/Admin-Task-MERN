import express from 'express'
import connectDb from './config/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()
// connecting the database
connectDb()

const app = express()
app.use(express.json())

// we define the routes
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)
app.use('/tasks', taskRoutes)
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})
