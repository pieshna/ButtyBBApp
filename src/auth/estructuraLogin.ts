import { FormularioEstructura } from '../components/Formularios/type'

export const estructuraFormularioLogin: FormularioEstructura = {
  correo: {
    label: 'Correo electrónico',
    type: 'text',
    required: true,
    placeholder: 'Ingresa tu correo electrónico'
  },
  password: {
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Ingresa tu contraseña'
  }
}
