import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../../redux/slices/projects'

export const Project = () => {
  const { id } = useParams()

  const { currentProject, loading } = useSelector(
    (state) => state.projectsState
  )
  const { name } = currentProject

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getProject(id))
    }
  }, [])

  if (loading) {
    return 'Cargando'
  }

  return (
    <div className='flex justify-between'>
      <h1 className='font-black text-4xl'>{name}</h1>
      <div className='flex gap-1 items-center text-gray-600 hover:text-black'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
          />
        </svg>
        <Link to={`/proyectos/editar/${id}`} className='uppercase font-bold'>
          Editar
        </Link>
      </div>
    </div>
  )
}
