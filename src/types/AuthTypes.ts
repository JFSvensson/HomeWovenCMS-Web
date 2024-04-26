// Type definitions for AuthContext
export interface User {
  id: number
  username: string
  email: string
}

export interface LoginData {
  username: string
  passphrase: string
}

export interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}
