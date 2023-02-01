
import clientAxios from '../../../config/clientAxios'
import { setAlert, setAuth, setLoading } from './authSlice'

export const AuthUser = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return dispatch(setLoading(false))
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await clientAxios('/users/profile', config)
      dispatch(setAuth(data))
      dispatch(setLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(setAuth({
        _id: '',
        name: '',
        email: ''
      }))
      dispatch(setLoading(false))
    }
  }
}

export const LoginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.post('/users/login', { email, password })
      window.localStorage.setItem('token', data.token)
      dispatch(setAuth({ _id: data._id, name: data.name, email: data.email }))
    } catch (error) {
      dispatch(setAlert({
        msg: error.response.data.msg,
        error: true
      }))
    }
  }
}

export const RegisterUser = (name, email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.post('/users', { name, email, password })
      dispatch(setAlert({
        msg: data.msg,
        error: false
      }))
    } catch (error) {
      dispatch(setAlert({
        msg: error.response.data.msg,
        error: true
      }))
    }
  }
}

export const ConfirmUserAccount = (token) => {
  return async (dispatch) => {
    try {
      const url = `/users/check/${token}`
      const { data } = await clientAxios.get(url)
      dispatch(setAlert({
        msg: data.msg,
        error: false
      }))
    } catch (error) {
      dispatch(setAlert({
        msg: 'Error al confirmar la cuenta',
        error: true
      }))
    }
  }
}

export const ForgotAccountPassword = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.post('/users/forgot-password', { email })
      dispatch(setAlert({
        msg: data.msg,
        error: false
      }))
    } catch (error) {
      dispatch(setAlert({
        msg: error.response.data.msg,
        error: true
      }))
    }
  }
}

export const CheckToken = (token) => {
  return async (dispatch) => {
    try {
      await clientAxios(`/users/forgot-password/${token}`)
      dispatch(setAlert({}))
    } catch (error) {
      dispatch(setAlert({
        msg: error.response.data.msg,
        error: true
      }))
    }
  }
}

export const ChangePassword = (token, password) => {
  return async (dispatch) => {
    try {
      const url = `/users/forgot-password/${token}`
      const { data } = await clientAxios.post(url, { password })
      dispatch(setAlert({
        msg: data.msg,
        error: false
      }))
    } catch (error) {
      dispatch(setAlert({
        msg: error.response.data.msg,
        error: true
      }))
    }
  }
}
