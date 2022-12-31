import { Button, Flex, Select, Text } from '@chakra-ui/react'
import { Formik, FormikProps } from 'formik'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as yup from 'yup'
import { PiecesType, SetPieceFormValues, ShipOrientation } from '../types'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'
import { useBattleshipProvider } from '../provider/context'
import { useBoard } from '../hooks/useBoard'
import { Board } from './Board'
import { ShipSelection } from './ShipSelection'
import { rowLoc, colLoc, initialOrientation } from '../constants'
import { Piece } from '../models'
import { createShip } from '../../../utils/battleship'

const piecesInitialValues = {
  team: '',
  ships: [] as string[],
}
const schema = yup.object().shape({
  team: yup.string().required(),
  ships: yup.array(),
})

export function GameInitilized() {
  const handleSubmit = useCallback(async () => { }, [])
  return <Formik initialValues={piecesInitialValues} validationSchema={schema} onSubmit={handleSubmit} component={SetPiecesForm} />
}

const SetPiecesForm = ({ isValid, handleSubmit, isSubmitting }: FormikProps<SetPieceFormValues>) => {
  const {
    battleshipGame: { teamOne, teamTwo, teamsReady },
  } = useBattleshipProvider()
  const navigate = useNavigate()

  const boardRef = useRef<HTMLDivElement>(null)
  const [locId, setId] = useState('')
  const [shipOrientation, setShipOrientation] = useState<ShipOrientation[]>(initialOrientation)
  const [shipLocations, setShipLocations] = useState<Piece[]>([])
  const [selectedShip, setSelectedShip] = useState<PiecesType>(PiecesType.None)

  const { board } = useBoard(shipLocations)

  const options = useMemo(() => {
    const _options = []
    const teamOneDisplayName = teamOne.ensName || teamOne.registryDAOName || teamOne.truncated
    const teamTwoDisplayName = teamTwo.ensName || teamTwo.registryDAOName || teamTwo.truncated

    if (!teamsReady.includes(teamOne.full || '')) {
      _options.push({ address: teamOne.full!, displayName: teamOneDisplayName })
    }
    if (!teamsReady.includes(teamTwo.full || '')) {
      _options.push({ address: teamTwo.full!, displayName: teamTwoDisplayName })
    }
    return _options
  }, [teamsReady, teamOne, teamTwo])

  useEffect(() => {
    const boardRefCurrent = boardRef.current
    const setIdListener = (mouseEvent: any) => {
      const id = mouseEvent.target.id
      if (id) {
        const [loc,] = id.split('-')
        setId(loc)
      }
    }
    if (boardRefCurrent) {
      boardRefCurrent.addEventListener('mouseover', setIdListener)
      boardRefCurrent.addEventListener('mouseleave', () => setId(''))
    }
    return () => {
      if (boardRefCurrent) {
        boardRefCurrent.removeEventListener('mouseover', setIdListener)
        boardRefCurrent.removeEventListener('mouseleave', () => setId(''))
      }
    }
  }, [])

  useEffect(() => {
    if (!locId) {
      setShipLocations([])
      return;
    }
    const [x, y] = locId.split('')
    const rowIndex = rowLoc.findIndex((hLoc) => hLoc === x)
    const colIndex = colLoc.findIndex((vLoc) => vLoc === y)
    switch (selectedShip) {
      case PiecesType.AIRCRAFT_CARRIER: {
        const piece = createShip({ rowIndex, pos: [x, y], shipSize: selectedShip, shipMousePiecePos: locId, shipOrientation, piecePartsEnds: [2, 2] })
        if (piece) {
          setShipLocations([piece])
        }
        break
      }
      case PiecesType.BATTLESHIP:
      case PiecesType.CRUISER:
      case PiecesType.SUBMARINE:
      case PiecesType.DESTROYER:
      case PiecesType.None:
        return
    }
  }, [locId, selectedShip, shipOrientation])

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' gap={4} bg='black.900-semi-transparent' p={4} rounded='xl' h='full'>
        <Text>Select Team you are playing for</Text>
        <Text>If team is DAO, a proposal will be created to approve transaction</Text>
        <Text>Note: proposal/transaction will be reverted if not correct team executing</Text>
        <Select>
          {options.map((option, i) => (
            <option key={i} value={option.address}>
              Team: {option.displayName}
            </option>
          ))}
        </Select>
        <Flex justifyContent='center' gap={4} flexWrap={{ sm: 'wrap', md: 'nowrap' }}>
          <ShipSelection selectShip={setSelectedShip} selectedShip={selectedShip} shipOrientation={shipOrientation} setShipOrientation={setShipOrientation} />
          <Board board={board} ref={boardRef} squareOnClick={() => { }} />
        </Flex>
      </Flex>
      <Flex my={4} justifyContent='center' gap={4}>
        <Button variant='text' onClick={() => navigate(ROUTES.battleshipLanding.relative())} disabled={false}>
          Prev
        </Button>
        <Button type='submit' disabled={!isValid || isSubmitting}>
          Submit
        </Button>
      </Flex>
    </form>
  )
}
