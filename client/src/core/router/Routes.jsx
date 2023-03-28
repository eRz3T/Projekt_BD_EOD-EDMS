import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import TwoFactorAuth from '@/pages/TwoFactorAuth'
import Navbar from '../../shared/layout/Navbar/Navbar'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path='/' exact />
        </Route>
        <Route element={<Login />} path='/login' />
        <Route element={<TwoFactorAuth />} path='/login-2fa' />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
