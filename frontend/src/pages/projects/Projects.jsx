import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../redux/slices/projects'
import { PreviewProject } from './PreviewProject'

export const Projects = () => {
  const { projects } = useSelector((state) => state.projectsState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>
      <div className='bg-white shadow mt-10 rounded-lg'>
        {projects.length
          ? (
              projects.map((project) => (
                <PreviewProject key={project._id} project={project} />
              ))
            )
          : (
            <p className='text-center text-gray-600 uppercase p-5'>
              No hay proyectos
            </p>
            )}
      </div>
    </>
  )
}
