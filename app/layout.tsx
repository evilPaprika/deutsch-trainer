import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { UserPreferencesProvider } from '@/providers/UserPreferencesProvider';
import { theme } from '../theme';

export const metadata = {
  title: 'Deutsch trainieren',
  description: 'Trainiere dein Deutsch mit dieser App',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="de-DE" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <UserPreferencesProvider>{children}</UserPreferencesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
