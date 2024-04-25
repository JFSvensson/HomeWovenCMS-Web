'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AuthContextType, User } from '../types/AuthTypes'

const defaultContextValue: AuthContextType = {
    user: null,
    login: () => {},
    logout: () => {},
}

const AuthContext = createContext<AuthContextType>(defaultContextValue)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
