import { StyleSheet } from '@react-pdf/renderer'
export const cssPDF = StyleSheet.create({
  logo: {
    width: '75px'
  },
  height100: {
    height: '100%'
  },
  dFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  itemsCenter: {
    alignItems: 'center'
  },
  gap: {
    gap: '10px'
  },
  contenedor: {
    width: '100%',
    padding: '10px'
  },
  border: {
    border: '1px solid black'
  },
  borderTop: {
    borderTop: '1px solid black'
  },
  borderBottom: {
    borderBottom: '1px solid black'
  },
  tableHeader: {
    padding: '5px'
  },
  tableData: {
    padding: '5px'
  },
  marcaDeAgua: {
    position: 'absolute',
    top: '50%',
    left: '35%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    opacity: 0.1,
    fontSize: '100px',
    color: 'red'
  },
  espacio1: {
    marginBottom: '10px'
  },
  espacio2: {
    marginBottom: '20px'
  },
  flexGrow: {
    flexGrow: 1
  },
  textCenter: {
    textAlign: 'center'
  },
  textSm: {
    fontSize: '10px'
  }
})
