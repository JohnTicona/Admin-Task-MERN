import clientAxios from '../../../config/clientAxios'
import Swal from 'sweetalert2'
import {
  setAlert,
  getProjects,
  setProjects,
  setCurrentProject,
  setLoading,
  setUpdateProject,
  setDeleteProject
} from './projectsSlice'

export const getAllProjects = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios('/projects', config)
      dispatch(getProjects(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getProject = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const token = window.localStorage.getItem('token')
      if (!token) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios(`/projects/${id}`, config)
      dispatch(setCurrentProject(data))
    } catch (error) {
      console.log(error)
      dispatch(setLoading(false))
    }
  }
}

export const createProject = (project, navigate) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios.post('/projects', project, config)
      dispatch(setProjects(data))
      await Swal.fire(
        'Éxito',
        'Proyecto creado correctamente',
        'success'
      )
      navigate('/proyectos')
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateProject = (project, navigate) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token')
      if (!token) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const { data } = await clientAxios.put(`/projects/${project.id}`, project, config)
      dispatch(setUpdateProject(data))
      await Swal.fire(
        'Actualizado',
        'Proyecto editado correctamente',
        'success'
      )
      navigate('/proyectos')
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProject = (id, navigate) => {
  return async (dispatch) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Un proyecto eliminado no se puede recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, eliminar!',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        const token = window.localStorage.getItem('token')
        if (!token) {
          return
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        await clientAxios.delete(`/projects/${id}`, config)
        await dispatch(setDeleteProject(id))

        await Swal.fire(
          'Éxito',
          'Proyecto eliminado correctamente',
          'success'
        )
        navigate('/proyectos')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const showAlert = (alert) => {
  return (dispatch) => {
    try {
      dispatch(setAlert(alert))
      setTimeout(() => {
        dispatch(setAlert({}))
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }
}
