import express from 'express'
import cors from 'cors'
import connectDB from './db/connectDB.js'
import { getAllTasks, filterTask } from './controller/task.js'
import validateEnumFields from './middleware/validateEnumField.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
const port = 3002

// middleware
app.use(express.json())
app.use(cors())

connectDB()

app.get('/api/task', getAllTasks)
app.get('/api/task/filter', validateEnumFields, filterTask)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Server run on port', port)
})
