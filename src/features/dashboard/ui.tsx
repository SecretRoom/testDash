import { Box, IconButton } from '@chakra-ui/react'
import { Dashboard } from 'entities/dashboards/types'
import { ChartCard } from 'widgets/charts/ui'
import { useCallback, useEffect, useState } from 'react'
import update from 'immutability-helper'
import { concat, filter, map, without } from 'ramda'
import { AddIcon } from '@chakra-ui/icons'

import style from './style.module.scss'

const Dashboard = ({ data }: { data: Dashboard }) => {
  const [cards, setCards] = useState<Dashboard['charts']>([])

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Dashboard['charts']) => {
      return update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    })
  }, [])

  const dropCard = useCallback((dropId: number) => {
    setCards((prevCards: Dashboard['charts']) => filter(({id}) => id !== dropId, prevCards))
  }, [cards, data])

  const renderCard = useCallback(
    (chart: any, index: number) => {
      return (
        <ChartCard
          key={chart.id}
          data={chart}   
          index={index}
          dropCard={dropCard}
          moveCard={moveCard}
        />
      )
    },
    [],
  )

  const addCard = useCallback(() => {

    setCards((prevCards: Dashboard['charts']) => concat(prevCards, filter(({id}) => id === without(map((item) => item.id, cards), map((item) => item.id, data.charts))[0], data.charts)))
  }, [cards, data])

  useEffect(() => {
    setCards(data.charts)
  }, [data])

  return (
    <Box className={style['dashboard']}>
      {cards.map((chart, i) => renderCard(chart, i))}
      {cards.length < data.charts.length && (
        <Box
          width='100%' 
          height='100%'
          minWidth='350px'
          minHeight='250px'
          position='relative'
        >
          <IconButton
            icon={<AddIcon />}
            size="lg"
            zIndex={10}
            variant="ghost"
            position='absolute'
            right='50%'
            top='50%'
            transform={'translate(50%, -50%)'}
            borderRadius='40px'
            aria-label=''
            onClick={addCard}
          />
        </Box>
      )}
    </Box>
  )
}

export { Dashboard }