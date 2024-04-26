'use client'

import { HOMEWOVEN_API_URL } from '@/config'

export async function register(formData: FormData) {
  try {
    // TODO: Add early validation, to prevent unnecessary API calls.
    console.log('Registering user:', formData.get('username'))
    const userData = {
      username: formData.get('username'),
      passphrase: formData.get('passphrase'),
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
      email: formData.get('email')
    }

    const data = await getData(userData)

    return data
    
  } catch (error) {
    console.error(error)
  }
}

async function getData(userData : any) {
  const response = await fetch(`${HOMEWOVEN_API_URL}/auth/register`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  return data
} 
