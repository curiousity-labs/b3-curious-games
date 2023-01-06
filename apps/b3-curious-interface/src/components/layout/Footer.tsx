import { Flex, Text } from '@chakra-ui/react';
import b3Json from 'b3-curious-contracts/package.json';
import fractallJson from '@fractal-framework/fractal-contracts/package.json'

export function Footer() {
  return (
    <Flex justifyContent="space-between" px={4}>
      <Flex gap="2" alignItems="center">
        <Flex alignItems="center" justifyContent="center" bg="gold.300" color="black.900" rounded="full" boxSize="1.5rem" textStyle="text-sm-mono-semibold" >
          Gor
        </Flex>
      </Flex>
      <Flex flexDirection="column" textStyle="text-xs-mono-regular" alignItems="flex-end" color="black.100" p="2">
        <Text>b3Curious Contracts: v{b3Json.version}</Text>
        <Text>Fractal Contracts: v{fractallJson.version}</Text>
      </Flex>
    </Flex>
  )
}