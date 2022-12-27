import { Input, Box } from '@chakra-ui/react';
import { LabelWrapper } from '@decent-org/fractal-ui';
import { constants, utils } from 'ethers';
import { AddressInfo, useAddressLookup } from '../../../hooks/utils/useAddressLookup';
import { DataRow } from '../../layout/DataRow';
import { NewGameFormValues } from '../../../features/Battleship/types';
import { useEffect } from 'react';

interface INewGameFormInput {
  value: string,
  error?: string,
  label: string,
  name: string,
  setFieldValue: (field: string, value: AddressInfo, shouldValidate?: boolean | undefined) => void
  handleChange: {
    (e: React.ChangeEvent<NewGameFormValues>): void;
    <T = string | React.ChangeEvent<NewGameFormValues>>(field: T): T extends React.ChangeEvent<NewGameFormValues> ? void : (e: string | React.ChangeEvent<NewGameFormValues>) => void;
  };
}

export const NewGameFormInput = ({ label, name, setFieldValue, value, error, handleChange }: INewGameFormInput) => {
  const { addressInfo } = useAddressLookup(value);

  useEffect(() => {
    if (value.trim() && utils.isAddress(value)) {
      setFieldValue(`${name}AddressInfo`, addressInfo);
    }
  }, [value, addressInfo, name, setFieldValue])

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