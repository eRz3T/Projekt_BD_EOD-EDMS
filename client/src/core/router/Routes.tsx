import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import TwoFactorAuth from '@/pages/TwoFactorAuth'
import Navbar from '../../shared/layout/Navbar/Navbar'
import { useAuth } from '@/providers/AuthProvider'

import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

const Router = () => {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path='/dashboard' />
        </Route>
        <Route
          element={isAuthenticated ? <Navigate to={'/dashboard'} /> : <Login />}
          path='/login'
        />
        <Route
          element={isAuthenticated ? <Navigate to={'/dashboard'} /> : <TwoFactorAuth />}
          path='/login-2fa'
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
