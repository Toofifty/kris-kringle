import {
  ActionIcon,
  AppShell,
  Button,
  Group,
  Header,
  Navbar,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Moon, RefreshCcw, Sun } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';
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

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} padding="md">
          <Navbar.Section>
            <Header height={60} padding="xs">
              <Group position="apart">
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
          </Navbar.Section>
          <Navbar.Section grow mt="lg">
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
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group direction="column" position="center">
        {children}
      </Group>
    </AppShell>
  );
};
