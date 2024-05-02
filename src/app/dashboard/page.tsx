'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // If the user is not authenticated, redirect to the login page
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  return (
    <main>
      Dashboard
    </main>
  )
}
