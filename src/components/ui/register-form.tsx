'use client'

import { register } from '@/app/actions/auth'
 
export function RegisterForm() {
  return (
    <form action={register}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="User name" />
      </div>
      <div>
        <label htmlFor="passphrase">Passphrase</label>
        <input id="passphrase" name="passphrase" type="passphrase" />
      </div>
      <div>
        <label htmlFor="firstname">First name</label>
        <input id="firstname" name="firstname" placeholder="First name" />
      </div>
      <div>
        <label htmlFor="lastname">Last name</label>
        <input id="lastname" name="lastname" placeholder="Last name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      
      <button type="submit">Register</button>
    </form>
  )
}
