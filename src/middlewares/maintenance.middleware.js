import responses from '../handlers/responses/index.js'
const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'

const maintenanceMiddleware = (request, response, next) => {
  if (maintenanceMode) {
    return responses.errorResponse({ statusCode: 503, response, message: 'El servicio está en mantenimiento, por favor intenta más tarde.' })
  }
  next()
}

export default maintenanceMiddleware
