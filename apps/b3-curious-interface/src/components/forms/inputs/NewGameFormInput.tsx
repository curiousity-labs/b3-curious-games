import { Input, Box } from '@chakra-ui/react';
import { LabelWrapper } from '@decent-org/fractal-ui';
import { constants } from 'ethers';
import { useAddressLookup } from '../../../hooks/utils/useAddressLookup';
import { DataRow } from '../../layout/DataRow';
import { NewGameFormValues } from '../../../features/Battleship/types';

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