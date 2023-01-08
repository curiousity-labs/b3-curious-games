import { Button, Flex } from '@chakra-ui/react'
import { ConnectSquare } from './types'
import { colArr, rowArr } from './constants'
import { useMemo, useRef, useState } from 'react'
import { GameContainer } from './components/GameContainer'
import { SquareFrame } from './components/SquareFrame'
import { SquareCenter } from './components/SquareCenter'
import { ChipFalling } from './components/ChipFalling'

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
        if (square.location === 'a1') {
          return { ...square, isPiecePlaced: true }
        }
        if (square.location === 'ax') {
          return { ...square, isPiecePlaced: true }
        }
        return square
      }),
    )
  }, [chessBoardData])

  // @dev pieces should only animate when this is true.
  const [isAnimating, setIsAnimating] = useState(false)


  const fallingChipRef = useRef<HTMLDivElement>(null)

  return (
    <Flex justifyContent="center" h='full'>
      <GameContainer>
        {updatedConnectboard.map((row, i) => {
          return (
            <Flex key={i} rounded="lg">
              {row.map((square) => {

                return (
                  <SquareFrame
                    key={square.location}
                    square={square}
                  >
                    <ChipFalling square={square} ref={fallingChipRef} />
                    <SquareCenter square={square} fallingChipRef={fallingChipRef} />
                  </SquareFrame>
                )
              })}
            </Flex>
          )
        })}
      </GameContainer>
      <Button>Pick Col 1</Button>
    </Flex>
  )
}
