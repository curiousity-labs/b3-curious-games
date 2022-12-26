import { Box, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const menuAnimationKeyframes = keyframes`
  0%   { transform: translateY(-500%); }
  25%  { }
  50%  { }
  75%  { }
  100% { transform: translateY(0%); }
`;

export function MenuTransitionTop({ children }: { children: ReactNode }) {
  return (
    <Box as={motion.div} animation={`${menuAnimationKeyframes} 2s 1`}>
      {children}
    </Box>
  );
}
