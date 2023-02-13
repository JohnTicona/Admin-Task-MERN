import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Alert'
import { createProject, setCurrentProject, showAlert, updateProject } from '../../redux/slices/projects'
import { useNavigate, useParams } from 'react-router-dom'

export const FormProject = ({ currentProject }) => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    deliveryDate: '',
    client: ''
  })
  const { name, description, deliveryDate, client } = project

  const { id } = useParams()
  const navigate = useNavigate()

  const { alert } = useSelector(state => state.projectsState)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([name, description, deliveryDate, client].includes('')) {
      return dispatch(showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      }))
    }

    if (id) {
      await dispatch(updateProject({ ...project, id }, navigate))
    } else {
      await dispatch(createProject(project, navigate))
    }
    setProject({
      name: '',
      description: '',
      deliveryDate: '',
      client: ''
    })
  }

  useEffect(() => {
    if (id && currentProject.name) {
      setProject({
        name: currentProject.name,
        description: currentProject.description,
        deliveryDate: currentProject.deliveryDate.split('T')[0],
        client: currentProject.client
      })
    } else {
      dispatch(setCurrentProject({}))
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white py-8 px-6 w-full lg:w-1/2 rounded-lg shadow'
    >
      {alert.msg && <Alert alert={alert} />}
      <div className='mt-5 mb-5'>
        <label
          htmlFor='name'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Proyecto
        </label>
        <input
          id='name'
          name='name'
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del proyecto'
          value={name}
          onChange={handleChange}
        />
      </div>

      <div className='mb-3'>
        <label
          htmlFor='description'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Descripción
        </label>
        <textarea
          id='description'
          name='description'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Descripción del proyecto'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='delivery-date'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Fecha entrega
        </label>
        <input
          id='delivery-date'
          name='deliveryDate'
          type='date'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={deliveryDate}
          onChange={handleChange}
        />
      </div>

      <div className='mb-5'>
        <label
          htmlFor='client'
          className='text-gray-700 uppercase font-bold text-sm'
        >
          Cliente
        </label>
        <input
          id='client'
          name='client'
          type='text'
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          placeholder='Nombre del cliente'
          value={client}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className='bg-emerald-600 w-full p-3 uppercase font-bold text-white cursor-pointer rounded hover:bg-emerald-700 transition-colors'
        value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
      />
    </form>
  )
}
