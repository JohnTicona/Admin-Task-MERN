import Project from '../models/Project.js'
import Task from '../models/Task.js'

const createTask = async (req, res) => {
  try {
    const { project } = req.body
    const { _id } = req.user

    const projectExists = await Project.findById(project)

    if (!projectExists) {
      const error = new Error('Proyecto no existe')
      return res.status(404).json({ msg: error.message })
    }

    if (projectExists.creator.toString() !== _id.toString()) {
      const error = new Error('No tienes los permisos para añadir tareas')
      return res.status(403).json({ msg: error.message })
    }

    const newTask = await Task.create(req.body)

    projectExists.tasks.push(newTask._id)
    await projectExists.save()

    res.status(201).json(newTask)
  } catch (error) {
    console.log(error)
  }
}

const getTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
      const error = new Error('Tarea no encontrada')
      return res.status(404).json({ msg: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(403).json({ msg: error.message })
    }

    res.status('200').json(task)
  } catch (error) {
    console.log(error)
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
      const error = new Error('Tarea no encontrada')
      return res.status(404).json({ msg: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(403).json({ msg: error.message })
    }

    task.name = req.body.name || task.name
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.deliveryDate = req.body.deliveryDate || task.deliveryDate

    const updateTask = await task.save()
    res.status(200).json(updateTask)
  } catch (error) {
    console.log(error)
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
      const error = new Error('Tarea no encontrada')
      return res.status(404).json({ msg: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(403).json({ msg: error.message })
    }

    const project = await Project.findById(task.project)
    project.tasks.pull(task._id)

    await Promise.allSettled([await project.save(), await task.deleteOne()])

    res.status(200).json({ msg: 'Tarea eliminada' })
  } catch (error) {
    console.log(error)
  }
}

const changeState = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id).populate('project')

    if (!task) {
      const error = new Error('Tarea no encontrada')
      return res.status(404).json({ msg: error.message })
    }

    if (task.project.creator.toString() !== req.user._id.toString()) {
      const error = new Error('Acción no válida')
      return res.status(403).json({ msg: error.message })
    }
    task.state = !task.state
    await task.save()
    res.status(200).json(task)
  } catch (error) {
    console.log(error)
  }
}

export {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  changeState
}
