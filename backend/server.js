import express from 'express'
import { PORT } from './config/config.js'
import connectDB from './config/database.js'
import userRouter from './routes/user.js'
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'https://mern-auth-frontend-2jo3.onrender.com'
}))

app.use('/api/user/', userRouter)
app.listen(PORT || 8000, async () => {
  console.log(`The server is running on http://localhost:${PORT}`)
  await connectDB()
})
