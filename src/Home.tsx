import { decodeToken } from './tools/constantes'
import EmpleadoView from './principal/EmpleadoView'
import AdminView from './principal/AdminView'

function Home() {
  const { rol } = decodeToken()

  return rol === 'Administrador' ? <AdminView /> : <EmpleadoView />
}

export default Home
