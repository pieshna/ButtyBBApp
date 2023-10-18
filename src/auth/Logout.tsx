import { useEffect } from 'react'

function Logout() {
  useEffect(() => {
    sessionStorage.removeItem('token')
    localStorage.removeItem('token')
    window.location.href = '/login'
  })
  return <></>
}

export default Logout
