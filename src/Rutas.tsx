import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import App from './App'
function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Rutas
