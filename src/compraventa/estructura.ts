import { FormularioEstructura } from '../components/Formularios/type'

export const estructuraCompra: FormularioEstructura = {
  producto_id: {
    label: 'Producto',
    placeholder: 'Seleccione un producto',
    type: 'select',
    required: true,
    url: 'productos/with-stock',
    camposAMostrar: ['nombre'],
    returnData: true
  },
  unidades: {
    label: 'Cantidad a comprar',
    placeholder: 'Ingrese la cantidad',
    type: 'number',
    required: true
  }
}
