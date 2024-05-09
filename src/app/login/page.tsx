'use client'

import React, { useEffect } from 'react'
import { LoginForm } from '@/components/ui/login-form'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  if (!user) {
    return (
      <main>
          <LoginForm />
      </main>
    )
  }

  return null
}
