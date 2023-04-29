import { ReactElement } from 'react'
import { 
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import { COLORS } from '../../constant';
import { Chart } from '../../types';
import './style.scss'

const PieContainer = ({ items }: { items: Chart['items'] }): ReactElement => {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any): any => {
    const radius: any = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x: any = cx + radius * Math.cos(-midAngle * RADIAN);
    const y: any = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart >
          <Legend
            iconSize={30}
            align="right"
            layout="vertical"
            verticalAlign="middle"
          />
          <Pie
            data={items}
            animationBegin={200}
            animationDuration={800}
            innerRadius='60%'
            outerRadius='90%'
            fill="#8884d8"
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {items.map((_entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  )
}

export { PieContainer as Pie }
