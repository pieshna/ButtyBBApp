import { useEffect, useState } from 'react'
import { fetchPropio } from '../../../tools/fetchPropio'

interface SelectLlaveForaneaProps {
  label: string
  name: string
  value?: string
  className?: string
  required?: boolean
  url: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  camposAMostrar: string[]
  join?: string
  returnData?: boolean
  dataToReturn?: any
  placeholder?: string
}

const SelectLlaveForanea: React.FC<SelectLlaveForaneaProps> = ({
  label,
  name,
  value = '',
  className,
  required = false,
  url,
  onChange,
  camposAMostrar,
  join = ' ',
  returnData = false,
  dataToReturn = null,
  placeholder = ''
}) => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetchPropio(url).then((data) => {
      setData(data)
      if (returnData) {
        dataToReturn(data, name)
      }
    })
  }, [url])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event)
    }
  }

  return (
    <>
      {data.length === 0 && <div>Cargando...</div>}
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        className={className}
        required={required}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {camposAMostrar.map((campo) => item[campo]).join(join)}
          </option>
        ))}
      </select>
    </>
  )
}

export default SelectLlaveForanea
