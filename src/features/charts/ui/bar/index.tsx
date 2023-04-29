import { ReactElement } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '../../constant';
import { Chart } from '../../types';



const BarContainer = ({ items }: { items: Chart['items'] }): ReactElement => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        // width={500}
        // height={300}
        data={items}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar 
          dataKey="value"
          fill={COLORS[0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { BarContainer as Bar }
