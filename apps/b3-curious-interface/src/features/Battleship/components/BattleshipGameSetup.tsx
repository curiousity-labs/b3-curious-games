import { Button, Flex, Select, Text } from '@chakra-ui/react'
import { Formik, FormikProps, FormikHelpers } from 'formik'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as yup from 'yup'
import { PiecesType, SetPieceFormValues, ShipOrientation } from '../types'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../pages/routes'
import { useBattleshipProvider } from '../provider/context'
import { useBoard } from '../hooks/useBoard'
import { BattleshipBoard } from './BattleshipBoard'
import { ShipSelection } from './ShipSelection'
import { rowLoc, colLoc, initialOrientation } from '../constants'
import { Piece } from '../models'
import { createShip } from '../../../utils/battleship'
import { useAppProvider } from '../../../providers/store/context'
import { useTransaction } from '../../../hooks/utils/useTransaction'
import { formatMappedStrs } from '../../../utils/data'
import { PromiseOrValue } from 'b3-curious-contracts/typechain/common'
import { BytesLike, Overrides, ContractTransaction } from 'ethers'

const piecesInitialValues = {
  team: '',
  ships: [] as Piece[],
}
const schema = yup.object().shape({
  team: yup.number().required(),
  ships: yup
    .array()
    .required()
    .test(
      'name',
      (ships: Piece[] | undefined) =>
        !!ships &&
        !!ships.length &&
        ships
          .sort((a, b) => a.locations.length - b.locations.length)
          .every((ship, i) => {
            return !!ship.locations.length && ship.locations.length === i + 1
          }),
    ),
})

export function BattleshipGameSetup() {
  const {
    contracts: { b3Curious },
  } = useAppProvider()

  const { battleshipGame: { gameAddress, teamOne, teamTwo } } = useBattleshipProvider()

  const [contractCall] = useTransaction()


  const handleSubmit = useCallback(async (values: SetPieceFormValues, actions: FormikHelpers<SetPieceFormValues>) => {
    const successCallback = () => {
      actions.resetForm()
    }

    if (!b3Curious || !teamOne.full || !teamOne.full) {
      return;
    }

    const battleshipImpl = b3Curious.battleshipImpl.attach(gameAddress)
    let setFunction: (
      targets: PromiseOrValue<BytesLike>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ) => Promise<ContractTransaction>;
    if (values.team === teamOne.full) {
      setFunction = battleshipImpl.setTeamOnePieces
    }
    if (values.team === teamTwo.full) {
      setFunction = battleshipImpl.setTeamTwoPieces
    }
    const shipMapping = values.ships.map((ship) => ship.locations)
    const pieces = formatMappedStrs(shipMapping).flat();

    // is Usul; create usul proposal

    // is Multisig; create multisig proposal

    // is Usul (w/guard)l create proposal through guard?

    // is Multisig (w/guard) create proposal through guard?

    // @note if not supported Safe, creates game using connected account
    contractCall({
      contractFn: async () => setFunction(pieces),
      successMessage: 'Pieces Set! The match will begin when both teams pieces have been set',
      successCallback,
      failedMessage: 'There was a problem with the transaction',
      pendingMessage: 'Setting team pieces...',
    })

  }, [b3Curious, contractCall, gameAddress, teamOne, teamTwo])

  return <Formik initialValues={piecesInitialValues} validationSchema={schema} onSubmit={handleSubmit} component={SetPiecesForm} validateOnMount />
}

const SetPiecesForm = ({ values, isValid, handleSubmit, isSubmitting, setFieldValue, handleChange }: FormikProps<SetPieceFormValues>) => {
  const [locId, setId] = useState('')
  const [shipOrientation, setShipOrientation] = useState<ShipOrientation[]>(initialOrientation)
  const [shipLocations, setShipLocations] = useState<Piece[]>([])
  const [selectedShip, setSelectedShip] = useState<PiecesType>(PiecesType.None)

  const boardRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const {
    battleshipGame: { teamOne, teamTwo, readyEvents },
  } = useBattleshipProvider()

  const { board } = useBoard({ ships: values.ships, shipLocations })

  const setShips = (ships: Piece[]) => {
    setSelectedShip(PiecesType.None)
    setFieldValue('ships', ships)
  }

  const options = useMemo(() => {
    const _options = []
    const teamOneDisplayName = teamOne.ensName || teamOne.registryDAOName || teamOne.truncated
    const teamTwoDisplayName = teamTwo.ensName || teamTwo.registryDAOName || teamTwo.truncated
    if (teamOne.full && teamTwo.full) {
      if (!readyEvents.includes(teamOne.full)) {
        _options.push({ team: teamOne.full, displayName: '1: ' + teamOneDisplayName! })
      }
      if (!readyEvents.includes(teamTwo.full)) {
        _options.push({ team: teamTwo.full, displayName: '2: ' + teamTwoDisplayName! })
      }
    }
    return _options
  }, [readyEvents, teamOne, teamTwo])

  useEffect(() => {
    const boardRefCurrent = boardRef.current
    const setIdListener = (mouseEvent: any) => {
      const id = mouseEvent.target.id
      if (id) {
        const [loc] = id.split('-')
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
    }
    const [x, y] = locId.split('')
    const rowIndex = rowLoc.findIndex((hLoc) => hLoc === x)
    const colIndex = colLoc.findIndex((vLoc) => vLoc === y)
    switch (selectedShip) {
      case PiecesType.AIRCRAFT_CARRIER: {
        const piece = createShip({
          locationIndices: [rowIndex, colIndex],
          pos: [x, y],
          shipSize: selectedShip,
          shipMousePiecePos: locId,
          shipOrientation,
          piecePartsEnds: [2, 2],
          ships: values.ships,
        })
        setShipLocations(piece ? [piece] : [])
        break
      }
      case PiecesType.BATTLESHIP: {
        const piece = createShip({
          locationIndices: [rowIndex, colIndex],
          pos: [x, y],
          shipSize: selectedShip,
          shipMousePiecePos: locId,
          shipOrientation,
          piecePartsEnds: [1, 2],
          ships: values.ships,
        })
        setShipLocations(piece ? [piece] : [])
        break
      }
      case PiecesType.CRUISER: {
        const piece = createShip({
          locationIndices: [rowIndex, colIndex],
          pos: [x, y],
          shipSize: selectedShip,
          shipMousePiecePos: locId,
          shipOrientation,
          piecePartsEnds: [1, 1],
          ships: values.ships,
        })
        setShipLocations(piece ? [piece] : [])
        break
      }
      case PiecesType.SUBMARINE: {
        const piece = createShip({
          locationIndices: [rowIndex, colIndex],
          pos: [x, y],
          shipSize: selectedShip,
          shipMousePiecePos: locId,
          shipOrientation,
          piecePartsEnds: [1, 0],
          ships: values.ships,
        })
        setShipLocations(piece ? [piece] : [])
        break
      }
      case PiecesType.DESTROYER: {
        const piece = createShip({
          locationIndices: [rowIndex, colIndex],
          pos: [x, y],
          shipSize: selectedShip,
          shipMousePiecePos: locId,
          shipOrientation,
          piecePartsEnds: [0, 0],
          ships: values.ships,
        })
        setShipLocations(piece ? [piece] : [])
        break
      }
      case PiecesType.None:
        return
    }
  }, [locId, selectedShip, shipOrientation, values.ships])

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' gap={4} bg='black.900-semi-transparent' p={4} rounded='xl' h='full'>
        <Text>Select Team you are playing for</Text>
        <Text>If team is DAO, a proposal will be created to approve transaction</Text>
        <Text>Note: proposal/transaction will be reverted if not correct team executing</Text>
        <Select name='team' value={values.team} onChange={handleChange}>
          <option value='' disabled>
            Select Team
          </option>
          {options.map((option, i) => (
            <option key={i} value={option.team}>
              Team {option.displayName}
            </option>
          ))}
        </Select>
        <Flex justifyContent='center' gap={4} flexWrap={{ sm: 'wrap', md: 'nowrap' }}>
          <ShipSelection selectShip={setSelectedShip} ships={values.ships} selectedShip={selectedShip} shipOrientation={shipOrientation} setShipOrientation={setShipOrientation} />
          <BattleshipBoard board={board} ref={boardRef} ships={values.ships} squareOnClick={setShips} />
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
