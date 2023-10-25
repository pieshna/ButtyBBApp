import { useEffect, useState } from 'react'
import { fetchPropio } from '../tools/fetchPropio'
import BarChart, { BarChartProps } from '../components/BarChart'

function AdminView() {
  const [dataGrafica, setDataGrafica] = useState<BarChartProps>()
  const [dataProducts, setDataProducts] = useState([] as any[])

  useEffect(() => {
    fetchPropio('detalle-ventas/top-ventas').then((data) => {
      setDataProducts(data)
      configData(data)
    })
  }, [])

  const configData = (data: any) => {
    const labels = data.map((item: any) => item.nombre)
    const datos = data.map((item: any) => item.cantidad)
    const colores = ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB']
    const datosTemp: BarChartProps = { datosConfig: { labels, datos, colores } }
    setDataGrafica(datosTemp)
  }

  return (
    <>
      <div className="grid grid-cols-2 pt-10">
        <div className="flex-1">
          <p className="text-center font-bold text-xl">
            Top 5 Productos Vendidos
          </p>
          {dataGrafica && <BarChart datosConfig={dataGrafica.datosConfig} />}
        </div>
        <div className="flex-1">
          <p className="text-center text-xl">Productos mas vendidos</p>
          <p className="text-center">{new Date().toLocaleDateString()}</p>
          <div className="flex flex-col items-center pt-3">
            {dataProducts.map((item) => {
              return (
                <div className="flex gap-10 pt-1">
                  <p>{item.nombre}</p>
                  <p>{item.cantidad}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminView
