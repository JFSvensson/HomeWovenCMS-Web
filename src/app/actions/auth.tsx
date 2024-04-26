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
    const url = `register`
    const data = await getData(userData, url)

    return data
    
  } catch (error) {
    console.error(error)
  }
}

export async function login(formData: FormData) {
  try {
    // TODO: Add early validation, to prevent unnecessary API calls.
    console.log('Login user:', formData.get('username'))
    const userData = {
      username: formData.get('username'),
      passphrase: formData.get('passphrase')
    }
    const url = `login`
    const data = await getData(userData, url)

    return data
    
  } catch (error) {
    console.error(error)
  }
}


async function getData(userData : any, url : string) {
  const response = await fetch(`${HOMEWOVEN_API_URL}/auth/${url}`, {
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
