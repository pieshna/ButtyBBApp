import { useState, useEffect } from 'react'
import InputGenerico from './forms/InputGenerico'
import SelectLlaveForanea from './forms/SelectLlaveForanea'

interface FormProps {
  formData: Record<
    string,
    {
      label?: string
      type: string
      required: boolean
      placeholder?: string
      validate?: (value: string) => string
      url?: string
      camposAMostrar?: string[]
      autoComplete?: boolean
      join?: string
      defaultValue?: string | number
      returnData?: boolean
      disabled?: boolean
      icon?: string
    }
  >
  onSubmitFunction: (data: Record<string, string>) => void
  noColumnas?: number
  datosAMostrar: any
  dataToReturn?: any
  onChanges?: any
  textoBoton?: string
  alinearBoton?: string
}

const FormularioPropio: React.FC<FormProps> = ({
  formData,
  onSubmitFunction,
  noColumnas = 1,
  datosAMostrar,
  dataToReturn = null,
  onChanges = null,
  textoBoton = 'Enviar',
  alinearBoton = 'center'
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (Object.keys(datosAMostrar).length === 0) {
      const defaultValues: any = {}
      Object.entries(formData).forEach(([fieldName, fieldData]) => {
        defaultValues[fieldName] = fieldData.defaultValue || ''
      })
      setFormValues(defaultValues)
    } else {
      setFormValues(datosAMostrar)
    }
  }, [datosAMostrar, formData])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }))
    if (formData[name]?.validate) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: formData[name].validate?.(value) || ''
      }))
    }
    if (onChanges) {
      onChanges(name, value)
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const errors: Record<string, string> = {}
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      if (fieldData.required && !formValues[fieldName]) {
        errors[fieldName] = `${fieldName} is required`
      }
      if (fieldData.validate) {
        const error = fieldData.validate(formValues[fieldName] || '')
        if (error) {
          errors[fieldName] = error
        }
      }
    })
    if (Object.keys(errors).length === 0) {
      onSubmitFunction(formValues)
    } else {
      setFormErrors(errors)
    }
  }

  const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    )

  const formChunks = chunk(Object.entries(formData), noColumnas)

  return (
    <form onSubmit={handleSubmit} className="container">
      {formChunks.map((formChunk, index) => (
        <div key={index} className="row">
          {formChunk.map(([fieldName, fieldData]) => (
            <div key={fieldName} className={`col-md-${12 / noColumnas} mb-4`}>
              <div className="form-group">
                {fieldData.type === 'select' && fieldData.url ? (
                  <SelectLlaveForanea
                    label={fieldData.label || fieldName}
                    name={fieldName}
                    url={fieldData.url}
                    value={formValues[fieldName] || ''}
                    required={fieldData.required}
                    className="form-control"
                    onChange={handleChange}
                    camposAMostrar={fieldData.camposAMostrar || []}
                    join={fieldData.join || ''}
                    returnData={fieldData.returnData}
                    dataToReturn={dataToReturn}
                    placeholder={fieldData.placeholder}
                  />
                ) : (
                  <></>
                )}
                {!fieldData.url ? (
                  <InputGenerico
                    onChange={handleChange}
                    type={fieldData.type}
                    name={fieldName}
                    value={formValues[fieldName] || ''}
                    required={fieldData.required}
                    label={fieldData.label || fieldName}
                    className="form-control"
                    placeholder={fieldData.placeholder}
                    autoComplete={fieldData.autoComplete}
                    defaultValue={fieldData.defaultValue}
                    disabled={fieldData.disabled}
                    icon={fieldData.icon}
                  />
                ) : (
                  <></>
                )}

                {formErrors[fieldName] && (
                  <div className="invalid-feedback">
                    {formErrors[fieldName]}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className={`text-${alinearBoton}`}>
        <button type="submit" className="btn bg-pateleta-600">
          {textoBoton}
        </button>
      </div>
    </form>
  )
}

export default FormularioPropio
