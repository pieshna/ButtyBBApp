import { Table as BootstrapTable, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useState } from 'react'

interface TableProps {
  data: any[]
  enumerar?: boolean
  acciones?: {
    editar?: (item: number) => string
    eliminar: (item: number) => void
    editarPerso?: (item: number) => void
  }
  hideCamps?: string[]
  onColumnSelected?: (item: any, column: string) => void
  agregarBuscador?: boolean
}

const TablaPropia: React.FC<TableProps> = ({
  data,
  enumerar,
  acciones,
  hideCamps = [],
  onColumnSelected,
  agregarBuscador = false
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedField, setSelectedField] = useState('')

  if (data.length === 0) {
    return <p>No hay datos disponibles.</p>
  }

  const headers = Object.keys(data[0]).filter(
    (header) => !hideCamps.includes(header)
  )

  const handleFieldSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedField(e.target.value)
    setSearchTerm('')
  }

  const filteredData = data.filter((item) =>
    selectedField
      ? item[selectedField].toLowerCase().includes(searchTerm.toLowerCase())
      : Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
  )

  return (
    <div className="table-responsive">
      {agregarBuscador && (
        <div>
          <select value={selectedField} onChange={handleFieldSelected}>
            <option value="">Buscar en todos los campos</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                Buscar en {header}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            {enumerar && <th>#</th>}
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            {acciones && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              {enumerar && <td>{index + 1}</td>}
              {headers.map((header) => (
                <td
                  key={header}
                  onClick={() => onColumnSelected?.(item, header)}
                >
                  {item[header]}
                </td>
              ))}
              {acciones && (
                <td>
                  {acciones.editar && (
                    <Link to={acciones.editar(item.id)}>
                      <Button variant="primary">Editar</Button>
                    </Link>
                  )}
                  {acciones.editarPerso && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (acciones.editarPerso) {
                          acciones.editarPerso(item.id)
                        }
                      }}
                    >
                      Editar
                    </button>
                  )}

                  <button
                    className="btn btn-danger"
                    onClick={() => acciones.eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
    </div>
  )
}

export default TablaPropia
