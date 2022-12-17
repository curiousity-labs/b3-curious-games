import { createIcon } from '@chakra-ui/react';

export const Rook = createIcon({
  displayName: 'Rook',
  viewBox: '0 0 45 45',
  path: (
    <svg >
      <g fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 39.3h27v-3H9v3zM12.5 32.3l1.5-2.5h17l1.5 2.5h-20zM12 36.3v-4h21v4H12z" strokeLinecap="butt" />
        <path d="M14 29.8v-13h17v13H14z" strokeLinecap="butt" strokeLinejoin="miter" />
        <path d="m14 16.8-3-2.5h23l-3 2.5H14zM11 14.3v-5h4v2h5v-2h5v2h5v-2h4v5H11z" strokeLinecap="butt" />
        <path d="M12 35.8h21M13 31.8h19M14 29.8h17M14 16.8h17M11 14.3h23" fill="none" stroke="#fff" strokeWidth="1" strokeLinejoin="miter" />
      </g>
    </svg>
  ),
})
