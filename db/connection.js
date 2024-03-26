import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const c = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Connected to DB: ${c.connection.host}`)
  } catch (error) {
    // throw new Error(`Error: ${error.message}`)
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
