'use client'

import React from 'react'
import { LoginForm } from '@/components/ui/login-form'

export default function Home() {

  return (
    <main>
      <h2>Login</h2>
      <p>Login to your account to start using HomeWoven CMS</p>
        <LoginForm />
    </main>
  )
}
