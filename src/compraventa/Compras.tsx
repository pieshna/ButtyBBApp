import { useEffect, useState } from 'react'
import FormularioPropio from '../components/Formularios/Formulario'
import { fetchPropio } from '../tools/fetchPropio'
import { estructuraCompra } from './estructura'
import { FormularioEstructura } from '../components/Formularios/type'
import { useNavigate } from 'react-router-dom'

function Compras() {
  const [estructura, setEstructura] = useState(estructuraCompra)
  const [recharge, setRecharge] = useState(false)
  const [productoId, setProductoId] = useState('')
  const [data, setData] = useState<any[]>([])
  const [unidades, setUnidades] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const estructuraNueva: FormularioEstructura = {
      ...estructura,
      cantidadActual: {
        required: false,
        type: 'number',
        label: 'Cantidad Actual',
        disabled: true,
        defaultValue: getDataFiltered(parseInt(productoId))?.unidades
      },
      producto_id: {
        label: 'Producto',
        placeholder: 'Seleccione un producto',
        type: 'select',
        required: true,
        url: 'productos/with-stock',
        camposAMostrar: ['nombre'],
        returnData: true,
        defaultValue: productoId
      },
      unidades: {
        label: 'Cantidad a comprar',
        placeholder: 'Ingrese la cantidad',
        type: 'number',
        required: true,
        defaultValue: unidades
      },
      unidadesNuevas: {
        required: false,
        type: 'number',
        label: 'Cantidad Nueva',
        disabled: true,
        defaultValue:
          getDataFiltered(parseInt(productoId))?.unidades + parseInt(unidades)
      }
    }
    setEstructura(estructuraNueva)
  }, [recharge])

  const handleSubmit = (datosEnvio: Record<string, any>) => {
    datosEnvio.unidades = parseInt(datosEnvio.unidades)
    fetchPropio(
      `stock/compra/${datosEnvio.producto_id}`,
      'POST',
      datosEnvio
    ).then(() => {
      navigate('/productos')
    })
  }

  const dataReturned = (data: any) => {
    setData(data)
  }

  const onChanges = (name: string, value: string) => {
    if (name === 'producto_id') {
      setProductoId(value)
      setRecharge(!recharge)
    }
    if (name === 'unidades') {
      setUnidades(value)
      setRecharge(!recharge)
    }
  }

  const getDataFiltered = (id: number) => {
    const result = data.filter((item) => item.id === id)[0]

    return result
  }

  return (
    <>
      <div className="p-5">
        <h2 className="text-4xl text-center pb-4">Compra de Productos</h2>
        <div className="py-3 px-10">
          <FormularioPropio
            datosAMostrar={{}}
            formData={estructura}
            onSubmitFunction={handleSubmit}
            dataToReturn={dataReturned}
            onChanges={onChanges}
            textoBoton="Realizar Compra"
          />
        </div>
      </div>
    </>
  )
}

export default Compras
