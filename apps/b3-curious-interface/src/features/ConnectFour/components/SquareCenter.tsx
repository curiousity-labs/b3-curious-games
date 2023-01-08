import { useEffect, useRef } from 'react'
import { ConnectSquare } from '../types'
import { Box } from '@chakra-ui/react'

export function SquareCenter({ square, fallingChipRef }: { square: ConnectSquare, fallingChipRef: React.RefObject<HTMLDivElement> }) {
  const locationRef = useRef<HTMLDivElement>(null)
  const isOutOfBounds = square.location.includes('x')


  useEffect(() => {
    const fallingPieceEle = fallingChipRef.current
    const locationEle = locationRef.current
    let intervalId: NodeJS.Timer
    // @todo add animation boolean? remove ref?
    if (fallingPieceEle && locationEle && !isOutOfBounds) {
      fallingPieceEle.addEventListener('animationstart', () => {
        intervalId = setInterval(() => {
          const fallingRect = fallingPieceEle.getBoundingClientRect()
          const locationRect = locationEle.getBoundingClientRect()
          const fallingRectbottom = Math.round(fallingRect.bottom)
          const lrt = locationRect.top
          const lrb = locationRect.top + 96
          if (square.isPiecePlaced) {
            if (fallingRectbottom >= lrt && fallingRectbottom <= lrb) {
              console.log('BOOOM')
              // @todo when it collides with piece below; end animation; add piece in spot
              clearInterval(intervalId)
            }
            return;
          }
          clearInterval(intervalId)
        }, 1)
        fallingPieceEle.addEventListener('animationend', () => {
          clearInterval(intervalId)
        })
      })
      return () => {
        fallingPieceEle.removeEventListener('animationstart', () => { })
      }
    }
  }, [fallingChipRef, square, isOutOfBounds])
  return (
    <Box ref={locationRef}>
      {square.isPiecePlaced && !isOutOfBounds && (
        <Box boxSize={20} bg="white" rounded="full"></Box>
      )}
    </Box>
  )
}
