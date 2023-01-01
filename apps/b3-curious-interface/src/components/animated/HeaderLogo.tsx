import { Flex, Text } from '@chakra-ui/react';
import textBackground from '../../assets/images/textBackground.gif'

export function HeaderLogo() {
  return (
    <Flex w="12.5rem" h="full" position="relative" alignItems="center">
      <Text textStyle="text-4xl-mono-bold" whiteSpace="nowrap" color="transparent" letterSpacing="0.25rem" backgroundImage={textBackground} backgroundSize="contain" backgroundClip="text">B3 Curious</Text>
    </Flex>
  )
} 