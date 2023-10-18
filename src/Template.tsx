import Rutas from './Rutas'
import NavBar from './components/NavBar'
import { token } from './tools/constantes'

function Template() {
  return (
    <div>
      {token() && <NavBar />}
      <Rutas />
    </div>
  )
}

export default Template
