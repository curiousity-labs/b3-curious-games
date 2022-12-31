import { Box, Center, Flex, IconButton } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { PiecesType, ShipOrientation } from '../types'
import { RepeatIcon } from '@chakra-ui/icons'
import { pieces } from '../constants'
import { Piece } from '../models'
import { Check } from '@decent-org/fractal-ui'
export const ShipPiece = () => {
  return (
    <Center bg='grayscale.400' p='0.5rem'>
      <Center boxSize={4} bg='black.400' rounded='100%'></Center>
    </Center>
  )
}

interface IShipSelection {
  ships: Piece[]
  selectShip: Dispatch<SetStateAction<PiecesType>>
  selectedShip: PiecesType
  shipOrientation: ShipOrientation[]
  setShipOrientation: Dispatch<SetStateAction<ShipOrientation[]>>
}

export function ShipSelection({ ships, selectShip, selectedShip, shipOrientation, setShipOrientation }: IShipSelection) {
  const updateShipOrientation = () => {
    setShipOrientation(prev => {
      const previous = [...prev]
      previous[Number(selectedShip)] = prev[Number(selectedShip)] === ShipOrientation.Horizontal ? ShipOrientation.Veritical : ShipOrientation.Horizontal
      return previous
    })
  }

  return (
    <Flex flexDirection='column' gap={4} w="full">
      <Flex border='1px' borderColor='chocolate.100' h='16' w='full' alignItems='center' justifyContent='center' gap='0.1rem'>
        <IconButton aria-label='rotate' icon={<RepeatIcon boxSize='2rem' />} w='full' h='full' rounded='none' onClick={updateShipOrientation} />
      </Flex>
      <Flex alignItems='center' justifyContent='space-around' gap={4} flexWrap='wrap' h='full'>
        {pieces.map((pieceSize) => {
          const isPieceSet = ships.some(ship => ship.locations.length === pieceSize)
          return (
            <Flex
              flexDirection={shipOrientation[pieceSize] === ShipOrientation.Horizontal ? 'row' : 'column'}
              key={pieceSize}
              border='2px'
              borderColor={selectedShip === pieceSize ? 'gold.500' : 'chocolate.100'}
              p={4}
              _hover={{
                borderColor: selectedShip === pieceSize ? 'gold.500' : 'chocolate.300'
              }}
              boxSize="11rem"
              cursor={isPieceSet ? 'defai;t' : 'cursor'}
              alignItems='center'
              justifyContent='center'
              gap='0.1rem'
              position="relative"
              onClick={() => {
                if (!isPieceSet) {
                  selectShip(pieceSize)
                }
              }}
            >
              {new Array(pieceSize).fill(0).map((_, i) => (
                <ShipPiece key={i} />
              ))}
              {isPieceSet && (
                <Flex position="absolute" justifyContent="center" alignItems="center" bg="#00000099" w="full">
                  <Box><Check boxSize="4rem" color="green.500" /></Box>
                </Flex>
              )}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}
