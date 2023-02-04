import clientAxios from '../../../config/clientAxios'
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
    } finally {
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
      dispatch(
        showAlert({
          msg: 'Proyecto creado correctamente',
          error: false
        })
      )
      setTimeout(() => {
        navigate('/proyectos')
      }, 3000)
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
      dispatch(
        showAlert({
          msg: 'Proyecto editado correctamente',
          error: false
        })
      )
      setTimeout(() => {
        navigate('/proyectos')
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProject = (id, navigate) => {
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
      await clientAxios.delete(`/projects/${id}`, config)
      await dispatch(setDeleteProject(id))
      navigate('/proyectos')
      // dispatch(
      //   showAlert({
      //     msg: 'Proyecto editado correctamente',
      //     error: false
      //   })
      // )
      // setTimeout(() => {
      // }, 3000)
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
