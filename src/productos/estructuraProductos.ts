import { FormularioEstructura } from '../components/Formularios/type'

export const estructuraProducto: FormularioEstructura = {
  nombre: {
    label: 'Nombre',
    type: 'text',
    required: true,
    placeholder: 'Ingresa el nombre del producto'
  },
  precio_compra: {
    label: 'Precio de compra',
    type: 'number',
    required: true,
    placeholder: 'Ingresa el precio de compra del producto'
  },
  precio_venta: {
    label: 'Precio de venta',
    type: 'number',
    required: true,
    placeholder: 'Ingresa el precio de venta del producto'
  },
  unidades: {
    label: 'Unidades',
    type: 'number',
    required: true,
    placeholder: 'Ingresa las unidades del producto'
  },
  descripcion: {
    label: 'Descripcion',
    type: 'text',
    required: false,
    placeholder: 'Ingresa la descripcion del producto'
  }
}
