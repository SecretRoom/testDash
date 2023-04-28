import { ReactElement, useEffect, useState, useId } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from 'recharts';
import * as R from 'ramda'
// import './style.sass'
import { COLORS } from '../../constant';
import { Chart } from '../../types';


// type BarContainerProps = {
//   data: BarDataInterface
//   config?: {
//     width?: string|number
//     height?: string|number
//     isLegend?: boolean
//     isTitleX?: boolean
//     isTitleY?: boolean
//   }

//   onDecompose?: (data: any) => void
// }

const BarContainer = ({ items }: Chart): ReactElement => {

  const [numberBar, setNumberBar] = useState<number>(0)

  const [activeBar, setActiveBar] = useState<string>('')

  const [isStacked] = useState<boolean>(false)
  const [isVertical] = useState<boolean>(true)

  const [chartData, setChartData] = useState<any>({})

  let index = 0

  const renderCustomizedTooltip = ({ active, payload, label }: any): any => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label"><b>{label}</b></p>
          {R.map((item) => {
            return (
              <p
                className="label"
                style={{ color: item.fill }}
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
    setActiveBar(dataKey)
  };

  const handleMouseLeave = (): void => {
    setActiveBar('')
  };

  const getOpacity = (item: string): number => {
    if (!R.isEmpty(activeBar)) {
      if (activeBar === item) {
        return 1
      }
      return 0.5
    }
    return 1
  }

  const getStrokeWidth = (item: string): number => {
    if (!R.isEmpty(activeBar)) {
      if (activeBar === item) {
        return 2
      }
      return 1
    }
    return 1
  }

  const customizedLabel = ({ x, y, fill, value, width }: any): any => (
    <text
      x={!isVertical ? x + width + 5 : x}
      y={!isVertical ? y + 20 : y}
      dy={!isVertical ? 0 : -4}
      fill={fill}
      fontSize={16}
      fontWeight={600}
      textAnchor="meddium"
    >
      {value}
    </text>
  )

  const customizedAxisTick = ({ x, y, payload }: any): any => (!isVertical ? (
    <g transform={`translate(${x},${y})`}>
      <foreignObject
        x={-150}
        y={-8}
        width="100%"
        height="100%"
      >
        <div className="axis-tick__vertical">
          {payload.value}
        </div>
      </foreignObject>
    </g>
  ) : (
    <g transform={`translate(${x},${y})`}>
      <foreignObject
        x={-75}
        y={0}
        width="100%"
        height="100%"
      >
        <div className="axis-tick">
          {payload.value}
        </div>
      </foreignObject>
    </g>
  ))

  // const handleTouchEnd = ({ dataKey }: any): void => {
  //   setActiveBar((prev: any) => (prev === dataKey ? '' : dataKey))
  // };

  const id = useId()

  useEffect(() => {
    setChartData(
      R.map((item: any) => {
        index = 0
        return R.mergeAll(
          R.concat(
            [{ ...item, id: id }],
            R.map(
              (elem: any) => R.assoc(
                `title${index}`,
                elem.title,
                R.assoc(`value${index++}`, +elem.value, {}),
              ),
              item.values,
            ),
          ),
        )
      }, items || []),
    )
    setNumberBar(index)
    index = -1
    // setIsVertical(R.includes(+data.chartType, [5, 7]))
    // setIsStacked(R.includes(+data.chartType, [7, 8]))
  }, [items])

  return (
    <div
      className="chart-bar_content"
    >
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <BarChart
          data={chartData}
          layout={!isVertical ? 'vertical' : undefined}
          margin={{
            top: 5,
            right: 30,
            left: !isVertical ? 100 : 0,
            bottom: !isVertical ? 5 : 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Legend
            iconSize={30}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            formatter={(_value: any, entry: any): ReactElement => {
              const { color } = entry;
              return <span style={{ color }}>{R.view(R.lensProp(entry.payload.xlinkTitle), chartData[0])}</span>
            }}
          />
          <XAxis dataKey="name" tick={customizedAxisTick} />
          <YAxis />
          <Tooltip content={renderCustomizedTooltip} />
          <ReferenceLine y={0} stroke="#666" />
          <ReferenceLine x={0} stroke="#666" />
          {R.map((item) => (
            <Bar
              key={item}
              type="monotone"
              fill={COLORS[item]}
              maxBarSize={40}
              dataKey={`value${item}`}
              xlinkTitle={`title${item}`}
              opacity={getOpacity(`value${item}`)}
              stackId={isStacked ? 'a' : undefined}
              strokeWidth={getStrokeWidth(`value${item}`)}
            >
              {`value${item}` === activeBar && <LabelList content={customizedLabel} />}
            </Bar>
          ), R.range(0, numberBar))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export { BarContainer as Bar }
