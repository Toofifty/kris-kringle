import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Center,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Space,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Moon, RefreshCcw, Sun } from 'react-feather';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useKKContext } from '../core/kk-context';

import { StepTracker } from './step-tracker';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell = ({ children }: ShellProps) => {
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { kk, setKK } = useKKContext();

  const [navOpened, setNavOpened] = useState(false);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const location = useLocation();

  useEffect(() => {
    setNavOpened(false);
  }, [location]);

  return (
    <AppShell
      padding="md"
      fixed
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!navOpened}
          width={{ sm: 300, lg: 400 }}
        >
          <Navbar.Section grow={!mobile} mt="lg">
            <StepTracker />
          </Navbar.Section>
          <Navbar.Section mt="lg">
            <Button
              color="red"
              variant="light"
              fullWidth
              styles={{
                root: {
                  background: 0,
                },
              }}
              onClick={() => {
                setKK({});
                navigate('/');
              }}
              leftIcon={<RefreshCcw size={16} />}
              disabled={!kk.people}
            >
              Start over
            </Button>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} padding="md">
          <Group position="apart">
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={navOpened}
                onClick={() => setNavOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Button variant="default" component={NavLink} to="/">
              <Text>kris.kringle</Text>
            </Button>
            <ActionIcon
              variant="light"
              onClick={() => toggleColorScheme(dark ? 'light' : 'dark')}
              color={dark ? 'yellow' : 'blue'}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </ActionIcon>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingLeft: mobile ? 0 : 16,
        },
      })}
    >
      <Group direction="column" position="center" m="lg" mb="xl">
        {children}
        <Space h="xl" />
      </Group>
    </AppShell>
  );
};
