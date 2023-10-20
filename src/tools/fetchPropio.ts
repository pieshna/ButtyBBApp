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

export const timeAgo = (date: string) => {
  const time = new Date(date).getTime()
  const now = new Date().getTime()
  const diff = now - time
  const minutes = diff / (1000 * 60)
  const hours = minutes / 60
  const days = hours / 24
  const weeks = days / 7
  const months = weeks / 4
  const years = months / 12

  if (minutes < 60) {
    return `${Math.round(minutes)} minutes ago`
  } else if (hours < 24) {
    return `${Math.round(hours)} hours ago`
  } else if (days < 7) {
    return `${Math.round(days)} days ago`
  } else if (weeks < 4) {
    return `${Math.round(weeks)} weeks ago`
  } else if (months < 12) {
    return `${Math.round(months)} months ago`
  } else {
    return `${Math.round(years)} years ago`
  }
}
