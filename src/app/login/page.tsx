'use client'

import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Home() {
  const { user, login, logout } = useAuth()

  return (
    <main>
      {user ? (
        <div>
          <h1>Welcome, {user.username}!</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <button onClick={
            () => login({
              id: 1, username: 'test', email: '' 
            })}>Login</button>
        </div>
      )}
    </main>
  )
}
