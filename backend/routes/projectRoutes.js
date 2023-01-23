import { Router } from 'express'
import {
  addCollaborator,
  deleteCollaborator,
  deleteProject,
  getProject,
  getProjects,
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

router.post('/add-collaborator/:id', checkAuth, addCollaborator)
router.post('/delete-collaborator/:id', checkAuth, deleteCollaborator)

export default router
