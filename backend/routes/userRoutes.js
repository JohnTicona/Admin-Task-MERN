import { Router } from 'express'
import { authenticateUser, registerUser, confirm, forgotPassword, checkToken, newPassword, profile } from '../controllers/userController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = Router()

// register user
router.post('/', registerUser)
// login usser
router.post('/login', authenticateUser)
// confirm account via token
router.get('/check/:token', confirm)
// request token to change password
router.post('/forgot-password', forgotPassword)
// validate token and change password
router.route('/forgot-password/:token').get(checkToken).post(newPassword)

// get user profile
router.get('/profile', checkAuth, profile)

export default router
