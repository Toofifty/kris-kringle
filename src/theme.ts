import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  cursorType: 'pointer',
  components: {
    Button: {
      styles: (theme) => ({
        root: {
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            height: 64,
            fontSize: theme.fontSizes.lg,
          },
        },
      }),
    },
    TextInput: {
      styles: (theme) => ({
        input: {
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            height: 64,
            fontSize: theme.fontSizes.lg,
            paddingLeft: theme.spacing.lg,
            paddingRight: theme.spacing.lg,
          },
        },
      }),
    },
  },
};

export default theme;
