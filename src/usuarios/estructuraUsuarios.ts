import { FormularioEstructura } from '../components/Formularios/type'

export const estructuraUsuario: FormularioEstructura = {
  nombre: {
    label: 'Nombre',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el nombre de tu usuario'
  },
  apellido: {
    label: 'Apellido',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el apellido de tu usuario'
  },
  correo: {
    label: 'Correo',
    type: 'email',
    required: true,
    placeholder: 'Ingresa el correo de tu usuario'
  },
  password: {
    label: 'Contraseña',
    type: 'password',
    required: true,
    placeholder: 'Ingresa la contraseña de tu usuario'
  },
  rol_id: {
    label: 'Rol',
    type: 'select',
    required: true,
    placeholder: 'Selecciona el rol de tu usuario',
    url: 'roles',
    camposAMostrar: ['nombre']
  }
}
