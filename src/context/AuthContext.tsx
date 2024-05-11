'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthContextType, User } from '@/types/AuthTypes'
import { login as loginUser, logout as logoutUser, fetchUserInformation } from '../app/actions/auth'

type AuthProviderProps = {
    children: ReactNode
}

const defaultContextValue = {
    user: null,
    login: () => Promise.resolve(false),
    logout: () => {},
  }

export const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
  
    if (token) {
      // If the token exists, use it to fetch the user's information and set the user state.
      const username = fetchUserInformation(token)
      setUser({ username })
    }
  }, [])

  async function login (formData: FormData): Promise<boolean> {
    try {
      const loggedInUser = await loginUser(formData)
      setUser(loggedInUser)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
