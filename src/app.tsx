import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from '@mantine/core';
import { useState } from 'react';

import { KKProvider } from './core/kk-context';
import { Router } from './router';
import theme from './theme';

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles>
        <KKProvider>
          <Router />
        </KKProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
