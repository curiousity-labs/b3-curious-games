import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as yup from 'yup'
import { NewGameFormInput } from '../../../components/forms/inputs/NewGameFormInput'
import { newGameInitialValues } from '../constants'
import { NewGameFormValues } from '../types'
import { ROUTES } from '../../../pages/routes'
import { useNavigate } from 'react-router-dom'
import { ContractReceipt, utils } from 'ethers'
import { useAppProvider } from '../../../providers/store/context'
import { useCallback } from 'react'
import { useTransaction } from '../../../hooks/utils/useTransaction'

const schema = yup.object().shape({
  teamOne: yup
    .string()
    .required('Team one is Required')
    .test({
      name: 'address-validation',
      message: 'not a valid address',
      test: (value?: string) => !!value && utils.isAddress(value),
    }),
  teamTwo: yup
    .string()
    .required('Team Two is Required')
    .test({
      name: 'address-validation',
      message: 'not a valid address',
      test: (value?: string) => !!value && utils.isAddress(value),
    }),
  // @dev prevents submit until these values are loaded
  teamOneAddressInfo: yup.object().test((value) => !!value.full),
  teamTwoAddressInfo: yup.object().test((value) => !!value.full),
})

export const NewGame = () => {
  const { contracts } = useAppProvider();
  const [contractCall, isPending] = useTransaction();

  const navigate = useNavigate()

  const successCallback = useCallback((txReceipt: ContractReceipt) => {
    // should navigate to game page
    if (txReceipt.events) {
      navigate(ROUTES.battleshipGame.relative(txReceipt.events[0].address))
    }
  }, [navigate])

  const handleSubmit = useCallback(async (values: NewGameFormValues, actions: FormikHelpers<NewGameFormValues>) => {
    const b3Contracts = contracts.b3Curious
    const fractalContracts = contracts.fractal

    if (!b3Contracts || !fractalContracts) {
      return;
    }
    const { teamOneAddressInfo, teamTwoAddressInfo } = values;

    // is Usul; create usul proposal

    // is Multisig; create multisig proposal

    // is Usul (w/guard)l create proposal through guard?

    // is Multisig (w/guard) create proposal through guard?

    // @note if not supported Safe, creates game using connected account
    await contractCall({
      contractFn: () => b3Contracts.battleshipFactory.deployAndChallange(teamTwoAddressInfo.full!),
      pendingMessage: 'Creating game...',
      failedMessage: 'Transaction failed',
      successMessage: 'Team Challedged',
      successCallback,
    })
    return;
  }, [contracts, contractCall, successCallback])

  return (
    <Box>
      <PageTitle title='New Game' />
      <Formik
        initialValues={newGameInitialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        component={NewGameForm}
      />
    </Box>
  )
}

export const NewGameForm = ({
  values,
  errors,
  isValid,
  handleChange,
  handleSubmit,
  setFieldValue,
  isSubmitting,
}: FormikProps<NewGameFormValues>) => {
  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' gap={4} bg="black.900-semi-transparent" p={4} rounded="xl">
        <Text>Enter a valid ETH address. Safe, Fractal Usul, and Fractal Safe address are also supported.</Text>
        <Text>If Team one address is not a supperted Safe address, connected account is used</Text>
        <NewGameFormInput
          label='Your Team'
          name='teamOne'
          value={values.teamOne}
          error={errors.teamOne}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          hasSelfFunc
        />
        <NewGameFormInput
          label='Team Two'
          name='teamTwo'
          value={values.teamTwo}
          error={errors.teamTwo}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
        />
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
