import colors from 'colors'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import createDatabaseConnection from './database/mongo.js'
import routes from './routes/index.js'
// import rateLimit from './middlewares/rateLimit.middleware.js'
import maintenanceMode from './middlewares/maintenance.middleware.js'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(maintenanceMode)
// app.use(rateLimit)
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', routes)
app.use('/images', express.static(path.join(__dirname, '../public/images')))

app.listen(PORT, HOST, () => {
  console.log(colors.blue(`[ ✔︎ ] Server has started on port [${PORT}]`))
  console.log(colors.blue(`[ ✔︎ ] Server has started on the endpoint [http://${HOST}:${PORT}/api/]`))
})

createDatabaseConnection()
