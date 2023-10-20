import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import App from './App'
import Login from './auth/Login'
import Logout from './auth/Logout'
import VerProveedor from './proveedor/VerProveedor'
function Rutas() {
  return (
    <Routes>
      <Route path="/proveedores" element={<VerProveedor />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Rutas
