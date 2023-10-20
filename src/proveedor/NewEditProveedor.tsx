import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import ModalPropio from '../components/ModalPropio'
import { useDisclosure } from '@chakra-ui/hooks'
import FormularioPropio from '../components/Formularios/Formulario'
import { estructuraProveedor } from './estructuraProveedor'

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
  const [data, setData] = useState({})
  useEffect(() => {
    if (!id) return
    fetchPropio(`proveedores/${id}`).then((data) => {
      setData(data[0])
    })
    onOpen()
  }, [])

  const handleSubmit = (datosEnvio: Record<string, string>) => {
    if (id) {
      delete datosEnvio.created_at
      delete datosEnvio.updated_at
      delete datosEnvio.id
      fetchPropio(`proveedores/${id}`, 'PUT', datosEnvio).then(() => {
        handleCloseModal()
      })
    } else {
      fetchPropio('proveedores', 'POST', datosEnvio).then(() => {
        handleCloseModal()
      })
    }
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
        <FormularioPropio
          datosAMostrar={data}
          formData={estructuraProveedor}
          onSubmitFunction={handleSubmit}
        />
      </ModalPropio>
    </>
  )
}

export default NewEditProveedor
