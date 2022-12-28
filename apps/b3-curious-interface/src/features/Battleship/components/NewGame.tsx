import { Box, Button, Flex } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as yup from 'yup'
import { NewGameFormInput } from '../../../components/forms/inputs/NewGameFormInput'
import { newGameInitialValues } from '../constants'
import { NewGameFormValues } from '../types'
import { ROUTES } from '../../../pages/routes'
import { useNavigate } from 'react-router-dom'
import { utils } from 'ethers'
import { useAppProvider } from '../../../providers/store/context'
import { useCallback } from 'react'

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

  const handleSubmit = useCallback(async (values: NewGameFormValues, actions: FormikHelpers<NewGameFormValues>) => {
    const b3Contracts = contracts.b3Contracts
    const fractalContracts = contracts.fractal
    if (!b3Contracts || !fractalContracts) {
      return;
    }
    const { teamOneAddressInfo, teamTwoAddressInfo } = values;

    if(teamOneAddressInfo.isSafe) {
      // is Usul; create usul proposal

      // is Multisig; create multisig proposal

      // is Usul (w/guard)l create proposal through guard?

      // is Multisig (w/guard) create proposal through guard?

      // isAddress, create game
    
    }
    return;
  }, [contracts])

  return (
    <Box px={4}>
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
  setFieldValue
}: FormikProps<NewGameFormValues>) => {
  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection='column' gap={2}>
        <NewGameFormInput
          label='Team One'
          name='teamOne'
          value={values.teamOne}
          error={errors.teamOne}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
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
        <Button type='submit' disabled={!isValid}>
          Submit
        </Button>
      </Flex>
    </form>
  )
}
