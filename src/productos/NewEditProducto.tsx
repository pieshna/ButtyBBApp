import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import ModalPropio from '../components/ModalPropio'
import { useDisclosure } from '@chakra-ui/hooks'
import FormularioPropio from '../components/Formularios/Formulario'
import { estructuraProducto } from './estructuraProductos'

interface NewEditProductoProps {
  id?: string
  setId?: any
  reload: any
}

function NewEditProducto({ id, setId, reload }: NewEditProductoProps) {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const [data, setData] = useState({})

  useEffect(() => {
    if (!id) return
    fetchPropio(`productos/${id}`).then((data) => {
      fetchPropio(`stock/producto/${id}`).then((stock) => {
        const datos = { ...data[0], ...stock[0] }
        setData(datos)
      })
    })
    onOpen()
  }, [])

  const handleSubmit = (datosEnvio: Record<string, any>) => {
    datosEnvio.precio_compra = parseFloat(datosEnvio.precio_compra)

    if (id) {
      delete datosEnvio.created_at
      delete datosEnvio.updated_at
      delete datosEnvio.id
      const stock = {
        precio_venta: parseFloat(datosEnvio.precio_venta),
        unidades: parseInt(datosEnvio.unidades),
        descripcion: datosEnvio.descripcion,
        producto_id: parseInt(id)
      }
      fetchPropio(`productos/${id}`, 'PUT', datosEnvio).then(() => {
        fetchPropio(`stock/producto/${id}`, 'PUT', stock).then(() => {
          handleCloseModal()
          reload(true)
        })
      })
    } else {
      const stock = {
        precio_venta: parseFloat(datosEnvio.precio_venta),
        unidades: parseInt(datosEnvio.unidades),
        descripcion: datosEnvio.descripcion,
        producto_id: 0
      }
      fetchPropio('productos', 'POST', datosEnvio).then((data) => {
        stock.producto_id = parseInt(data.insertId)
        fetchPropio('stock', 'POST', stock).then(() => {
          handleCloseModal()
          reload(true)
        })
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
        titulo="Producto"
        isOpen={isOpen}
        onClose={handleCloseModal}
        onOpen={onOpen}
        ocultar={id ? true : false}
      >
        <FormularioPropio
          datosAMostrar={data}
          formData={estructuraProducto}
          onSubmitFunction={handleSubmit}
        />
      </ModalPropio>
    </>
  )
}

export default NewEditProducto
