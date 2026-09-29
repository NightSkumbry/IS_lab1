export interface User {
  id: number
  username: string
}

export interface Credentials {
  username: string
  password: string
}

export interface AuthResponse {
  user: User
  refreshToken: string
}
