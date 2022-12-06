import {
  Button,
  Navbar as MantineNavbar,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { RefreshCcw } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { URLs } from '~/urls';
import { useKKContext } from '../core/kk-context';
import { StepTracker } from './step-tracker';

interface NavbarProps {
  open: boolean;
}

export const Navbar = ({ open }: NavbarProps) => {
  const navigate = useNavigate();
  const { kk, setKK } = useKKContext();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <MantineNavbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!open}
      width={{ sm: 300 }}
    >
      <MantineNavbar.Section grow={!mobile} mt="lg">
        <StepTracker />
      </MantineNavbar.Section>
      <MantineNavbar.Section mt="lg">
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
            navigate(URLs.Welcome);
          }}
          leftIcon={<RefreshCcw size={16} />}
          disabled={!kk.individuals}
        >
          Start over
        </Button>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
