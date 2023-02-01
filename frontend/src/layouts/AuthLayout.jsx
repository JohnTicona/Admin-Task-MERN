import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export const AuthLayout = () => {
  const { user } = useSelector(state => state.authState)

  if (user._id) {
    return <Navigate to='/proyectos' />
  }

  return (
    <>
      <main className='min-h-screen flex justify-center items-center p-5'>
        <div className='md:w-2/3 lg:w-2/5 2xl:w-2/6'>
          <Outlet />
        </div>
      </main>
    </>
  )
}
