import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  const { user } = useSelector(state => state.authState)

  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
      <p className='text-xl font-bold'>Hola: {user.name}</p>

      <Link
        className='bg-emerald-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
        to='crear-proyecto'
      >
        Nuevo Proyecto
      </Link>
    </aside>
  )
}
