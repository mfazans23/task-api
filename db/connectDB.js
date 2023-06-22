import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://scienfilixfz:mfazans23@cluster0.iilpqj0.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('Database connected...')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

export default connectDB
