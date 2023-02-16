import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  alert: {},
  currentProject: {},
  currentTask: {},
  loading: false,
  modal: false,
  modalDelete: false,
  idDeleteTask: ''
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = action.payload
      state.currentProject = {}
    },
    setProjects: (state, action) => {
      state.projects.push(action.payload)
    },
    setUpdateProject: (state, action) => {
      state.projects = state.projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      )
    },
    setDeleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      )
    },
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setModal: (state) => {
      state.modal = !state.modal
      state.alert = {}
      state.currentTask = {}
    },
    setTasks: (state, action) => {
      state.currentProject.tasks = [
        ...state.currentProject.tasks,
        action.payload
      ]
      state.modal = false
    },
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload
      state.modal = true
    },
    setUpdateTask: (state, action) => {
      state.currentProject = {
        ...state.currentProject,
        tasks: state.currentProject.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        )
      }
      state.modal = false
    },
    setDeleteTask: (state, action) => {
      state.currentProject = {
        ...state.currentProject,
        tasks: state.currentProject.tasks.filter(
          (task) => task._id !== action.payload
        )
      }
    }
  }
})

export const {
  setProjects,
  getProjects,
  setAlert,
  setCurrentProject,
  setLoading,
  setUpdateProject,
  setDeleteProject,
  setModal,
  setTasks,
  setCurrentTask,
  setUpdateTask,
  setDeleteTask
} = projectsSlice.actions
