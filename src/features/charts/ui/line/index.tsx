import { ReactElement, useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { Chart } from '../../types';

const LineContainer = ({ items }: { items: Chart['items'] }): ReactElement => {

  const [chartData, setChartData] = useState<any>({})

  useEffect(() => {
    setChartData(items)
  }, [items])

  return (
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            // right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
  )
}

export { LineContainer as Line }
