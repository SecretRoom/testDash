import { Box, Grid, GridItem,SkeletonText, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import { Dashboard } from './types'


const DashboardList = () => {
  // const [dashboards, setDashboards] = useState<Dashboard[]>()
  const [isLoading] = useState<boolean>(true)
  const bgColor = useColorModeValue('white', 'gray.700')
  useEffect(() => {
    // useQueries()
  }, [])

  return (
    <Box width='100%' height='100%'>
      {isLoading ? (
        <Grid
          h='full'
          templateRows='repeat(4, 1fr)'
          templateColumns='repeat(4, 1fr)'
          gap='15px'
        >
          <GridItem rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px' bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem rowSpan={1} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem colSpan={2} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem colSpan={2} rowSpan={2} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem colSpan={2} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem colSpan={4} padding='6' boxShadow='lg' borderRadius='40px'  bg={bgColor}>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>

{/* 
          <GridItem colSpan={4} rowSpan={2} padding='6' boxShadow='lg' bg='white'>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem colSpan={2} rowSpan={3} padding='6' boxShadow='lg' bg='white'>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem>
          <GridItem colSpan={2} rowSpan={4} padding='6' boxShadow='lg' bg='white'>
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </GridItem> */}
        </Grid>
      ) : (
        <>
          Dashboards
        </>
      )}
    </Box>
  )
}

export { DashboardList }
