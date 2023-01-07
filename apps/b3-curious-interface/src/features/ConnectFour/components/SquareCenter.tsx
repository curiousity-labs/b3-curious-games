import { ConnectSquare } from '../types';
import { Text, Box } from '@chakra-ui/react';

export function SquareCenter({ square }: { square: ConnectSquare }) {
  return (
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
  )
}