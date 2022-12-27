import { Box, Button, Flex } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { Formik, FormikProps } from 'formik'
import * as yup from 'yup'
import { NewGameFormInput } from '../../../components/forms/inputs/NewGameFormInput'
import { newGameInitialValues } from '../constants'
import { NewGameFormValues } from '../types'
import { ROUTES } from '../../../pages/routes'
import { useNavigate } from 'react-router-dom'
import { utils } from 'ethers'

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
})

export const NewGame = () => {
  return (
    <Box px={4}>
      <PageTitle title='New Game' />
      <Formik
        initialValues={newGameInitialValues}
        validationSchema={schema}
        onSubmit={(values, helpers) => {
          console.log('🚀 ~ file: NewGame.tsx:39 ~ helpers', helpers)
          console.log('🚀 ~ file: NewGame.tsx:45 ~ values', values)
        }}
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
