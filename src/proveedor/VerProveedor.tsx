import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import NewEditProveedor from './NewEditProveedor'
import TablaPropia from '../components/TablaPropia'

function VerProveedor() {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)
  const [id, setId] = useState('')
  useEffect(() => {
    fetchPropio('proveedores').then((data) => {
      setData(data)
    })
    if (reload) setReload(false)
  }, [reload])

  const handleEdit = (id: number) => {
    setId(id.toString())
  }

  const handleDelete = (id: number) => {
    const confirm = window.confirm('¿Está seguro de eliminar este proveedor?')
    if (!confirm) return
    fetchPropio(`proveedores/${id}`, 'DELETE').then(() => {
      setReload(true)
    })
  }

  const headerName = [
    { value: 'created_at', header: 'Fecha de creación' },
    { value: 'updated_at', header: 'Fecha de actualización' }
  ]

  return (
    <div className="p-5">
      <h2 className="pb-2 text-center text-4xl">Proveedores</h2>
      <div className="py-3">
        <NewEditProveedor reload={setReload} />
        {id && <NewEditProveedor id={id} setId={setId} reload={setReload} />}
      </div>
      <TablaPropia
        data={data}
        acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
        headerName={headerName}
      />
    </div>
  )
}

export default VerProveedor
