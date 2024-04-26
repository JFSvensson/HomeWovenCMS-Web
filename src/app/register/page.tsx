import React, { useState } from 'react'
import Button from '@/components/ui/button'
import { RegisterForm } from '@/components/ui/register-form'

export default function Home() {
  return (
    <main>
      <h2>Register</h2>
      <p>Register an account to start using HomeWoven CMS</p>
        <RegisterForm />
    </main>
  )
}
