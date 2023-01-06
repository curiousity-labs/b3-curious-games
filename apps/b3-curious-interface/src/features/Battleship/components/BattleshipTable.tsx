import { Button, Flex, Skeleton, SkeletonText, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { constants } from 'ethers'
import { addressSubString } from '../../../utils/string'
import { useNavigate } from 'react-router-dom'
import { useAddressLookup } from '../../../hooks/utils/useAddressLookup'

interface IBattleshipTable {
  games: any[]
}

export function BattleshipTable({ games }: IBattleshipTable) {
  return (
    <TableContainer>

      <Table variant='striped'>
        <Thead textStyle='text-base-mono-bold'>
          <Tr>
            <Th>Game Address</Th>
            <Th>Team One</Th>
            <Th>Team Two</Th>
            <Th>game Status</Th>
            <Th isNumeric>current Turn</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody textStyle='text-lg-sans-regular'>
          {games.map((gameAddress) => <TableBodyRow key={gameAddress.gameAddress} game={gameAddress} />)}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export function TableBodyRow({ game }: { game: any }) {
  const navigate = useNavigate()
  const teamOneDisplayName = game.teamOne.ensName || game.teamOne.registryDAOName || game.teamOne.truncated
  const teamTwoDisplayName = game.teamTwo.ensName || game.teamTwo.registryDAOName || game.teamTwo.truncated

  const isGameOver = game.winner !== constants.AddressZero
  const isTeamOneWinner = game.winner === game.teamOneAddress && isGameOver
  const isTeamTwoWinner = game.winner === game.teamTwoAddress && isGameOver



  return (
    <Tr>
      <Td>{addressSubString(game.gameAddress)}</Td>
      <Td>
        <SkeletonText isLoaded={!!teamOneDisplayName} startColor="grayscale.200">
          {teamOneDisplayName}
        </SkeletonText>
      </Td>

      <Td>

        <SkeletonText isLoaded={!!teamTwoDisplayName} startColor="grayscale.200">
          {teamTwoDisplayName}
        </SkeletonText>
      </Td>

      <Td>ONGOING</Td>
      <Td isNumeric>12</Td>
      <Td>
        <Flex justifyContent="flex-end">
          <Button variant='secondary'>View Game</Button>
        </Flex>
      </Td>
    </Tr>
  )
}