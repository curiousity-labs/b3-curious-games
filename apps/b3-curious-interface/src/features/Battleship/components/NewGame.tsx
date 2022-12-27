import { Box, Flex, Input, Text } from '@chakra-ui/react'
import { PageTitle } from '../../../components/layout/PageTitle'
import { Formik, FormikProps } from 'formik'
import { LabelWrapper } from '@decent-org/fractal-ui'
import { constants } from 'ethers'
import * as yup from 'yup';
import { useAddressLookup } from '../../../hooks/utils/useAddressLookup'

type NewGameFormValues = {
  teamOne: string,
  teamTwo: string,
}

const initialValues = {
  teamOne: '',
  teamTwo: '',
}


const schema = yup.object().shape({
  teamOne: yup.string().required(),
  teamTwo: yup.string().required(),
});

export const NewGame = () => {
  return (
    <Box px={4}>
      <PageTitle title="New Game" />
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={() => { }}
          component={NewGameForm}
        />
      </Box>
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

interface INewGameFormInput {
  value: string,
  error?: string,
  label: string,
  name: string,
  handleChange: {
    (e: React.ChangeEvent<NewGameFormValues>): void;
    <T = string | React.ChangeEvent<NewGameFormValues>>(field: T): T extends React.ChangeEvent<NewGameFormValues> ? void : (e: string | React.ChangeEvent<NewGameFormValues>) => void;
  };
}

export const DataRow = ({ propertyName, propertyValue }: { propertyName: string, propertyValue: string | null }) => {
  if (!propertyValue) return null;

  return (
    <Flex justifyContent="space-between" alignItems="center" gap={2}>
      <Text textStyle="text-sm-sans-semibold">{propertyName}</Text>
      <Text textStyle="text-xs-mono-bold">{propertyValue}</Text>
    </Flex>
  )
}

export const NewGameFormInput = ({ label, name, value, error, handleChange }: INewGameFormInput) => {
  const { addressInfo } = useAddressLookup(value);
  return (
    <Box py={2} px={4} bg="black.900-semi-transparent" rounded="lg">
      <LabelWrapper label={label} errorMessage={error}>
        <Input value={value} name={name} placeholder={constants.AddressZero} onChange={handleChange} />
      </LabelWrapper>
      {!!addressInfo.full && (
        <Box>
          <DataRow propertyName='ENS Name' propertyValue={addressInfo.ensName} />
          <DataRow propertyName='DAO Name' propertyValue={addressInfo.registryDAOName} />
        </Box>
      )}
    </Box>
  )
}