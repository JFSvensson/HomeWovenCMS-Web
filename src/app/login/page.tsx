'use client'

import React from 'react'
import { LoginForm } from '@/components/ui/login-form'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  console.log('User: ', user)
  if (user) {
    router.push('/dashboard')
  } else {
    return (
      <main>
          <LoginForm />
      </main>
  )}
}
