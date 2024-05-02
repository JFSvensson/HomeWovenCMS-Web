import { createContext, useContext, useState, ReactNode } from 'react'
import { AuthContextType, User } from '../types/AuthTypes'
import { login as loginUser, logout as logoutUser } from '../app/actions/auth'


type AuthProviderProps = {
    children: ReactNode
}

const defaultContextValue = {
    user: null,
    login: () => Promise.reject(),
    logout: () => {},
  }

const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (userData: User) => {
    const user = await loginUser(userData)
    setUser(user)
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
