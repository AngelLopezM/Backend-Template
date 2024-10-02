import express from 'express'
import { getUser, getUsers, getUsersBySearch, deleteUser, updateUser, updatePassword } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/search/:search', getUsersBySearch)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
router.patch('/:id/updatePassword', updatePassword)

export default router
