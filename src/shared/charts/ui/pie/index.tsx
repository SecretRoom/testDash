import { ReactElement, useState } from 'react'
import { 
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  PieLabelRenderProps,
} from 'recharts';
import * as R from 'ramda'
import { COLORS } from '../../constant';
import { Chart } from '../../types';
import './style.scss'

const PieContainer = ({ items }: Chart): ReactElement => {

  const [activeSector, setActiveSector] = useState<string>('')
  const [activeItemLegend] = useState<string>('')

  let index = 0
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, decompose }: PieLabelRenderProps): any => {
    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.6;
    const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
    const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);
    const str = `${(Number(percent) * 100).toFixed(0)}% (${value})`
    return (
      <>
        <text
          x={x}
          y={y}
          fill="white"
          className="custom-label"
          dominantBaseline="central"
          textAnchor={x > Number(cx) ? 'start' : 'end'}
        >
          {str}
        </text>
        {decompose && (
          <text
            x={x + 8}
            y={y}
            fill="red"
            className="custom-label_dec"
            dominantBaseline="central"
            textAnchor={x > Number(cx) ? 'start' : 'end'}
          >
            *
          </text>
        )}
      </>
    );
  };

  const onPieEnter = ({ id }: any): void => {
    setActiveSector(id)
  }

  const onPieLeave = (): void => {
    setActiveSector('')
  }

  const getOpacity = (item: string, decompose: boolean): number => {
    if (!R.isEmpty(activeItemLegend)) {
      if (activeItemLegend === item) {
        return 1
      }
      return 0.6
    }
    return item === activeSector && decompose ? 0.8 : 1
  }

  const renderActiveShape = ({
    cx,
    cy,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    id,
    decompose,
  }: any): any => {
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          fill={fill}
          endAngle={endAngle}
          startAngle={startAngle}
          opacity={getOpacity(id, decompose)}
          stroke={activeItemLegend === id ? 'white' : ''}
          outerRadius={activeItemLegend === id ? outerRadius + 10 : outerRadius}
        />
      </g>
    );
  };

  // const handleMouseEnterLegend = ({ payload }: any): void => {
  //   setActiveItemLegend(payload.id)
  // };

  // // const handleTouchEnd = ({ payload }: any): void => {
  // //   setActiveItemLegend((prev: any) => (prev === payload.id ? '' : payload.id))
  // // };

  // const handleMouseLeaveLegend = (): void => {
  //   setActiveItemLegend('')
  // };


  return (
    <div
      className="chart-pie_content"
    >
        <ResponsiveContainer
          width='300px'
          height='300px'
        >
        <PieChart>
          {/* {rotation === 'vertical' ? (
            <Legend
              iconSize={30}
              onMouseEnter={handleMouseEnterLegend}
              onMouseLeave={handleMouseLeaveLegend}
            />
          ) : (
            <Legend
              iconSize={30}
              align="right"
              layout="vertical"
              verticalAlign="middle"
              onMouseEnter={handleMouseEnterLegend}
              onMouseLeave={handleMouseLeaveLegend}
            />
          )} */}
          <Pie
            data={items}
            cx="50%"
            cy="50%"
            animationBegin={200}
            animationDuration={800}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            label={renderCustomizedLabel}
            activeShape={renderActiveShape}
            activeIndex={R.range(0, items.length)}
          >
            {
              R.map((): ReactElement => (
                <Cell
                  key={index}
                  fill={COLORS[index++ % COLORS.length]}
                />
              ), items)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export { PieContainer as Pie }
