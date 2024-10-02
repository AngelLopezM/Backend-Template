import rateLimit from 'express-rate-limit'

const minutes = 15
const requestLimit = 100

const limiter = rateLimit({
  windowMs: minutes * 60 * 1000,
  max: requestLimit,
  message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.'
})

export default limiter
