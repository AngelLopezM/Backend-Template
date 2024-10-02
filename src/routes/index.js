import fileSystem from 'fs'
import path from 'path'
import express from 'express'
import colors from 'colors'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const removeExtension = (file) => {
  const fileName = file.split('.').shift()
  return fileName
}

fileSystem.readdirSync(__dirname).filter((file) => {
  const fileName = removeExtension(file)
  return fileName !== 'index'
}).forEach((file) => {
  const fileName = removeExtension(file)
  import(`./${file}`).then((module) => {
    router.use(`/${fileName}`, module.default)
  }).catch((error) => {
    console.log(colors.red(`Error loading route ${fileName}: ${error}`))
  })
})

export default router
