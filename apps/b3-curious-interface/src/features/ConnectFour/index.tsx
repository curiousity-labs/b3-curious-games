import { Box, Center, HStack, Text, keyframes } from '@chakra-ui/react'
import { ConnectSquare } from './types'
import { colArr, rowArr } from './constants'
import { useMemo, useState } from 'react'
import { GameContainer } from './components/GameContainer'

export function ConnectFour() {
  const chessBoardData: ConnectSquare[][] = colArr
    .map((vPos) =>
      rowArr.map((hPos) => {
        const location = hPos + vPos
        if ([vPos, hPos].includes('x')) {
          return {
            location,
            color: '',
          }
        }
        return {
          location: location,
          color: 'gold.500',
        }
      }),
    )
    .reverse()

  const updatedConnectboard = useMemo(() => {
    return chessBoardData.map((col) =>
      col.map((square) => {
        if(square.location === 'xx') {
          return {...square, Piece: true}
        }
        return square
      }),
    )
  }, [chessBoardData])

  const animateRight = keyframes`
  0%   { transform: translateX(-150%) }
  100% { transform: translateX(150%) }
`
  // @dev pieces should only animate when this is true.
  // @todo ensure that pieces not on the move don't animate as well.
  const [isAnimating, setIsAnimating] = useState('')

  const animationRight = `${animateRight} 2s 1 `

  return (
    <Center h='full'>
      <GameContainer>
        {updatedConnectboard.map((row, i) => {
          return (
            <HStack key={i} gap='0'>
              {row.map((square) => {
                const isOutOfBounds = square.location.split('').includes('x')
                if (isOutOfBounds) {
                  return (
                    <Center id={square.location} key={square.location} bg={square.color} w={40} h={40} position='relative' overflow='hidden'>
                      {square.Piece && (
                        // @todo create Piece.
                        <Box
                          position='absolute'
                          boxSize={36}
                          bg='green.500'
                          // @todo if piece exists; pieceDir, isFinalDestination
                          animation={square.Piece && animationRight}
                          transition='transform 4s'
                        ></Box>
                      )}
                    </Center>
                  )
                }
                // @todo should only be green when its thats team turn
                return (
                  <Center
                    key={square.location}
                    bg={square.color}
                    w={40}
                    h={40}
                    border={isOutOfBounds ? '8px solid' : undefined}
                    borderColor='gold.500'
                    sx={{
                      '&': {
                        WebkitMarginStart: '0px !important',
                        marginInlineStart: '0px',
                      },
                      '&:hover': {
                        border: square.Piece ? '4px' : '2px',
                        borderColor: square.Piece ? 'green.500' : 'grayscale.200',
                      },
                    }}
                  >
                    <Box
                      border='4px solid'
                      borderColor='black.900'
                      bg='grayscale.100'
                      boxSize={36}
                      rounded='full'
                      shadow='0px 0px 5px 6px inset rgba(0,0,0,0.2), 0px 0px 5px 12px inset rgba(0,0,0,0.4)'
                    >
                      {square.Piece && <Box w='full' h='full' rounded='full' />}
                      <Text color='black.900' fontSize='6xl' h='full' w='full' textAlign='center'>
                        {square.location}
                      </Text>
                    </Box>
                  </Center>
                )
              })}
            </HStack>
          )
        })}
      </GameContainer>
    </Center>
  )
}
