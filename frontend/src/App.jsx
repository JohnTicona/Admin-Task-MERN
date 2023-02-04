import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthUser } from './redux/slices/auth'
import { useDispatch } from 'react-redux'

import { AuthLayout, ProtectedRoutes } from './layouts'
import { Login, Register, ConfirmAcount, ForgotPassword, NewPassword } from './pages/auth'
import { Projects, Project, NewProject, EditProject } from './pages/projects'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(AuthUser())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Register />} />
          <Route path='olvide-password' element={<ForgotPassword />} />
          <Route path='olvide-password/:token' element={<NewPassword />} />
          <Route path='confirmar/:token' element={<ConfirmAcount />} />
        </Route>
        <Route path='/proyectos' element={<ProtectedRoutes />}>
          <Route index element={<Projects />} />
          <Route path='crear-proyecto' element={<NewProject />} />
          <Route path=':id' element={<Project />} />
          <Route path='editar/:id' element={<EditProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
