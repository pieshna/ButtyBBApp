import { FormularioEstructura } from '../components/Formularios/type'

export const estructuraProveedor: FormularioEstructura = {
  nombre: {
    label: 'Nombre',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el nombre de tu proveedor'
  },
  telefono: {
    label: 'Telefono',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el telefono de tu proveedor'
  },
  compania: {
    label: 'Compania',
    type: 'text',
    required: true,
    placeholder: 'Ingresa la compania de tu proveedor'
  }
}
