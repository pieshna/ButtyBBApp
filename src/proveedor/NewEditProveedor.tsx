import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import ModalPropio from '../components/ModalPropio'
import { useDisclosure } from '@chakra-ui/hooks'

interface NewEditProveedorProps {
  id?: string
  setId?: any
}

interface Proveedor {
  nombre: string
  telefono: string
  compania: string
  id?: number
  created_at?: string
  updated_at?: string
}

function NewEditProveedor({ id, setId }: NewEditProveedorProps) {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const [data, setData] = useState({} as Proveedor)
  useEffect(() => {
    if (!id) return
    fetchPropio(`proveedores/${id}`).then((data) => {
      setData(data[0])
    })
    onOpen()
  }, [id])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (id) {
      delete data.created_at
      delete data.updated_at
      delete data.id
      fetchPropio(`proveedores/${id}`, 'PUT', data).then(() => {
        handleCloseModal()
      })
    } else {
      fetchPropio('proveedores', 'POST', data).then(() => {
        handleCloseModal()
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleCloseModal = () => {
    if (id) setId('')
    return onCloseModal()
  }

  return (
    <>
      <ModalPropio
        buttonToShowModalText="Nuevo"
        titulo="Proveedor"
        isOpen={isOpen}
        onClose={handleCloseModal}
        onOpen={onOpen}
      >
        <form>
          <div className="input-group">
            <span className="input-group-text">Nombre:</span>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={data.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">Telefono:</span>
            <input
              className="form-control"
              type="text"
              name="telefono"
              value={data.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <span className="input-group-text">Compania:</span>
            <input
              className="form-control"
              type="text"
              name="compania"
              value={data.compania}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </ModalPropio>
    </>
  )
}

export default NewEditProveedor
