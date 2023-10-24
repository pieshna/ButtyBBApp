import Rutas from './Rutas'
import NavBar from './components/NavBar'
import { token } from './tools/constantes'

function Template() {
  return (
    <div>
      <div className="h-screen flex flex-col">
        {token() && <NavBar />}
        <div className="flex-1 overflow-y-auto">
          <Rutas />
        </div>

        {token() && (
          <div className="h-10 bg-pateleta-600">
            <p className="text-center text-white pt-2">
              © 2023 - ButtyBB - Todos los derechos reservados. - Desarrollado
              por Randi Islau Villeda Escobar
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Template
