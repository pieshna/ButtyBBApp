import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/login')
    }
  })
  return <></>
}

export default App
