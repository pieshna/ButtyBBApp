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
    console.log('Eliminar', id)
  }

  return (
    <>
      <h2>Proveedores</h2>
      <NewEditProveedor reload={setReload} />
      {id && <NewEditProveedor id={id} setId={setId} reload={setReload} />}
      <TablaPropia
        data={data}
        acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
      />
    </>
  )
}

export default VerProveedor
