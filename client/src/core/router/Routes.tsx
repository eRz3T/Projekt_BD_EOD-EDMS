import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import TwoFactorAuth from '@/pages/TwoFactorAuth'
import Navbar from '../../shared/layout/Navbar/Navbar'
import { useAuth } from '@/providers/AuthProvider'
import { ClientRoutes } from './Routes.enum'

import NotFound from '@/pages/NotFound'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Documents from '@/pages/Documents'
import Case from '@/pages/Case'

const Router = () => {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Dashboard />} path={ClientRoutes.HOME} />
          <Route element={<Dashboard />} path={ClientRoutes.DASHBOARD} />
          <Route element={<Documents />} path={ClientRoutes.DOCUMENTS} />
          <Route element={<Case />} path={ClientRoutes.CASE} />
        </Route>
        <Route
          element={isAuthenticated ? <Navigate to={ClientRoutes.DASHBOARD} /> : <Login />}
          path={ClientRoutes.LOGIN}
        />
        <Route
          element={isAuthenticated ? <Navigate to={ClientRoutes.DASHBOARD} /> : <TwoFactorAuth />}
          path={ClientRoutes.LOGIN2FA}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
