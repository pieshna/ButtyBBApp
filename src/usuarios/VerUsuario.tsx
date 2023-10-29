import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import TablaPropia from '../components/TablaPropia'
import NewEditUsuario from './NewEditUsuario'

function VerUsuario() {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)
  const [id, setId] = useState('')
  useEffect(() => {
    fetchPropio('usuarios').then((data) => {
      data.map((item: any) => {
        item.rol = item.rol_id === 1 ? 'Administrador' : 'Usuario'
        item.estado = item.estado ? 'Activo' : 'Inactivo'
      })
      setData(data)
    })
    if (reload) setReload(false)
  }, [reload])

  const handleEdit = (id: number) => {
    setId(id.toString())
  }

  const handleDelete = (id: number) => {
    const confirm = window.confirm('¿Está seguro de eliminar este usuario?')
    if (!confirm) return
    fetchPropio(`usuarios/${id}`, 'DELETE').then(() => {
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
      <h2 className="pb-2 text-center text-4xl">Usuarios</h2>
      <div className="py-3">
        <NewEditUsuario reload={setReload} />
        {id && <NewEditUsuario id={id} setId={setId} reload={setReload} />}
      </div>
      <TablaPropia
        data={data}
        acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
        hideCamps={hideCols}
      />
    </div>
  )
}

export default VerUsuario
