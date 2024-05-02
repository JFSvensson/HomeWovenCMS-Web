'use client'

import { User } from '@/types/AuthTypes'
import { setCookie, destroyCookie } from 'nookies'
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
  // TODO: Add early validation, to prevent unnecessary API calls.
  console.log('Login user:', formData.get('username'))
  const loginData = {
    username: formData.get('username'),
    passphrase: formData.get('passphrase')
  }
  const response = await fetch(`${HOMEWOVEN_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })

  const data = await response.json()

  if (response.ok) {
    setCookie(null, 'token', data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
    return data.user
  } else {
    throw new Error(data.message)
  }
}

export function logout() {
  destroyCookie(null, 'token')
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
  if (response.ok) {
    return data
  } else {
    throw new Error(data.message)
  }
} 
