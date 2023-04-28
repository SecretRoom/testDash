import { Box } from '@chakra-ui/react'
import { Bar, Info, Line, Pie } from 'shared/charts'
import { Chart } from 'shared/charts/types'

const Charts = {
  1: Pie,
  2: Line,
  3: Bar,
  4: Info
}

interface ChartCardProps<T extends Chart> {
  data: T
}

const ChartCard = <T extends Chart>({ data }: ChartCardProps<T>) => {
  return (
    <Box width='100%' height='100%'>
      <div className="header"></div>
      {Charts[data.chartType](data)}
    </Box>
  )
}

export { ChartCard }