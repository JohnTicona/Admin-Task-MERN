import { Router } from 'express'
import {
  addCollaborator,
  deleteCollaborator,
  deleteProject,
  getProject,
  getProjects,
  getTasks,
  createProject,
  updateProject
} from '../controllers/projectController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = Router()

//
router
  .route('/')
  .get(checkAuth, getProjects)
  .post(checkAuth, createProject)

router
  .route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, updateProject)
  .delete(checkAuth, deleteProject)

router.get('/task/:id', checkAuth, getTasks)
router.post('/add-collaborator/:id', checkAuth, addCollaborator)
router.post('/delete-collaborator/:id', checkAuth, deleteCollaborator)

export default router
