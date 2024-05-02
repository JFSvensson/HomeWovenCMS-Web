'use client'

import React from 'react'
import Button from '../components/ui/button'
import Link from 'next/link'

export default function Home() {

  return (
    <main className='bg-white text-black p-6 rounded shadow-md'>
      <h1>Welcome to HomeWoven CMS</h1>
      <h2>Get started by logging in or registering</h2>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/register">
        <Button>Register</Button>
      </Link>
    </main>
  )
}
