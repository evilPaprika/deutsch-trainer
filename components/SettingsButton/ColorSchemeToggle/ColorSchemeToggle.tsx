'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={`${classes.icon} ${classes.light}`} stroke={1.5} />
      <IconMoon className={`${classes.icon} ${classes.dark}`} stroke={1.5} />
    </ActionIcon>
  );
}
