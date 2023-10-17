export const API_URL = import.meta.env.VITE_HOST_API

export const token =
  localStorage.getItem('token') || sessionStorage.getItem('token') || ''
