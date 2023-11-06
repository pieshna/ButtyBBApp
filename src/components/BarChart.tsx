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
      <div className="h-64">
        <Bar
          data={data}
          width={'auto'}
          height={'auto'}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </>
  )
}

export default BarChart
