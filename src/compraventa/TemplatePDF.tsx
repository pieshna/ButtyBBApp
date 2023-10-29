import {
  Document,
  Page,
  PDFViewer,
  PDFDownloadLink,
  Text,
  View,
  Image
} from '@react-pdf/renderer'
import { cssPDF } from './estilosPDF'
import { useEffect, useRef } from 'react'

export interface TemplatePDFProps {
  cantidad: number
  cliente_nombre: string
  correo: string
  descripcion: string
  empleado: string
  fecha: string
  nit: string
  producto_nombre: string
  precio_venta: number
  subtotal: number
  total: number
  venta_id: number
  id: number
  created_at: string
}

interface props {
  datos: TemplatePDFProps[]
  descargar?: boolean
}

function TemplatePDF({ datos, descargar = false }: props) {
  const style = cssPDF

  const download = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    setTimeout(() => {
      if (download.current) {
        download.current.click()
      }
    }, 1000)
  }, [])

  const parseFecha = (date: string) => {
    const fecha = new Date(date)
    return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
  }

  const getCorrelativo = (fecha: string) => {
    const date = new Date(fecha)
    const correlativo = `${date.getFullYear().toString().slice(0, 2)}${
      date.getMonth() + 1
    }${date.getDate()}${date
      .getFullYear()
      .toString()
      .slice(2)}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
    return correlativo
  }

  const getTotal = () => {
    let total = 0
    datos.map((item) => {
      const subtotal = parseFloat(item.subtotal.toString())
      total += subtotal
    })
    return total.toFixed(2)
  }

  const documento = () => {
    return (
      <Document>
        <Page size={'A4'} style={[style.contenedor]}>
          <Text style={[style.marcaDeAgua]}>DEMO</Text>
          <View style={[style.flexColumn, style.height100]}>
            <View
              style={[
                style.flexRow,
                style.justifyBetween,
                style.itemsCenter,
                style.contenedor
              ]}
            >
              <Image src="/logo.png" style={style.logo} />
              <Text>
                Factura:{' '}
                {datos[0].venta_id + getCorrelativo(datos[0].created_at)}
              </Text>
            </View>
            <View
              style={[
                style.flexRow,
                style.justifyBetween,
                style.contenedor,
                style.espacio2
              ]}
            >
              <Text>Cajero: {datos[0].empleado}</Text>
              <Text>Fecha: {parseFecha(datos[0].fecha)}</Text>
            </View>
            <View style={[style.flexColumn, style.contenedor, style.gap]}>
              <Text>NIT: {datos[0].nit}</Text>
              <Text>Cliente: {datos[0].cliente_nombre}</Text>
            </View>
            <View style={[style.flexGrow, style.contenedor]}>
              <View
                style={[
                  style.flexRow,
                  style.justifyBetween,
                  style.border,
                  style.contenedor
                ]}
              >
                <Text style={style.tableHeader}>Producto</Text>
                <Text style={style.tableHeader}>Cantidad</Text>
                <Text style={style.tableHeader}>Precio</Text>
                <Text style={style.tableHeader}>Subtotal</Text>
              </View>
              <View>
                {datos.map((item) => (
                  <View
                    style={[
                      style.flexRow,
                      style.justifyBetween,
                      style.contenedor
                    ]}
                    key={item.id}
                  >
                    <Text style={style.tableData}>{item.producto_nombre}</Text>
                    <Text style={style.tableData}>{item.cantidad}</Text>
                    <Text style={style.tableData}>{item.precio_venta}</Text>
                    <Text style={style.tableData}>{item.subtotal}</Text>
                  </View>
                ))}
              </View>
              <View style={[style.flexRow, style.justifyEnd, style.borderTop]}>
                <View
                  style={[style.dFlex, style.justifyEnd, style.borderBottom]}
                >
                  <Text style={style.tableHeader}>Total</Text>
                  <Text style={style.tableHeader}>Q. {getTotal()}</Text>
                </View>
              </View>
            </View>
            <View style={style.textCenter}>
              <View style={[style.flexColumn]}>
                <Text>ButtyBB</Text>
                <Text>buttybb@gmail.com</Text>
                <Text>Chiquimula, Guatemala</Text>
                <Text>+502 4224-7577</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    )
  }

  const verPDF = () => {
    return (
      <PDFViewer width={'100%'} height={'100%'} style={{ border: 'none' }}>
        {documento()}
      </PDFViewer>
    )
  }

  const descargarPDF = () => {
    return (
      <PDFDownloadLink
        document={documento()}
        fileName={`factura-${getCorrelativo(datos[0].created_at)}.pdf`}
      >
        <button style={{ display: 'none' }} ref={download}>
          Descargar
        </button>
      </PDFDownloadLink>
    )
  }

  return <>{descargar ? descargarPDF() : verPDF()}</>
}

export default TemplatePDF
