import { API_URL, token } from './constantes'

export const fetchPropio = async (
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown
) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'content-type': 'application/json'
      }
    }

    if (token()) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token()}`
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(API_URL + '/' + url, options).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    return response
  } catch (error) {
    return null
  }
}
