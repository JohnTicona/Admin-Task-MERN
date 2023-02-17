import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    _id: '',
    name: '',
    email: ''
  },
  loading: true,
  alert: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload
      state.alert = {}
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAlert: (state, action) => {
      state.alert = action.payload
    },
    resetAuthState: (state) => {
      state.user = {
        _id: '',
        name: '',
        email: ''
      }
    }
  }
})

export const { setAuth, setLoading, setAlert, resetAuthState } = authSlice.actions
