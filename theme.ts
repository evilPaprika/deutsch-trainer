'use client';

import { createTheme } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';

const appPrimaryColor: MantineColorsTuple = [
  '#fff9e1',
  '#fdf2cd',
  '#f9e39f',
  '#f5d46d',
  '#f2c742',
  '#f0bf27',
  '#f0ba15',
  '#d5a403',
  '#bd9100',
  '#a47d00',
];

export const theme = createTheme({
  primaryColor: 'appPrimaryColor',
  colors: {
    appPrimaryColor,
  },
});
