import { Router } from 'express'
import checkAuth from '../middleware/checkAuth.js'
import { createTask, getTask, updateTask, deleteTask, changeState } from '../controllers/taskController.js'

const router = Router()

router.post('/', checkAuth, createTask)

router
  .route('/:id')
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask)

router.post('/state/:id', checkAuth, changeState)

export default router
