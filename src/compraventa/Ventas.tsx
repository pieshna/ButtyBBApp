import { ChangeEvent, useEffect, useState } from 'react'
import TablaPropia from '../components/TablaPropia'
import { fetchPropio } from '../tools/fetchPropio'

interface Cliente {
  nombre: string
  apellido: string
  nit: string
  correo: string
}

function Ventas() {
  const [buscarCliente, setBuscarCliente] = useState('')
  const [dataCliente, setDataCliente] = useState({} as Cliente)

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

  const handleChangeClient = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9\b]+$/
    if (value === '' || regex.test(value)) {
      setBuscarCliente(value)
    }
  }

  const addProduct = () => {
    console.log('addProduct')
  }

  const clearData = () => {
    setBuscarCliente('')
    setDataCliente({} as Cliente)
  }

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
      <div className="flex">
        <button onClick={addProduct} className="btn btn-primary">
          Agg
        </button>
        <TablaPropia data={[]} />
      </div>

      <div
        className={`flex mt-4 justify-${
          dataCliente?.nombre ? 'between' : 'end'
        } px-4`}
      >
        {dataCliente?.nombre && (
          <button
            className="btn btn-danger rounded-full w-24 h-24"
            onClick={clearData}
          >
            Cancelar
          </button>
        )}
        <button className="btn btn-success rounded-full w-24 h-24">
          Realizar Compra
        </button>
      </div>
    </>
  )
}

export default Ventas
