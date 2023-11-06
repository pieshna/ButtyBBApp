import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { decodeToken } from './tools/constantes'

const Home = lazy(() => import('./Home'))
const App = lazy(() => import('./App'))
const Login = lazy(() => import('./auth/Login'))
const Logout = lazy(() => import('./auth/Logout'))
const VerProveedor = lazy(() => import('./proveedor/VerProveedor'))
const VerUsuario = lazy(() => import('./usuarios/VerUsuario'))
const VerCliente = lazy(() => import('./clientes/VerCliente'))
const VerProducto = lazy(() => import('./productos/VerProducto'))
const Compras = lazy(() => import('./compraventa/Compras'))
const Ventas = lazy(() => import('./compraventa/Ventas'))

function Rutas() {
  const rol = decodeToken()?.rol || ''
  const esAdmin = () => {
    return (
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/ventas" element={<Ventas />} />
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
      </Suspense>
    )
  }
  const esEmpleado = () => {
    return (
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/clientes" element={<VerCliente />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Suspense>
    )
  }
  return rol === 'Administrador' ? esAdmin() : esEmpleado()
}

export default Rutas
