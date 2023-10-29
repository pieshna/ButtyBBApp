import { ChangeEvent, useEffect, useState } from 'react'
import TablaPropia from '../components/TablaPropia'
import { fetchPropio } from '../tools/fetchPropio'
import ModalPropio from '../components/ModalPropio'
import { useDisclosure } from '@chakra-ui/react'
import { decodeToken } from '../tools/constantes'
import ReactDOM from 'react-dom'
import TemplatePDF from './TemplatePDF'

interface Cliente {
  id: number
  nombre: string
  apellido: string
  nit: string
  correo: string
}

function Ventas() {
  const [buscarCliente, setBuscarCliente] = useState('')
  const [dataCliente, setDataCliente] = useState({} as Cliente)
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure()
  const [dataProducts, setDataProducts] = useState([])
  const [productsToBuy, setProductsToBuy] = useState([] as any[])
  const [dataToPDF, setDataToPDF] = useState([] as any[])
  const descargar = false

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buscarCliente.length != 0) {
        fetchPropio(`clientes/nit/${buscarCliente}`).then((data: Cliente[]) => {
          setDataCliente(data[0])
        })
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [buscarCliente])

  useEffect(() => {
    fetchPropio('productos/para-venta').then((data) => {
      data.map((item: any) => {
        if (item?.precio_compra) {
          item.precio = item.precio_compra
          delete item.precio_compra
        }
      })
      setDataProducts(data)
    })
  }, [])

  const handleChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9\b]+$/
    if (value === '' || regex.test(value)) {
      setBuscarCliente(value)
    }
  }

  const handleSubmitToBuy = () => {
    const dataVenta = {
      empleado_id: decodeToken().usuarioId,
      cliente_id: dataCliente.id,
      fecha: new Date().toISOString().slice(0, 10),
      subtotal: getSubTotal(),
      total: getTotal()
    }
    fetchPropio('ventas', 'POST', dataVenta).then((data) => {
      const { insertId } = data
      if (insertId === 0 || !insertId) return alert('Error al guardar la venta')

      const detalleVenta = productsToBuy.map((item) => {
        return {
          producto_id: item.id,
          cantidad: item.cantidad,
          venta_id: insertId
        }
      })

      fetchPropio('detalle-ventas/many', 'POST', detalleVenta).then((data) => {
        if (data?.insertId) {
          fetchPropio('detalle-ventas/' + data?.insertId, 'GET').then(
            (data) => {
              const { venta_id } = data[0]
              fetchPropio('detalle-ventas/venta/' + venta_id, 'GET').then(
                (data) => {
                  setDataToPDF(data)
                }
              )
            }
          )
          alert('Venta realizada con éxito')
          clearData()
        } else
          alert(
            'Error al realizar la venta, valide los datos o presione cancelar para volver a intentarlo'
          )
      })
    })
  }

  useEffect(() => {
    if (dataToPDF.length == 0) return
    if (descargar == false) viewPDF()
  }, [dataToPDF])

  const getTotal = () => {
    let total = 0
    productsToBuy.map((item) => {
      total += parseFloat(item.total)
    })
    return total
  }

  const getSubTotal = () => {
    let subTotal = 0
    productsToBuy.map((item) => {
      subTotal += item.precio * item.cantidad
    })
    return subTotal
  }

  const clearData = () => {
    setBuscarCliente('')
    setDataCliente({} as Cliente)
    setProductsToBuy([])
    setDataToPDF([])
  }

  const itemSelected = (item: any, col: string) => {
    if (!col) return
    const cantidad = prompt('Cantidad a comprar')
    if (!/^\d+$/.test(cantidad ?? '')) {
      alert('Cantidad no válida')
      return
    }
    const itemNew = {
      cantidad,
      ...item,
      total: (item.precio * parseFloat(cantidad ?? '0')).toFixed(2)
    }
    setProductsToBuy([...productsToBuy, itemNew])
    onCloseModal()
  }

  const viewPDF = () => {
    if (dataToPDF.length === 0) return
    const nuevaVentana = window.open('', '_blank')
    if (nuevaVentana) {
      nuevaVentana.document.body.innerHTML = `<div id="root"></div>`
      ReactDOM.render(
        <TemplatePDF datos={dataToPDF} />,
        nuevaVentana.document.getElementById('root')
      )
    }
  }

  const hideColsProducts = ['id', 'created_at', 'updated_at']

  return (
    <>
      <div className="flex p-2 gap-4">
        <div className="w-52">
          <label>NIT:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el NIT del cliente"
            value={buscarCliente}
            onChange={handleChangeClient}
            disabled={dataCliente?.nombre ? true : false}
          />
        </div>
        {dataCliente?.nombre && (
          <div className="flex flex-col">
            <p className="text-xl">Datos del Cliente:</p>
            <p>
              Nombre: {dataCliente.apellido}, {dataCliente.nombre}
            </p>
            <p>Correo: {dataCliente.correo}</p>
          </div>
        )}
      </div>
      {dataCliente?.nombre && (
        <>
          <div className="flex">
            <ModalPropio
              buttonToShowModalText="Agg"
              isOpen={isOpen}
              onClose={onCloseModal}
              onOpen={onOpen}
              titulo="Productos"
            >
              <TablaPropia
                data={dataProducts}
                hideCamps={hideColsProducts}
                onColumnSelected={itemSelected}
                agregarBuscador
              />
            </ModalPropio>
          </div>
          <div className="px-8 py-4">
            <TablaPropia data={productsToBuy} hideCamps={hideColsProducts} />
          </div>
          <div className="flex justify-end px-8">
            <p className="text-xl">
              Total a Cancelar: Q.{getSubTotal().toFixed(2)}
            </p>
          </div>

          <div className={`flex mt-4 justify-between px-4`}>
            {dataCliente?.nombre && (
              <button
                className="btn btn-danger rounded-full w-24 h-24"
                onClick={clearData}
              >
                Cancelar
              </button>
            )}
            {productsToBuy.length > 0 && (
              <button
                className="btn btn-success rounded-full w-24 h-24"
                onClick={handleSubmitToBuy}
              >
                Realizar Compra
              </button>
            )}
          </div>
        </>
      )}
      {descargar && dataToPDF.length > 0 && (
        <TemplatePDF datos={dataToPDF} descargar />
      )}
    </>
  )
}

export default Ventas
