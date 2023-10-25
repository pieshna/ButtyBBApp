import jwt_decode from 'jwt-decode'

export const API_URL = import.meta.env.VITE_HOST_API

export const token = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (token) {
    return token
  } else {
    return null
  }
}

interface Token {
  usuarioId: number
  usuario: string
  correo: string
  rol: string
}

export const decodeToken = (): Token => {
  const tokenExisted = token()
  if (!tokenExisted) return {} as Token
  return jwt_decode(tokenExisted)
}
