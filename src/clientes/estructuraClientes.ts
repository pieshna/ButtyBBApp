import { FormularioEstructura } from '../components/Formularios/type'

export const estructuraCliente: FormularioEstructura = {
  nombre: {
    label: 'Nombre',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el nombre del cliente'
  },
  apellido: {
    label: 'Apellido',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el apellido del cliente'
  },
  correo: {
    label: 'Correo',
    type: 'email',
    required: true,
    placeholder: 'Ingresa el correo del cliente'
  },
  nit: {
    label: 'NIT',
    type: 'text',
    required: true,
    placeholder: 'Ingrese el NIT del cliente'
  }
}
