import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../slices/auth'
import { projectsSlice } from '../slices/projects/projectsSlice'

export const store = configureStore({
  reducer: {
    authState: authSlice.reducer,
    projectsState: projectsSlice.reducer
  }
})
