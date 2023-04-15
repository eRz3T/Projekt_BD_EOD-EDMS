import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import TwoFactorAuth from '@/pages/TwoFactorAuth'
import Navbar from '../../shared/layout/Navbar/Navbar'
import { useAuth } from '@/providers/AuthProvider'

const Router = () => {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path='/' />
        </Route>
        <Route element={isAuthenticated ? <Navigate to={'/'} /> : <Login />} path='/login' />
        <Route
          element={isAuthenticated ? <Navigate to={'/'} /> : <TwoFactorAuth />}
          path='/login-2fa'
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
