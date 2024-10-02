import jwt from 'jsonwebtoken'
import responses from '../handlers/responses'

const jwtSecret = process.env.JWT_SECRET

const sessionMiddleware = (request, response, next) => {
  const token = request.headers.authorization?.split(' ')[1]

  if (!token) {
    return responses.errorResponse({ statusCode: 401, response, message: 'Toekn no proporcionado.' })
  }

  try {
    const verified = jwt.verify(token, jwtSecret)
    request.user = verified
    next()
  } catch (error) {
    return responses.errorResponse({ statusCode: 401, response, message: 'Token no válido.' })
  }
}

export default sessionMiddleware
