'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { LoginData } from '@/types/AuthTypes'
import { useAuth } from '@/context/AuthContext'

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()

  // State to store input values with initial types
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    passphrase: '',
  })

  // Handle changes in form inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const formElement = event.currentTarget as HTMLFormElement
    const formData = new FormData(formElement)
    try {
      const loginSuccessful = await login(formData)
      if (loginSuccessful) {
        router.push('/dashboard')
      } else {
        console.error('Login failed')
      }
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white text-black p-6 rounded shadow-md'>
      <p>Login to your account to start using HomeWoven CMS</p>
      <br/>
      <div className='mb-4'>
        <label htmlFor="username" className='block text-sm font-bold mb-2'>Username</label>
        <input id="username" name="username" placeholder="User name" value={formData.username} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="passphrase" className='block text-sm font-bold mb-2'>Passphrase</label>
        <input id="passphrase" name="passphrase" type="password" value={formData.passphrase} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
    
      <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Login</button>
    </form>
  )
}
