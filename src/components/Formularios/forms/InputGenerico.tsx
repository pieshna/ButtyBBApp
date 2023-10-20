import { useEffect, useState } from 'react'

interface InputGenericoProps {
  label: string
  type: string
  name: string
  value: string
  className?: string
  required?: boolean
  placeholder?: string
  autoComplete?: boolean
  defaultValue?: string | number
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: string
}

const InputGenerico: React.FC<InputGenericoProps> = ({
  label,
  type,
  name,
  value,
  className,
  required = false,
  onChange,
  placeholder = '',
  defaultValue = null,
  autoComplete = false,
  disabled = false,
  icon = ''
}) => {
  const [valor, setValor] = useState<string>('')

  useEffect(() => {
    defaultValue ? setValor(defaultValue.toString()) : setValor(value)
  }, [defaultValue])

  useEffect(() => {
    setValor(value)
  }, [value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value)
    onChange(event)
  }

  return (
    <>
      {icon ? (
        <>
          <label htmlFor={name}>{label}</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className={icon}></i>
            </span>
            <input
              type={type}
              name={name}
              value={valor || value}
              className={className}
              required={required}
              onChange={handleInputChange}
              placeholder={placeholder}
              autoComplete={autoComplete ? 'on' : 'off'}
              disabled={disabled}
            />
          </div>
        </>
      ) : (
        <>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            name={name}
            value={valor}
            className={className}
            required={required}
            onChange={handleInputChange}
            placeholder={placeholder}
            autoComplete={autoComplete ? 'on' : 'off'}
            disabled={disabled}
          />
        </>
      )}
    </>
  )
}

export default InputGenerico
