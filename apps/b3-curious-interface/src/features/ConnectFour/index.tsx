import { Box, Center, HStack } from '@chakra-ui/react';
import { ConnectSquare } from './types';
import { colArr, rowArr } from './constnats';
import { useMemo } from 'react';
import { GameContainer } from './components/GameContainer';

export function ConnectFour() {
  const chessBoardData: ConnectSquare[][] = colArr.map((vPos) => rowArr.map((hPos) => {
    const location = hPos + vPos
    return {
      location: location,
      color: 'gold.500'
    }
  })).reverse()

  const updatedConnectboard = useMemo(() => {
    return chessBoardData.map(col => col.map((row) => {
      if(row.location === 'a3') {
        return {...row, Piece: true}
      }
      return row
    }))
  }, [chessBoardData])

  return (
    <Center h="full">
      <GameContainer>
        {updatedConnectboard.map((row, i) => {
          return (
            <HStack key={i} gap="0">
              {row.map((square) => {
                // @todo should only be green when its thats team turn
                return <Center key={square.location} bg={square.color} w={40} h={40} border="8px solid" borderColor="gold.500" sx={{
                  '&': {
                    'WebkitMarginStart': '0px !important',
                    'marginInlineStart': '0px'
                  },
                  '&:hover': {
                    border: square.Piece ? '4px' : '2px',
                    borderColor: square.Piece ? 'green.500' : 'grayscale.200'
                  }
                }
                }>
                  <Box border="4px solid" borderColor="black.900" bg="grayscale.100" boxSize={36} rounded="full" shadow="0px 0px 5px 6px inset rgba(0,0,0,0.2), 0px 0px 5px 12px inset rgba(0,0,0,0.4)">
                    {square.Piece && <Box w="full" h="full" rounded="full"  />}
                  </Box>
                </Center>
              })}
            </HStack>
          )
        })}
      </GameContainer>
    </Center>
  )
}