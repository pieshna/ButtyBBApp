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
    console.log('Eliminar', id)
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
    <>
      <h2>Usuarios</h2>
      <NewEditUsuario reload={setReload} />
      {id && <NewEditUsuario id={id} setId={setId} reload={setReload} />}
      <TablaPropia
        data={data}
        acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
        hideCamps={hideCols}
      />
    </>
  )
}

export default VerUsuario
