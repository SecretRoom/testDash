import { Box, Grid, GridItem,SkeletonText, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDashboardsA } from './api'
import { setDashboards } from './model'
import * as R from 'ramda'
import { Dashboard } from 'features/dashboard/ui'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import styles from './style.module.scss'


const DashboardList = () => {
  const {
    isLoading,
    data,
  } = useQuery(['dashboard'], async () => {
    return await getDashboardsA()
  })

  useEffect(() =>{
    setDashboards(data || [])
  }, [data])

  const bgColor = useColorModeValue('white', 'gray.700')

  return (
    <Box width='100%' height='100%' className={styles['dashboards']}>
      {isLoading ? (
        <Grid
          h='full'
          templateRows='repeat(4, 1fr)'
          templateColumns='repeat(4, 1fr)'
          gap='15px'
        >
          <GridItem overflow='hidden' rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor} >
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px' bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' colSpan={2} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' colSpan={2} rowSpan={2} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' colSpan={2} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem overflow='hidden' colSpan={4} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
        </Grid>
      ) : 
        <DndProvider backend={HTML5Backend}>
          {R.map((elem) => <Dashboard key={elem.id} data={elem} />, data || [])}
        </DndProvider>
      }
    </Box>
  )
}

export { DashboardList }
