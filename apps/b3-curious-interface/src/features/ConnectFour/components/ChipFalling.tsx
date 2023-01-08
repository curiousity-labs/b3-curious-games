import { Box, keyframes, forwardRef } from '@chakra-ui/react';
import { ConnectSquare } from '../types'

const animateDownTraveling = keyframes`
0%   { opacity: 100% }
100% { opacity: 100%;  transform: translateY(700%) }
`
const animationDownTraveling = `${animateDownTraveling} 6s 1`

interface IChipFalling {
  square: ConnectSquare;
}

export const ChipFalling = forwardRef<IChipFalling, 'div'>(({square}, ref) => {
  const isOutOfBounds = square.location.includes('x')

  if (square.isPiecePlaced && isOutOfBounds) {
    return (
      <Box
        ref={ref}
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
    )
  }
  return null
})