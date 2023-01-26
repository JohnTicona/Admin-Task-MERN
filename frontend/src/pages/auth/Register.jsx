import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  })

  const { name, email, password, repeatPassword } = userForm

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if ([name, email, password, repeatPassword].includes('')) {
      console.log('error')
    }
  }

  return (
    <>
      <h1 className='text-emerald-500 text-center font-black text-4xl capitalize'>
        Crea tu cuenta y administra tus
        <span className='text-slate-700'> proyectos</span>
      </h1>

      <form onSubmit={handleSubmit} className='my-8 bg-white shadow rounded-lg px-10 p-10 '>
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='text-base text-gray-600 font-bold block uppercase'
          >
            Nombre:
          </label>
          <input
            id='name'
            name='name'
            type='text'
            placeholder='Tu nombre'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-base text-gray-600 font-bold block uppercase'
          >
            Correo:
          </label>
          <input
            id='email'
            name='email'
            type='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='text-base text-gray-600 font-bold block uppercase'
          >
            Contraseña:
          </label>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Contraseña de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password2'
            className='text-base text-gray-600 font-bold block uppercase'
          >
            Repetir contraseña:
          </label>
          <input
            id='password2'
            name='repeatPassword'
            type='password'
            placeholder='Repite tu contraseña'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            value={repeatPassword}
            onChange={handleChange}
          />
        </div>
        <input
          type='submit'
          value='Crear Cuenta'
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
          to='/olvide-password'
          className='block text-center my-5 lg:my-0 text-slate-500 text-sm font-bold'
        >
          Olvide mi contraseña
        </Link>
      </nav>
    </>
  )
}

export default Register
