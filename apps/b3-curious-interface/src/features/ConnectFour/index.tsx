import { Box, Flex, HStack, keyframes } from '@chakra-ui/react'
import { ConnectSquare } from './types'
import { colArr, rowArr } from './constants'
import { useMemo, useRef, useState } from 'react'
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
        if (square.location === 'a1') {
          return { ...square, Piece: true }
        }
        if (square.location === 'ax') {
          return { ...square, Piece: true }
        }
        return square
      }),
    )
  }, [chessBoardData])

  // @dev pieces should only animate when this is true.
  // @todo ensure that pieces not on the move don't animate as well.
  const [travelingPiece, setTravelingPiece] = useState<NewPiece>()
  const [isAnimating, setIsAnimating] = useState(false)
  type NewPiece = {
    isTraveling: boolean,
    transitionDelay: number,
    finalLocation: string, // a1
  }

  const animateDownTraveling = keyframes`
  0%   { opacity: 100% }
  100% { opacity: 100%;  transform: translateY(700%) }
`
  const animationDownTraveling = `${animateDownTraveling} 6s 1`

  const fallingPieceRef = useRef<HTMLDivElement>(null)

  return (
    <Flex justifyContent="center" h='full'>
      <GameContainer>
        {updatedConnectboard.map((row, i) => {
          return (
            <Flex key={i} rounded="lg">
              {row.map((square) => {
                const isOutOfBounds = square.location.includes('x')
                return (
                  <SquareFrame
                    key={square.location}
                    square={square}
                  >
                    {square.Piece && isOutOfBounds && (
                      <Box
                        ref={fallingPieceRef}
                        w='full'
                        h='full'
                        rounded='full'
                        bg='green.500'
                        animation={isOutOfBounds ? animationDownTraveling : undefined}
                        boxSize="6rem"
                        position='absolute'
                        opacity='0'
                        transform='translateY(-150%)'
                      />
                    )}
                    <SquareCenter square={square} fallingPieceRef={fallingPieceRef} />
                  </SquareFrame>
                )
              })}
            </Flex>
          )
        })}
      </GameContainer>
    </Flex>
  )
}
