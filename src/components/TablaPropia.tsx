import { Table as BootstrapTable, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { isNumber } from 'chart.js/helpers'

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
  itemsPerPage?: number
}

const TablaPropia: React.FC<TableProps> = ({
  data,
  enumerar,
  acciones,
  hideCamps = [],
  onColumnSelected,
  agregarBuscador = true,
  itemsPerPage = 5
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

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

  const filteredData = data.filter((item) => {
    if (!selectedField)
      return Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    if (isNumber(item[selectedField])) {
      return selectedField
        ? item[selectedField]
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        : Object.values(item).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchTerm.toLowerCase())
          )
    }
    return selectedField
      ? item[selectedField].toLowerCase().includes(searchTerm.toLowerCase())
      : Object.values(item).some(
          (value) =>
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
  })

  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const offset = currentPage * itemsPerPage
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage)

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected)
  }

  return (
    <div className="table-responsive">
      {agregarBuscador && (
        <div className="flex justify-end pb-2">
          <select
            value={selectedField}
            className="form-control w-56"
            onChange={handleFieldSelected}
          >
            <option value="">Buscar en todos los campos</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                Buscar en {header}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="🔍Buscar..."
            className="form-control w-56 ml-2"
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
          {currentPageData.map((item, index) => (
            <tr key={item.id}>
              {enumerar && <td>{offset + index + 1}</td>}
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
      {filteredData.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          className="flex justify-center"
          pageLinkClassName="px-2 mx-1 btn btn-outline-primary"
          nextClassName="px-2 mx-1 btn btn-outline-primary"
          previousClassName="px-2 mx-1 btn btn-outline-primary"
        />
      )}
    </div>
  )
}

export default TablaPropia
