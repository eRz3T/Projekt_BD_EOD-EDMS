import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuthToken } from '../store/auth/authSelectors'

const ProtectedRoutes = () => {
  const token = useSelector(selectAuthToken)
  console.log(token)

  return token.length ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes
