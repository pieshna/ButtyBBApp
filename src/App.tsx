import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from './tools/constantes'
function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/login')
    } else {
      decodeToken().usuarioId ? navigate('/home') : navigate('/login')
    }
  })
  return <></>
}

export default App
