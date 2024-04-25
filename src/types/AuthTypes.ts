// Type definitions for AuthContext
export interface User {
  id: number
  username: string
  email: string
}

export interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}
