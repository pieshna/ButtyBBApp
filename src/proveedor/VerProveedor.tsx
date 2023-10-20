import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import NewEditProveedor from './NewEditProveedor'
import TablaPropia from '../components/TablaPropia'

function VerProveedor() {
  const [data, setData] = useState([])
  const [id, setId] = useState('')
  useEffect(() => {
    fetchPropio('proveedores').then((data) => {
      setData(data)
    })
  }, [])

  const handleEdit = (id: number) => {
    console.log('Editar', id)
    setId(id.toString())
  }

  const handleDelete = (id: number) => {
    console.log('Eliminar', id)
  }

  return (
    <>
      <h2>Proveedores</h2>
      <NewEditProveedor />
      {id && <NewEditProveedor id={id} setId={setId} />}
      <TablaPropia
        data={data}
        acciones={{ editarPerso: handleEdit, eliminar: handleDelete }}
      />
    </>
  )
}

export default VerProveedor
