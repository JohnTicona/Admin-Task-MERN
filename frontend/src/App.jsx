import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import ConfirmAcount from './pages/auth/ConfirmAcount'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import NewPassword from './pages/auth/NewPassword'
import Register from './pages/auth/Register'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Register />} />
          <Route path='olvide-password' element={<ForgotPassword />} />
          <Route path='olvide-password/:token' element={<NewPassword />} />
          <Route path='confirmar/:id' element={<ConfirmAcount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
