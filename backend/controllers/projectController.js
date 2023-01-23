import Project from '../models/Project.js'

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user._id })
    res.status(200).json(projects)
  } catch (error) {
    console.log(error)
  }
}

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body)
    project.creator = req.user._id

    const newProject = await project.save()
    res.status(200).json(newProject)
  } catch (error) {
    console.log(error)
  }
}

const getProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)

    if (!project) {
      const error = new Error('Proyecto no encontrado')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(401).json({ msg: error.message })
    }
    res.status(200).json(project)
  } catch (error) {
    console.log(error)
  }
}

const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)

    if (!project) {
      const error = new Error('No encontrado')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(401).json({ msg: error.message })
    }

    project.name = req.body.name || project.name
    project.description = req.body.description || project.description
    project.deliveryDate = req.body.deliveryDate || project.deliveryDate
    project.client = req.body.client || project.client

    const updateProject = await project.save()
    res.status(200).json(updateProject)
  } catch (error) {
    console.log(error)
  }
}

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)

    if (!project) {
      const error = new Error('Proyecto no encontrado')
      return res.status(404).json({ msg: error.message })
    }
    if (project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(401).json({ msg: error.message })
    }
    await project.deleteOne()
    res.json({ msg: 'Proyeto eliminado' })
  } catch (error) {
    console.log(error)
  }
}

const addCollaborator = async (req, res) => {}

const deleteCollaborator = async (req, res) => {}

const getTasks = async (req, res) => {}

export {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks
}
