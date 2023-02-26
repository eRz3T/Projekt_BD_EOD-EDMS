import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Home from '../../pages/Home'
import Login from '../../pages/Login'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Home />} path='/' exact />
        </Route>
        <Route element={<Login />} path='/login' />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
