import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
      <h1 className='text-2xl text-green-600'>Dummy login page</h1>
      <Link to='/'>Go to home page</Link>
    </div>
  )
}

export default Login
