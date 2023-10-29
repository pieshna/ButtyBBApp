import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import TablaPropia from '../components/TablaPropia'
import NewEditProducto from './NewEditProducto'

function VerProducto() {
  const [data, setData] = useState([])
  const [reload, setReload] = useState(false)
  const [id, setId] = useState('')
  useEffect(() => {
    fetchPropio('productos/with-stock').then((data) => {
      setData(data)
    })
    if (reload) setReload(false)
  }, [reload])

  const handleEdit = (id: number) => {
    setId(id.toString())
  }

  const handleDelete = (id: number) => {
    const confirm = window.confirm('¿Está seguro de eliminar este producto?')
    if (!confirm) return
    fetchPropio(`productos/${id}`, 'DELETE').then(() => {
      setReload(true)
    })
  }

  const hideCols = ['imagen']

  return (
    <div className="p-5">
      <h2 className="pb-2 text-center text-4xl">Productos</h2>
      <div className="py-3">
        <NewEditProducto reload={setReload} />
        {id && <NewEditProducto id={id} setId={setId} reload={setReload} />}
      </div>
      <TablaPropia
        data={data}
        acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
        hideCamps={hideCols}
        agregarBuscador
      />
    </div>
  )
}

export default VerProducto
