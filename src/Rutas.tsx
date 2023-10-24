import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import App from './App'
import Login from './auth/Login'
import Logout from './auth/Logout'
import VerProveedor from './proveedor/VerProveedor'
import VerUsuario from './usuarios/VerUsuario'
import VerCliente from './clientes/VerCliente'
import VerProducto from './productos/VerProducto'
import Compras from './compraventa/Compras'
function Rutas() {
  return (
    <Routes>
      <Route path="/compras" element={<Compras />} />
      <Route path="/productos" element={<VerProducto />} />
      <Route path="/clientes" element={<VerCliente />} />
      <Route path="/usuarios" element={<VerUsuario />} />
      <Route path="/proveedores" element={<VerProveedor />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default Rutas
