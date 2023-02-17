import { useDispatch } from 'react-redux'
import {
  changeStateTask,
  deleteTask,
  setCurrentTask
} from '../../redux/slices/projects'
import { formatDate } from '../../helpers/formatDate'

export const Task = ({ task }) => {
  const { description, name, priority, deliveryDate, state } = task

  const dispatch = useDispatch()

  const handleDeleteTask = async (taskId) => {
    dispatch(deleteTask(taskId))
  }

  return (
    <div className='border-b p-5 flex justify-between'>
      <div>
        <p className='text-xl mb-1'>{name}</p>
        <p className='text-sm text-gray-500 uppercase mb-1'>{description}</p>
        <p className='text-sm mb-1'>{formatDate(deliveryDate)}</p>
        <p className='text-gray-600 mb-1'>{priority}</p>
      </div>

      <div className='flex gap-2 items-center'>
        <button
          onClick={() => {
            dispatch(setCurrentTask(task))
          }}
          className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        >
          Editar
        </button>

        <button
          onClick={() => dispatch(changeStateTask(task._id))}
          className={`${state ? 'bg-emerald-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
        >
          {state ? 'Completa' : 'Incompleta'}
        </button>

        <button
          onClick={() => handleDeleteTask(task._id)}
          className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
