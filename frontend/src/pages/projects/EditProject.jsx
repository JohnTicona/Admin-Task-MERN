import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteProject, getProject } from '../../redux/slices/projects'
import { FormProject } from './FormProject'

export const EditProject = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { currentProject, loading } = useSelector(
    (state) => state.projectsState
  )
  const { _id, name } = currentProject

  useEffect(() => {
    if (id) {
      dispatch(getProject(id))
    }
  }, [])

  const handleClick = (id) => {
    dispatch(deleteProject(id, navigate))
  }

  if (loading) {
    return 'Cargando'
  }

  return (
    <>
      <div className='flex justify-between'>
        <div className='font-black text-4xl'>Editar Proyecto : {name}</div>
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
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
          </svg>

          <button onClick={() => handleClick(_id)} className='uppecase font-bold'>Eliminar</button>
        </div>
      </div>

      <div className='mt-10 flex justify-center'>
        <FormProject currentProject={currentProject} />
      </div>
    </>
  )
}
