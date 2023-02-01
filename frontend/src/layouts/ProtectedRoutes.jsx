import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoutes = () => {
  const { user, loading } = useSelector(state => state.authState)

  if (loading) {
    return 'loading'
  }

  return (
    <div>
      <h1>ProtectedPath</h1>
      {user._id ? <Outlet /> : <Navigate to='/' />}
    </div>
  )
}
