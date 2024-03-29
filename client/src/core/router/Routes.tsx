import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import TwoFactorAuth from '@/pages/TwoFactorAuth'
import Navbar from '../../shared/layout/Navbar/Navbar'
import { useAuth } from '@/providers/AuthProvider'
import { ClientRoutes } from './Routes.enum'
import { AdminPaths } from '@/features/admin/adminTile/AdminTile.types'

import NotFound from '@/pages/NotFound'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Case from '@/pages/Case'
import Admin from '@/pages/Admin'
import Users from '@/pages/admin/Users'
import Workflows from '@/pages/admin/Workflows'
import Categories from '@/pages/admin/Categories'
import Cases from '@/pages/admin/Cases'
import Archive from '@/pages/admin/Archive'

const Router = () => {
  const { isAuthenticated } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Dashboard />} path={ClientRoutes.HOME} />
          <Route element={<Dashboard />} path={ClientRoutes.DASHBOARD} />
          <Route element={<Case />} path={ClientRoutes.CASE} />
          <Route element={<Admin />} path={ClientRoutes.ADMIN} />
          <Route element={<Users />} path={AdminPaths.USERS} />
          <Route element={<Workflows />} path={AdminPaths.WORKFLOWS} />
          <Route element={<Categories />} path={AdminPaths.CATEGORIES} />
          <Route element={<Cases />} path={AdminPaths.CASES} />
          <Route element={<Archive />} path={AdminPaths.ARCHIVE} />
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
