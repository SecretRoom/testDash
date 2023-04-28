import { ReactElement, useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import * as R from 'ramda'
// import './style.sass'
import { uniqueId } from 'lodash';
import { COLORS } from '../../constant';
import { Chart } from '../../types';

// type LineContainerProps = {
//   data: LineDataInterface
//   config?: {
//     width?: string|number
//     height?: string|number
//     isLegend?: boolean
//     isTitleX?: boolean
//     type?: 'number'|'category'
//     tickCount?: number
//     ticks?: number[]
//     minY?: number|'dataMin'|'auto'|string
//     maxY?: number|'dataMax'|'auto'|string
//   }

//   onDecompose?: (data: any) => void
// }

const LineContainer = ({ items }: Chart): ReactElement => {
  const [numberLine, setNumberLine] = useState<number>(0)

  const [tickCount] = useState<number>(5)
  const [activeLine, setActiveLine] = useState<string>('')
  const [type] = useState<'number'|'category'>('number')

  const [chartData, setChartData] = useState<any>({})

  let index = 0

  const renderCustomizedTooltip = ({ active, payload, label }: any): any => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label"><b>{payload[0].payload?.title || label}</b></p>
          {R.map((item) => {
            return (
              <p
                className="label"
                style={{ color: item.stroke }}
                key={item.payload.id + item.xlinkTitle}
              >
                {`${ R.view(R.lensProp(item.xlinkTitle), item.payload)}: ${item.value}`}
              </p>
            )
          }, payload)}
        </div>
      );
    }

    return null;
  };

  const handleMouseEnter = ({ dataKey }: any): void => {
    setActiveLine(dataKey)
  };

  const handleMouseLeave = (): void => {
    setActiveLine('')
  };

  const getOpacity = (item: string): number => {
    if (!R.isEmpty(activeLine)) {
      if (activeLine === item) {
        return 1
      }
      return 0.5
    }
    return 1
  }

  const getStrokeWidth = (item: string): number => {
    if (!R.isEmpty(activeLine)) {
      if (activeLine === item) {
        return 2
      }
      return 1
    }
    return 1
  }

  const customizedLabel = ({ x, y, stroke, value }: any): any => (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={16} textAnchor="middle">
      {value}
    </text>
  )

  const customizedAxisTick = ({ x, y, payload }: any): any => (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        className="axis-tick"
      >
        {payload.value}
      </text>
    </g>
  )

  useEffect(() => {
    setChartData(
      R.map((item: any) => {
        index = 0
        return R.mergeAll(
          R.concat(
            [{ ...item, id: uniqueId() }],
            R.map(
              (elem: any) => R.assoc(
                `title${index}`,
                elem?.title,
                R.assoc(`value${index++}`, +elem?.value, {}),
              ),
              item?.values,
            ),
          ),
        )
      }, items || []),
    )
    setNumberLine(index)
    index = -1
  }, [items])

  // useEffect(() => {
  //   setType(config?.type || 'number')
  //   if (config?.type !== 'category') {
  //     setTickCount(config?.tickCount || 5)
  //   }
  // }, [config])

  return (
    <div
      className="chart-line_content"
    >
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            // left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Legend
            iconSize={30}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            formatter={(_value: unknown, entry: any): ReactElement => {
              const { color } = entry ;
              return <span style={{ color }}>{R.view(R.lensProp(entry.payload.xlinkTitle), chartData[0])}</span>
            }}
          />
          <XAxis dataKey="name" tick={ customizedAxisTick} />
          <YAxis
            type={type}
            tickCount={tickCount}
            // ticks={config?.ticks}
            domain={[0,'auto']}
          />
          <Tooltip content={renderCustomizedTooltip} />
          {R.map((item) => (
            <Line
              key={item}
              type="monotone"
              activeDot={{ r: 8 }}
              stroke={COLORS[item]}
              dataKey={`value${item}`}
              xlinkTitle={`title${item}`}
              opacity={getOpacity(`value${item}`)}
              strokeWidth={getStrokeWidth(`value${item}`)}
            >
              {`value${item}` === activeLine && <LabelList content={customizedLabel} />}
            </Line>
          ), R.range(0, numberLine))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export { LineContainer as Line }
