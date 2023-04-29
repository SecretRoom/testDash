import {useState, useEffect, ReactElement, useRef} from 'react'
import { Box, Radio, RadioGroup, Stack, useColorModeValue, Heading, IconButton } from '@chakra-ui/react'
import { Bar, Info, Line, Pie } from 'features/charts'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { Chart, chartTypes } from 'features/charts/types'
import { refactData } from './model'
import { isNotNil, keys, lensProp, map, view } from 'ramda'
import { DeleteIcon } from '@chakra-ui/icons'

const Charts = (type: Chart['chartType']) => (items: Chart['items']) => {
  switch (type) {
    case chartTypes['Pie']:
      return <Pie items={items} />
    case chartTypes['Line']:
      return <Line items={items} />
    case chartTypes['Bar']:
      return <Bar items={items} />
    case chartTypes['Info']:
      return <Info items={items} />
  }
}

interface ChartCardProps<T extends Chart> {
  data: T

  index: number

  dropCard: (dragIndex: number) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

const ChartCard = <T extends Chart>({ data, index, moveCard, dropCard }: ChartCardProps<T>) => {
  const [items, setItems] = useState({})
  const [number, setNumber] = useState<string>('0')
  let i = 0
  useEffect(() => {
    i = 0
    setItems(refactData(data.items))
  }, [data])
  const BoxProps = <T extends number>(type: T) => type === chartTypes['Info'] ? {} : {
    boxShadow:'lg',
    borderRadius:'40px',  
    padding:'20px',
    display:'grid',
    gridGap:'10px',
    overflow:'hidden',
    gridTemplateRows: isNotNil(data.title) ? 'max-content 1fr' : '1fr',
    bg: useColorModeValue('white', 'gray.700')
  }

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id: data.id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <Box 
      width='100%' 
      height='100%'
      minWidth='350px'
      minHeight='250px'
      ref={ref}
      data-handler-id={handlerId}
      cursor='move'
      position='relative'
      opacity={isDragging ? '0.7' : 1}
      {...BoxProps<Chart['chartType']>(data.chartType)}
    >
      <IconButton
        icon={<DeleteIcon />}
        size="lg"
        zIndex={10}
        variant="ghost"
        position='absolute'
        right='0'
        top='0'
        transform={'translate(-25%, 25%)'}
        borderRadius='40px'
        aria-label=''
        onClick={() => dropCard(data.id)}
      />
      {(keys(items).length > 1 || data.title) && (
        <Box display='flex'>
          {isNotNil(data.title) && <Heading lineHeight={1} size='md'><b>{data.title}</b></Heading>}
          {keys(items).length > 1 && 
            <RadioGroup onChange={setNumber} value={number} paddingLeft='10px' alignSelf='end'>
              <Stack direction='row'>
                {map((key: string): ReactElement => <Radio value={String(i++)} key={i}  colorScheme='purple'>{key}</Radio>, keys(items))}
              </Stack>
            </RadioGroup>
        }
        </Box>
      )}
      {Charts(data.chartType)(view(lensProp(keys(items)[+number]), items) || [])}
    </Box>
  )
}

export { ChartCard }