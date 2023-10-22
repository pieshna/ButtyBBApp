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
    if (response[0]?.created_at && response[0]?.updated_at) {
      response.map((item: any) => {
        if (item.created_at) {
          item.created_at = timeAgo(item.created_at)
        }
        if (item.updated_at) {
          item.updated_at = timeAgo(item.updated_at)
        }
      })
    }
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

  if (minutes < 60) {
    return `Hace ${Math.round(minutes)} minutos.`
  } else if (hours < 24) {
    return `Hace ${Math.round(hours)} horas.`
  } else if (days < 7) {
    return `Hace ${Math.round(days)} dias.`
  } else {
    const fecha = date.split('T')[0].split('-')
    return `${fecha[2]}/${fecha[1]}/${fecha[0]}`
  }
}
