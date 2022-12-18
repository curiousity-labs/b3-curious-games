import { Box, Center, Flex, HStack } from '@chakra-ui/react'
import { BSquare } from './types'
import { colLoc, rowLoc } from './constants'

export function Battleship() {
  const  teamOneBoard: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = hPos + vPos
        return {
          location,
        }
      }),
    )
    .reverse()
  const teamTwoBoard: BSquare[][] = colLoc
    .map((vPos) =>
      rowLoc.map((hPos) => {
        const location = hPos + vPos
        return {
          location,
        }
      }),
    )
    .reverse()

  return (
    <Center minH='100vh'>
      <HStack>
        <Box>
          {teamOneBoard.map((row, i) => {
            return (
              <HStack key={i} gap='0'>
                {row.map((square) => {
                  // @todo should only be green when its thats team turn
                  return (
                    <Center
                      key={square.location}
                      bgGradient='linear(to-bl, blue.400, blue.500)'
                      border='1px'
                      borderStyle="dotted"
                      borderColor="blue.900"
                      w={12}
                      h={12}
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
                    ></Center>
                  )
                })}
              </HStack>
            )
          })}
        </Box>
        <Box>

          {teamTwoBoard.map((row, i) => {
            return (
              <HStack key={i} gap='0'>
                {row.map((square) => {
                  // @todo should only be green when its thats team turn
                  return (
                    <Center
                      key={square.location}
                      bgGradient='linear(to-br, blue.400, blue.500)'
                      border='1px'
                      borderStyle="dotted"
                      borderColor="blue.900"
                      w={12}
                      h={12}
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
                    ></Center>
                  )
                })}
              </HStack>
            )
          })}
        </Box>
      </HStack>
    </Center>
  )
}
