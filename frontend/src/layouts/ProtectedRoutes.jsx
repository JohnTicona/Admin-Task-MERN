import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export const ProtectedRoutes = () => {
  const { user, loading } = useSelector((state) => state.authState)

  if (loading) {
    return 'loading'
  }

  return (
    <div>
      {user._id
        ? (
          <div className='bg-gray-100'>
            <Header />

            <div className='md:flex md:min-h-screen '>
              <Sidebar />
              <main className='flex-1 p-5 md:p-10'>
                <Outlet />
              </main>
            </div>
          </div>
          )
        : <Navigate to='/' />}
    </div>
  )
}
