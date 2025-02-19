import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

const connectDB = async () => {
  let connected = false
  try {
    if (!connected) {
      await mongoose.connect(MONGODB_URI)
      connected = true
      console.log('Database Connected')
    }
  } catch (error) {
    connected = false
    console.log('Error connecting to database: ', error)
  }
}

export default connectDB
