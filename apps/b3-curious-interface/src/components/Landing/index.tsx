import { Button, Flex, Text } from '@chakra-ui/react'
import { MenuTransitionTop } from '../animated/MenuTransitionTop'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../pages/routes'

export function Landing() {
  const navigate = useNavigate()

  return (
    <Flex justifyContent='center' alignItems='center' h='calc(100vh - 10rem)'>
      <MenuTransitionTop>
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          gap={4}
          p='40px'
          bg='transparent'
          rounded='lg'
          shadow='md'
        >
          <Text textStyle="text-5xl-mono-bold" fontFamily="mono" >b3 Curious</Text>
          <Button w='full' variant='tertiary' onClick={() => navigate(ROUTES.battleshipLanding.relative())}>
            Enter Battleship Room
          </Button>
          <Button w='full' variant='tertiary' disabled>
            Enter Connect 4 (coming soon)
          </Button>
        </Flex>
      </MenuTransitionTop>
    </Flex>
  )
}
