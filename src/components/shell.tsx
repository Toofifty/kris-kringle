import { AppShell, Space, Stack, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMobile } from '../util/use-mobile';
import { Header } from './header';
import { Navbar } from './navbar';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell = ({ children }: ShellProps) => {
  const [showNav, setShowNav] = useState(false);
  const mobile = useMobile();
  const location = useLocation();

  useEffect(() => {
    setShowNav(false);
  }, [location]);

  return (
    <AppShell
      padding="md"
      fixed
      navbar={<Navbar open={showNav} />}
      header={
        <Header showNav={showNav} toggleNav={() => setShowNav((o) => !o)} />
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
      <Stack align="center" m={mobile ? 0 : 'lg'} mb={40}>
        {children}
        <Space h="xl" />
      </Stack>
    </AppShell>
  );
};
