import { Box, Center, Flex, HStack, Text, keyframes } from '@chakra-ui/react'
import { ConnectSquare } from './types'
import { colArr, rowArr } from './constants'
import { useMemo, useState } from 'react'
import { GameContainer } from './components/GameContainer'
import { SquareFrame } from './components/SquareFrame'

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
        // if(square.location === 'xx') {
        //   return {...square, Piece: true}
        // }
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
    <Flex justifyContent="center" h='full'>
      <GameContainer>
        {updatedConnectboard.map((row, i) => {
          return (
            <HStack key={i} gap='0' rounded="lg">
              {row.map((square) => {
                const isOutOfBounds = square.location.split('').includes('x')
                if (isOutOfBounds) {
                  return (
                    <SquareFrame square={square} key={square.location}>
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
                    </SquareFrame>
                  )
                }
                // @todo should only be green when its thats team turn
                return (
                  <SquareFrame
                    key={square.location}
                    square={square}
                  >
                    <Box
                      border='4px solid'
                      borderColor='black.900'
                      bg='grayscale.100'
                      boxSize="6.5rem"
                      rounded='full'
                      shadow='0px 0px 5px 6px inset rgba(0,0,0,0.2), 0px 0px 5px 12px inset rgba(0,0,0,0.4)'
                    >
                      {square.Piece && <Box w='full' h='full' rounded='full' />}
                      <Text color='black.900' fontSize='6xl' h='full' w='full' textAlign='center'>
                        {square.location}
                      </Text>
                    </Box>
                  </SquareFrame>
                )
              })}
            </HStack>
          )
        })}
      </GameContainer>
    </Flex>
  )
}
