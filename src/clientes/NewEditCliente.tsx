import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import ModalPropio from '../components/ModalPropio'
import { useDisclosure } from '@chakra-ui/hooks'
import FormularioPropio from '../components/Formularios/Formulario'
import { estructuraCliente } from './estructuraClientes'

interface NewEditClienteProps {
  id?: string
  setId?: any
  reload: any
}

function NewEditCliente({ id, setId, reload }: NewEditClienteProps) {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!id) return
    fetchPropio(`clientes/${id}`).then((data) => {
      setData(data[0])
    })
    onOpen()
  }, [])

  const handleSubmit = (datosEnvio: Record<string, any>) => {
    datosEnvio.rol_id = parseInt(datosEnvio.rol_id)
    if (id) {
      delete datosEnvio.created_at
      delete datosEnvio.updated_at
      delete datosEnvio.id
      fetchPropio(`clientes/${id}`, 'PUT', datosEnvio).then(() => {
        handleCloseModal()
        reload(true)
      })
    } else {
      fetchPropio('clientes', 'POST', datosEnvio).then(() => {
        handleCloseModal()
        reload(true)
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
        titulo="Cliente"
        isOpen={isOpen}
        onClose={handleCloseModal}
        onOpen={onOpen}
        ocultar={id ? true : false}
      >
        <FormularioPropio
          datosAMostrar={data}
          formData={estructuraCliente}
          onSubmitFunction={handleSubmit}
        />
      </ModalPropio>
    </>
  )
}

export default NewEditCliente
