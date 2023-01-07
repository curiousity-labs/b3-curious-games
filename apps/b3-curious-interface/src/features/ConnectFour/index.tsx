import { Flex, HStack, keyframes } from '@chakra-ui/react'
import { ConnectSquare } from './types'
import { colArr, rowArr } from './constants'
import { useMemo, useState } from 'react'
import { GameContainer } from './components/GameContainer'
import { SquareFrame } from './components/SquareFrame'
import { SquareCenter } from './components/SquareCenter'

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
                return (
                  <SquareFrame
                    key={square.location}
                    square={square}
                  >
                    <SquareCenter square={square} />
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
