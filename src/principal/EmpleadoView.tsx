import { Link } from 'react-router-dom'

function EmpleadoView() {
  return (
    <>
      <div className="flex w-full gap-40 justify-center pt-40">
        <Link
          to="/clientes"
          className="btn btn-primary rounded-full w-44 h-44 flex items-center justify-center"
        >
          <p className="text-xl">Clientes</p>
        </Link>
        <Link
          to="/ventas"
          className="btn btn-primary rounded-full w-44 h-44 flex items-center justify-center"
        >
          <p className="text-xl">Ventas</p>
        </Link>
      </div>
    </>
  )
}

export default EmpleadoView
