import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetAuthState } from '../redux/slices/auth/authSlice'
import { resetProjectState } from '../redux/slices/projects'

export const Header = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(resetAuthState())
    dispatch(resetProjectState())
    window.localStorage.removeItem('token')
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-emerald-500 font-black text-center'>AdminTask</h2>

        {/* <input
          type='search'
          placeholder='Buscar Proyecto'
          className='rounded-lg lg:w-96 block p-2 border'
        /> */}
        <div className='flex items-center gap-6'>
          <Link to='/proyectos' className='font-bold uppercase'>Ver Proyectos</Link>

          <button onClick={handleLogout} type='button' className='text-white text-sm bg-emerald-600 p-3 rounded-md uppercase font-bold'>
            Cerrar Sesión
          </button>
        </div>
      </div>

    </header>
  )
}
