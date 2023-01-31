import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [validToken, setvalidToken] = useState(false)
  const [passwordModified, setPasswordModified] = useState(false)
  const [alert, setAlert] = useState({})

  const { token } = useParams()

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forgot-password/${token}`)
        setvalidToken(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      return setAlert({
        msg: 'La contraseña debe ser mínimo de 6 caracteres',
        error: true
      })
    }

    try {
      const url = `/users/forgot-password/${token}`
      const { data } = await clientAxios.post(url, { password })
      setAlert({
        msg: data.msg,
        error: false
      })

      setPasswordModified(true)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <h1 className='text-emerald-500 text-center font-black text-5xl capitalize'>
        Reestablece tu contraseña y recupera tu
        <span className='text-slate-700'> acceso</span>
      </h1>
      {alert.msg && <Alert alert={alert} />}

      {validToken && (
        <form onSubmit={handleSubmit} className='my-8 bg-white shadow rounded-lg px-10 p-10 '>
          <div className='mb-5'>
            <label
              htmlFor='password'
              className='text-base text-gray-600 font-bold block uppercase'
            >
              Nueva Contraseña:
            </label>
            <input
              id='password'
              type='password'
              placeholder='Escribe tu nueva contraseña'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type='submit'
            value='Guardar nueva contraseña'
            className='bg-emerald-600 w-full text-white uppercase font-bold rounded-md py-3 hover:cursor-pointer hover:bg-emerald-700 transition-colors mt-3'
          />
        </form>
      )}

      {passwordModified &&
        <Link
          to='/'
          className='text-2xl block text-center text-slate-500 font-bold mt-5'
        >Inicia Sesión
        </Link>}
    </>
  )
}

export default NewPassword
