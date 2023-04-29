import { Box, Heading, Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react"
import { Chart } from "features/charts/types"
import { map } from "ramda"


const Info = ({ items }: { items: Chart['items'] }) => {
  return (
    <Box
      height='100%'
      width='100%'
      gridGap='10px'
      display='grid'
    >
      {map((item) => (
        <Box
          borderRadius='40px' 
          padding='20px'
          key={item.id}
          boxShadow='lg'
          overflow='hidden'
          bg={useColorModeValue('white', 'gray.700')}
        >
        <Stat>
          <StatLabel ><Heading>{item.title}</Heading></StatLabel>
          <StatNumber fontSize='4em'  lineHeight='0.8'>{Intl.NumberFormat('ru', {notation: "compact"}).format(item.value)}</StatNumber>
        </Stat>
        </Box>), 
        items
      )}
    </Box>
  )
}

export { Info }