import { Flex, Spacer, Button, Divider, Box, Text } from '@chakra-ui/react';

interface IPageTitle {
  title: string;
  buttons: {
    onClick: () => void;
    variant?: string;
    label: string;
  }[],
}

export function PageTitle({ title, buttons }: IPageTitle) {
  return (
    <Box
      marginTop="3rem"
      marginBottom="2rem"
    >
      <Flex
        w="full"
        align="center"
      >
        <Text
          textStyle="text-2xl-mono-regular"
          color="grayscale.100"
        >
          {title}
        </Text>
        <Spacer />
        {buttons.length && buttons.map((button, i) => (
          <Button
            key={i}
            {...button}
          >
            {button.label}
          </Button>
        ))}
      </Flex>
      <Divider
        marginTop="1rem"
        borderColor="chocolate.400"
      />
    </Box>
  )
}