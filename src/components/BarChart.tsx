import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export interface BarChartProps {
  datosConfig: {
    labels: string[]
    datos: number[]
    colores: string[]
  }
}

const BarChart = ({ datosConfig }: BarChartProps) => {
  const data = {
    labels: datosConfig.labels,
    datasets: [
      {
        label: '',
        data: datosConfig.datos,
        backgroundColor: datosConfig.colores,
        borderColor: datosConfig.colores,
        borderWidth: 1
      }
    ]
  }
  return (
    <>
      <div className="row d-flex mb-5 mt-1">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-auto d-flex flex-col">
            <Bar data={data} />
            <div className="d-flex justify-content-center align-items-center"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BarChart
