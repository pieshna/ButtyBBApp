import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import TablaPropia from '../components/TablaPropia'
import NewEditUsuario from './NewEditCliente'
import { decodeToken } from '../tools/constantes'

function VerCliente() {
  const { rol } = decodeToken()
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)
  const [id, setId] = useState('')
  useEffect(() => {
    fetchPropio('clientes').then((data) => {
      setData(data)
    })
    if (reload) setReload(false)
  }, [reload])

  const handleEdit = (id: number) => {
    setId(id.toString())
  }

  const handleDelete = (id: number) => {
    const confirm = window.confirm('¿Está seguro de eliminar este cliente?')
    if (!confirm) return
    fetchPropio(`clientes/${id}`, 'DELETE').then(() => {
      setReload(true)
    })
  }

  const hideCols = [
    'id',
    'created_at',
    'updated_at',
    'password',
    'rol_id',
    'foto'
  ]

  return (
    <div className="p-5">
      <h2 className="text-4xl text-center pb-2">Clientes</h2>
      <div className="py-3">
        <NewEditUsuario reload={setReload} />
        {id && <NewEditUsuario id={id} setId={setId} reload={setReload} />}
      </div>
      {rol === 'Administrador' && (
        <TablaPropia
          data={data}
          acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
          hideCamps={hideCols}
        />
      )}
      {rol !== 'Administrador' && (
        <TablaPropia data={data} hideCamps={hideCols} />
      )}
    </div>
  )
}

export default VerCliente
