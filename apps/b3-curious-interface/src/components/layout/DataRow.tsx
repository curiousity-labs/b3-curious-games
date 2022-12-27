import { Flex, Text } from '@chakra-ui/react';

export const DataRow = ({ propertyName, propertyValue }: { propertyName: string, propertyValue: string | null }) => {
  if (!propertyValue) return null;

  return (
    <Flex justifyContent="space-between" alignItems="center" gap={2}>
      <Text textStyle="text-sm-sans-semibold">{propertyName}</Text>
      <Text textStyle="text-xs-mono-bold">{propertyValue}</Text>
    </Flex>
  )
}