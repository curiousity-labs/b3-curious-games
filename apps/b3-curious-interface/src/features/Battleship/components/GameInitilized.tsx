import { Box, Button, Flex, Select, Text } from '@chakra-ui/react';
import { Formik, FormikProps } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup'
import { SetPieceFormValues } from '../types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../pages/routes';
import { useBattleshipProvider } from '../provider/context';

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
  values,
  errors,
  isValid,
  handleChange,
  handleSubmit,
  isSubmitting,
}: FormikProps<SetPieceFormValues>) => {

  const navigate = useNavigate()
  const { battleshipGame: { teamOne, teamTwo, teamsReady } } = useBattleshipProvider()

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
  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' gap={4} bg="black.900-semi-transparent" p={4} rounded="xl" h="full">
        <Text>Select Team you are playing for</Text>
        <Text>If team is DAO, a proposal will be created to approve transaction</Text>
        <Text>Note: proposal/transaction will be reverted if not correct team executing</Text>
        <Select>
          {options.map((option, i) => <option key={i} value={option.address}>Team: {option.displayName}</option>)}
        </Select>
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