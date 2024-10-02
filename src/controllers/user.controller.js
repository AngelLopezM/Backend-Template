import models from '../models/index.js'
import { encrypt } from '../handlers/entrypt/encrypt.handle.js'
import responses from '../handlers/responses/index.js'

export const getUser = async (request, response) => {
  try {
    const { id } = request.params
    const user = await models.userModel.findOne({ _id: id })

    const businesses = await models.businessModel.find({
      ownerId: id,
      status: { $ne: 'Eliminado' }
    })

    const userData = {
      ...user.toObject(),
      businesses
    }

    responses.successResponse({ statusCode: 200, response, data: userData })
  } catch (error) {
    responses.errorResponse({ statusCode: 500, response, message: error.message })
  }
}

export const getUsers = async (request, response) => {
  try {
    const data = await models.userModel.find()

    responses.successResponse({ statusCode: 200, response, data })
  } catch (error) {
    responses.errorResponse({ statusCode: 500, response, message: error.message })
  }
}

export const getUsersBySearch = async (request, response) => {
  try {
    const { search } = request.params
    const query = {}

    if (search) {
      query.name = { $regex: new RegExp(search, 'i') }
    }

    const data = await models.userModel.find(query)

    responses.successResponse({ statusCode: 200, response, data })
  } catch (error) {
    responses.errorResponse({ statusCode: 500, response, message: error.message })
  }
}

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params

    const data = await models.userModel.findByIdAndUpdate(
      id,
      { status: 'Eliminado' },
      { new: true }
    )

    if (!data) {
      return responses.errorResponse({ statusCode: 404, response, message: 'Usuario no encontrado' })
    }

    responses.successResponse({ statusCode: 200, response, data })
  } catch (error) {
    responses.errorResponse({ statusCode: 500, response, message: error.message })
  }
}

export const updateUser = async (request, response) => {
  try {
    const { id } = request.params
    const updateFields = { ...request.body }

    const data = await models.userModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )

    if (!data) {
      return responses.errorResponse({ statusCode: 404, response, message: 'Usuario no encontrado' })
    }

    responses.successResponse({ statusCode: 201, response, data })
  } catch (error) {
    console.log(error)
    responses.errorResponse({ statusCode: 500, response, message: error.message })
  }
}

export const updatePassword = async (request, response) => {
  try {
    const { id } = request.params
    const { password } = request.body

    if (!password) {
      return responses.errorResponse({ response, statusCode: 400, message: 'La nueva contraseña es requerida' })
    }

    const encryptedPassword = await encrypt(password)

    const data = await models.userModel.findByIdAndUpdate(
      id,
      { password: encryptedPassword },
      { new: true }
    )

    if (!data) {
      return responses.errorResponse({ statusCode: 404, response, message: 'Usuario no encontrado' })
    }

    responses.successResponse({ statusCode: 201, response, data })
  } catch (error) {
    console.log(error)
    responses.errorResponse({ statusCode: 500, response, message: error.message })
  }
}
