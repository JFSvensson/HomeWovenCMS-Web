'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/app/actions/auth'
import { RegisterData } from '@/types/AuthTypes'

export function RegisterForm() {
  const router = useRouter()

  // State to store input values with initial types
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    passphrase: '',
    firstname: '',
    lastname: '',
    email: ''
  })

  // Handle changes in form inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
      const response = await register(formData)
      router.push('/login')
    } catch (error) {
      console.error('Registration failed', error)
      // TODO Handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white text-black p-6 rounded shadow-md'>
      <p>Register an account to start using HomeWoven CMS</p>
      <div className='mb-4'>
        <label htmlFor="username" className='block text-sm font-bold mb-2'>Username</label>
        <input id="username" name="username" placeholder="User name" value={formData.username} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="passphrase" className='block text-sm font-bold mb-2'>Passphrase</label>
        <input id="passphrase" name="passphrase" type="password" value={formData.passphrase} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="firstname" className='block text-sm font-bold mb-2'>First name</label>
        <input id="firstname" name="firstname" placeholder="First name" value={formData.firstname} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="lastname" className='block text-sm font-bold mb-2'>Last name</label>
        <input id="lastname" name="lastname" placeholder="Last name" value={formData.lastname} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      <div className='mb-4'>
        <label htmlFor="email" className='block text-sm font-bold mb-2'>Email</label>
        <input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
      </div>
      
      <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Register</button>
    </form>
  )
}
