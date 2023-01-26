import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <h1 className='text-emerald-500 text-center font-black text-4xl md:text-5xl capitalize'>
        Inicia Sesión y administra tus
        <span className='text-slate-700'> proyectos</span>
      </h1>

      <form className='my-8 bg-white shadow rounded-lg px-10 p-10 '>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-lg text-gray-600 font-bold block uppercase'
          >
            Correo:
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='password'
            className='text-lg text-gray-600 font-bold block uppercase'
          >
            Contraseña:
          </label>
          <input
            id='password'
            type='password'
            placeholder='Contraseña de Registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>
        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-emerald-600 w-full text-white uppercase font-bold rounded-md py-3 hover:cursor-pointer hover:bg-emerald-700 transition-colors mt-3'
        />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
          to='/registrar'
          className='block text-center text-slate-500 text-sm font-bold'
        >
          ¿No tienes una cuenta? Regístrate
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

export default Login
