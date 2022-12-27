import { Box, Flex } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { Formik, FormikProps } from 'formik'
import * as yup from 'yup';
import { NewGameFormInput } from '../../../components/forms/inputs/NewGameFormInput'
import { newGameInitialValues } from '../constants';
import { NewGameFormValues } from '../types';

const schema = yup.object().shape({
  teamOne: yup.string().required(),
  teamTwo: yup.string().required(),
});

export const NewGame = () => {
  return (
    <Box px={4}>
      <PageTitle title="New Game" />
      <Formik
        initialValues={newGameInitialValues}
        validationSchema={schema}
        onSubmit={() => { }}
        component={NewGameForm}
      />
    </Box>
  )
}

export const NewGameForm = ({ values, errors, handleChange }: FormikProps<NewGameFormValues>) => {
  return (
    <form>
      <Flex flexDirection="column" gap={2}>
        <NewGameFormInput label="Team One" name="teamOne" value={values.teamOne} error={errors.teamOne} handleChange={handleChange} />
        <NewGameFormInput label="Team Two" name="teamTwo" value={values.teamTwo} error={errors.teamTwo} handleChange={handleChange} />
      </Flex>
    </form>
  )
}