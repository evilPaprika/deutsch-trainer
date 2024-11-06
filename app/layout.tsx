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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <UserPreferencesProvider>{children}</UserPreferencesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
