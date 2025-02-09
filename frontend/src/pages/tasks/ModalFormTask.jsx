import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { createTask, setAlert, setModal, updateTask } from '../../redux/slices/projects'
import Alert from '../../components/Alert'
import { useParams } from 'react-router-dom'

const PRIORITY = ['Baja', 'Media', 'Alta']

export const ModalFormTask = () => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    priority: '',
    deliveryDate: ''
  })
  const { name, description, priority, deliveryDate } = task

  const { modal, alert, currentTask } = useSelector(
    (state) => state.projectsState
  )
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    if (currentTask?._id) {
      return setTask({
        name: currentTask.name,
        description: currentTask.description,
        priority: currentTask.priority,
        deliveryDate: currentTask.deliveryDate.split('T')[0]
      })
    }
    setTask({
      name: '',
      description: '',
      priority: '',
      deliveryDate: ''
    })
  }, [currentTask])

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([name, description, priority].includes('')) {
      return dispatch(
        setAlert({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
      )
    }

    if (currentTask?._id) {
      await dispatch(updateTask({ ...task, id: currentTask._id, project: id }))
    } else {
      await dispatch(createTask({ ...task, project: id }))
    }

    setTask({
      name: '',
      description: '',
      priority: '',
      deliveryDate: ''
    })
  }

  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={() => {
          dispatch(setModal())
        }}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
              <div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
                <button
                  type='button'
                  className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() => dispatch(setModal(false))}
                >
                  <span className='sr-only'>Cerrar</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>

              <div className='sm:flex sm:items-start'>
                <div className='mt-3 sm:mt-0 sm:ml-4 w-full'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg uppercase leading-6 font-bold text-gray-900 mb-5'
                  >
                    {currentTask._id ? 'Editar Tarea' : 'Crear tarea'}
                  </Dialog.Title>

                  {alert.msg && <Alert alert={alert} />}
                  <form className='my-5' onSubmit={handleSubmit}>
                    <div className='mb-5'>
                      <label
                        htmlFor='name'
                        className='text-gray-700 uppercase text-sm font-bold'
                      >
                        Nombre Tarea:
                      </label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Nombre de la tarea'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className='mb-5'>
                      <label
                        htmlFor='description'
                        className='text-gray-700 uppercase text-sm font-bold'
                      >
                        Descripción Tarea
                      </label>
                      <textarea
                        id='description'
                        name='description'
                        placeholder='Descripción de la Tarea'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={description}
                        onChange={handleChange}
                      />
                    </div>

                    <div className='mb-5'>
                      <label
                        htmlFor='deliveryDate'
                        className='text-gray-700 uppercase text-sm font-bold'
                      >
                        Fecha de entrega:
                      </label>
                      <input
                        type='date'
                        id='deliveryDate'
                        name='deliveryDate'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={deliveryDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className='mb-6'>
                      <label
                        htmlFor='priority'
                        className='text-gray-700 uppercase text-sm font-bold'
                      >
                        Prioridad:
                      </label>
                      <select
                        id='priority'
                        name='priority'
                        placeholder='Descripción de la Tarea'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={priority}
                        onChange={handleChange}
                      >
                        <option value=''>-- Seleccionar --</option>
                        {PRIORITY.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type='submit'
                      className='bg-emerald-600 hover:bg-emerald-700 text-white w-full font-bold cursor-pointer transition-colors rounded p-3 uppercase'
                      value={currentTask._id ? 'Guardar cambios' : 'Crear tarea'}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
