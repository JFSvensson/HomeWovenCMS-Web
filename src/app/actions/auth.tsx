'use client'

import { setCookie, destroyCookie } from 'nookies'
import { HOMEWOVEN_API_URL } from '@/config'
import jwt from 'jsonwebtoken'

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
    // Set access token in local storage.
    localStorage.setItem('accessToken', data.access_token)
    // Set refresh token in a secure cookie.
    setCookie(null, 'refreshToken', data.refresh_token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: true,
      sameSite: 'lax'
    })
    // Decode the access token to get the user data.
    return (fetchUserInformation(data.access_token))
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

export function fetchUserInformation(token : string) {
  // Decode the access token to get the user data.
  const decodedToken = jwt.decode(token)
  if (!decodedToken || typeof decodedToken === 'string') {
    throw new Error('Failed to decode token')
  }
  const username = (decodedToken as jwt.JwtPayload).given_name

  return username
}