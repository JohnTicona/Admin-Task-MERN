import { Router } from 'express'
import { authenticateUser, registerUser } from '../controllers/userController.js'

const router = Router()

router.post('/', registerUser)
router.post('/login', authenticateUser)

export default router
