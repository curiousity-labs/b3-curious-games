import { Center, Flex } from '@chakra-ui/react';

export const ShipPiece = () => {
  return (
    <Center
      bg='grayscale.400'
      p='0.5rem'
    >
      <Center boxSize={4} bg='black.400' rounded='100%'>
      </Center>
    </Center>
  )
}

export function ShipSelection() {
  return (
    <Flex justifyContent="space-between">
      <Flex border="1px" borderColor="chocolate.100" h="16" w="full" alignItems="center" justifyContent="center" gap="0.1rem">
        {new Array(5).fill(0).map((_, i) => (<ShipPiece key={i} />))}
      </Flex>
      <Flex border="1px" borderColor="chocolate.100" h="16" w="full" alignItems="center" justifyContent="center" gap="0.1rem">
        {new Array(4).fill(0).map((_, i) => (<ShipPiece key={i} />))}
      </Flex>
      <Flex border="1px" borderColor="chocolate.100" h="16" w="full" alignItems="center" justifyContent="center" gap="0.1rem">
        {new Array(3).fill(0).map((_, i) => (<ShipPiece key={i} />))}
      </Flex>
      <Flex border="1px" borderColor="chocolate.100" h="16" w="full" alignItems="center" justifyContent="center" gap="0.1rem">
        {new Array(2).fill(0).map((_, i) => (<ShipPiece key={i} />))}
      </Flex>
      <Flex border="1px" borderColor="chocolate.100" h="16" w="full" alignItems="center" justifyContent="center" gap="0.1rem">
        {new Array(1).fill(0).map((_, i) => (<ShipPiece key={i} />))}
      </Flex>
    </Flex>
  )
}