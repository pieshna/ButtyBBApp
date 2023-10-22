import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import ModalPropio from '../components/ModalPropio'
import { useDisclosure } from '@chakra-ui/hooks'
import FormularioPropio from '../components/Formularios/Formulario'
import { estructuraUsuario } from './estructuraUsuarios'

interface NewEditUsuarioProps {
  id?: string
  setId?: any
  reload: any
}

function NewEditUsuario({ id, setId, reload }: NewEditUsuarioProps) {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const [data, setData] = useState({})
  const [estructura, setEstructura] = useState(estructuraUsuario)
  useEffect(() => {
    setEstructura({ ...estructura })
    if (!id) return
    delete estructura.password
    fetchPropio(`usuarios/${id}`).then((data) => {
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
      delete datosEnvio.foto
      fetchPropio(`usuarios/${id}`, 'PUT', datosEnvio).then(() => {
        handleCloseModal()
        reload(true)
      })
    } else {
      fetchPropio('usuarios', 'POST', datosEnvio).then(() => {
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
        titulo="Usuario"
        isOpen={isOpen}
        onClose={handleCloseModal}
        onOpen={onOpen}
        ocultar={id ? true : false}
      >
        <FormularioPropio
          datosAMostrar={data}
          formData={estructura}
          onSubmitFunction={handleSubmit}
        />
      </ModalPropio>
    </>
  )
}

export default NewEditUsuario
