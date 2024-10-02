import colors from 'colors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const createDatabaseConnection = async () => {
  try {
    const DATABASE_URI = process.env.DATABASE_URI
    await mongoose.connect(DATABASE_URI)
    console.log(colors.blue('[ ✔︎ ] Database has been connected successfully'))
  } catch (error) {
    console.log(colors.red('[ ✘ ] Database cannot be connected: ' + error))
  }
}

export default createDatabaseConnection
