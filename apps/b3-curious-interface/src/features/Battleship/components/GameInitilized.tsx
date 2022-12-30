import { Button, Flex, Select, Text } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as yup from 'yup'
import { SetPieceFormValues } from '../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../pages/routes';
import { useBattleshipProvider } from '../provider/context';
import { useBoard } from '../hooks/useBoard';
import { Board } from './Board';
import { ShipSelection } from './ShipSelection';
import { rowLoc, colLoc } from '../constants';
import { Piece } from '../models';

const piecesInitialValues = {
  team: '',
  ships: [] as string[]
}
const schema = yup.object().shape({
  team: yup.string().required(),
  ships: yup.array()
})

export function GameInitilized() {

  const handleSubmit = useCallback(async () => { }, [])
  return (
    <Formik
      initialValues={piecesInitialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      component={SetPiecesForm}
    />
  )
}

const SetPiecesForm = ({
  isValid,
  handleSubmit,
  isSubmitting,
}: FormikProps<SetPieceFormValues>) => {
  const { battleshipGame: { teamOne, teamTwo, teamsReady } } = useBattleshipProvider()
  const navigate = useNavigate()

  const boardRef = useRef<HTMLDivElement>(null)
  const [locId, setId] = useState('');
  const [shipLocations, setShipLocations] = useState<Piece[]>([])
  const { board } = useBoard(shipLocations);

  const options = useMemo(() => {
    const _options = [];
    const teamOneDisplayName = teamOne.ensName || teamOne.registryDAOName || teamOne.truncated
    const teamTwoDisplayName = teamTwo.ensName || teamTwo.registryDAOName || teamTwo.truncated

    if (!teamsReady.includes(teamOne.full || '')) {
      _options.push({ address: teamOne.full!, displayName: teamOneDisplayName })
    }
    if (!teamsReady.includes(teamTwo.full || '')) {
      _options.push({ address: teamTwo.full!, displayName: teamTwoDisplayName })
    }
    return _options
  }, [teamsReady, teamOne, teamTwo,])

  useEffect(() => {
    const boardRefCurrent = boardRef.current
    const setIdListener = (mouseEvent: any) => {
      setId((mouseEvent.target as any).id);
    }
    if (boardRefCurrent) {
      boardRefCurrent.addEventListener('mouseover', setIdListener)
    }
    return () => {
      if (boardRefCurrent) {
        boardRefCurrent.removeEventListener('mouseover', setIdListener)
      }
    }
  }, [])

  useEffect(() => {
    const shipSize = 5
    const shipDirection = 'hor'
    const [x, y] = locId.split('')
    const rowIndex = rowLoc.findIndex((hLoc) => hLoc === x)
    const colIndex = colLoc.findIndex((vLoc) => vLoc === y)
    if (shipSize === 5) {
      if (shipDirection === 'hor') {
        const shipPiecesX = rowLoc.filter((_, i) => i >= rowIndex - 2 && i !== rowIndex && i <= rowIndex + 2)
        if (shipPiecesX.length === shipSize - 1) {
          const shipPieces = [...shipPiecesX.map((_x) => _x + y), locId];
          const piece = new Piece(shipPieces, 'grayscale.400', false);
          setShipLocations([piece])
        }
      }
    }

  }, [locId])

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' gap={4} bg="black.900-semi-transparent" p={4} rounded="xl" h="full">
        <Text>Select Team you are playing for</Text>
        <Text>If team is DAO, a proposal will be created to approve transaction</Text>
        <Text>Note: proposal/transaction will be reverted if not correct team executing</Text>
        <Select>
          {options.map((option, i) => <option key={i} value={option.address}>Team: {option.displayName}</option>)}
        </Select>
        <ShipSelection />

        <Board board={board} ref={boardRef} />

      </Flex>
      <Flex my={4} justifyContent='center' gap={4}>
        <Button
          variant='text'
          onClick={() => navigate(ROUTES.battleshipLanding.relative())}
          disabled={false}
        >
          Prev
        </Button>
        <Button type='submit' disabled={!isValid || isSubmitting}>
          Submit
        </Button>
      </Flex>
    </form>
  )
}