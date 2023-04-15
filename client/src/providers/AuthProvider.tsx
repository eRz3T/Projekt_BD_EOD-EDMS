import { selectAuthToken } from '@/core/store/auth/authSelectors'
import { createContext, useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthContext = createContext({
  isAuthenticated: false,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const token = useSelector(selectAuthToken)

  useEffect(() => {
    token ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, [token])

  const value = {
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
