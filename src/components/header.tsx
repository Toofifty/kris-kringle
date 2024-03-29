import {
  ActionIcon,
  Burger,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { Moon, Sun } from 'react-feather';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Santa } from '../assets/santa.svg';

interface HeaderProps {
  showNav: boolean;
  toggleNav: () => void;
}

export const Header = ({ showNav, toggleNav }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme();

  return (
    <MantineHeader height={60} p="md">
      <Group position="apart">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={showNav}
            onClick={toggleNav}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>
        <UnstyledButton component={NavLink} to="/">
          <Text color="red">
            <ThemeIcon variant="light" color="red">
              <Santa />
            </ThemeIcon>{' '}
            <strong>kris.kringle</strong>
          </Text>
        </UnstyledButton>
        <ActionIcon
          variant="light"
          onClick={() => toggleColorScheme(dark ? 'light' : 'dark')}
          color={dark ? 'yellow' : 'blue'}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </ActionIcon>
      </Group>
    </MantineHeader>
  );
};
