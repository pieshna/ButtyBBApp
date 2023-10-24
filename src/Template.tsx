import Rutas from './Rutas'
import NavBar from './components/NavBar'
import { token } from './tools/constantes'

function Template() {
  return (
    <div>
      {token() && <NavBar />}
      <div className="h-screen">
        <Rutas />
      </div>
      {token() && (
        <div className="h-10 bg-pateleta-600">
          <p className="text-center text-white pt-2">
            © 2023 - ButtyBB - Todos los derechos reservados. - Desarrollado por
            Randi Islau Villeda Escobar
          </p>
        </div>
      )}
    </div>
  )
}

export default Template
