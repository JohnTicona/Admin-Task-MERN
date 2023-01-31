import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../../components/Alert'
import clientAxios from '../../config/clientAxios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlert({
        msg: 'El email es obligatorio',
        error: true
      })
    }

    try {
      const { data } = await clientAxios.post('/users/forgot-password', { email })
      setAlert({
        msg: data.msg,
        error: false
      })
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
        Recupera tu acceso y no pierdas tus
        <span className='text-slate-700'> proyectos</span>
      </h1>

      {alert.msg && <Alert alert={alert} />}

      <form onSubmit={handleSubmit} className='my-8 bg-white shadow rounded-lg px-10 p-10 '>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-lg text-gray-600 font-bold block uppercase'
          >
            Email:
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type='submit'
          value='Enviar instrucciones'
          className='bg-emerald-600 w-full text-white uppercase font-bold rounded-md py-3 hover:cursor-pointer hover:bg-emerald-700 transition-colors mt-3'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/'
          className='block text-center text-slate-500 text-sm font-bold'
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to='/registrar'
          className='block text-center text-slate-500 text-sm font-bold'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword
