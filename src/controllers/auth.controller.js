import { signToken } from '../handlers/token/jwt.handle.js'
import { compare } from '../handlers/entrypt/encrypt.handle.js'
import models from '../models/index.js'
import responses from '../handlers/responses/index.js'

export const login = async (request, response) => {
  try {
    const { username, password } = request.body

    console.log(username)
    console.log(password)

    if (!username || !password) {
      console.log('El usuario y la contraseña son requeridos')
      return responses.errorResponse({ response, statusCode: 400, data: {}, message: 'El usuario y la contraseña son requeridos' })
    }

    const user = await models.userModel.findOne({ username })
    console.log(user)

    if (!user) {
      console.log('EL usuario no existe')
      return responses.errorResponse({ statusCode: 401, response, data: {}, message: 'El usuario no existe' })
    }

    if (user.status !== 'Activo') {
      console.log('El usuario no esta activo')
      return responses.errorResponse({ statusCode: 401, response, data: {}, message: 'El usuario no está activo' })
    }

    const isPasswordValid = await compare(password, user.password)
    console.log(isPasswordValid)

    if (!isPasswordValid) {
      console.log('La contraseña no es valida')
      return responses.errorResponse({ statusCode: 401, response, data: {}, message: 'La contraseña no es válida' })
    }

    user.lastLogin = new Date()

    await user.save()

    const token = await signToken(user)
    console.log(token)

    user.set('password', undefined, { strict: false })

    const employee = await models.employeeModel.findOne({
      _id: user.idEmployee.toString(),
      status: { $ne: 'Eliminado' }
    })
    console.log(employee)

    /* const employee = await models.employeeModel.findOne({ idBusiness: '66b3d110164d0000d5b8079c' }) */
    const business = await models.businessModel.findOne({
      _id: user.idBusiness.toString(),
      status: { $ne: 'Eliminado' }
    }).lean()

    console.log(business)

    if (!employee) {
      console.log('Empleado no encontrado')
      return responses.errorResponse({ statusCode: 403, response, data: {}, message: 'Empleado no encontrado' })
    }
    if (!business) {
      console.log('Negocio no encontrado')
      return responses.errorResponse({ statusCode: 403, response, data: {}, message: 'Negocio no encontrado' })
    }

    return responses.successResponse({ response, statusCode: 200, data: { user, token, employee, business } })
  } catch (error) {
    return responses.errorResponse({ response, statusCode: 500, data: {}, message: error.message })
  }
}
