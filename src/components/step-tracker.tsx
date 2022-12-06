import { useNavigate, useLocation } from 'react-router';
import {
  createStyles,
  ThemeIcon,
  Group,
  Text,
  UnstyledButton,
  ActionIcon,
} from '@mantine/core';
import {
  ArrowLeft,
  Check,
  ShoppingBag,
  Shuffle,
  UserPlus,
  Users,
} from 'react-feather';
import { useKKContext } from '../core/kk-context';
import { URLs } from '~/urls';

const useStyles = createStyles(
  (theme, { available }: { available: boolean }) => ({
    button: {
      display: 'block',
      width: '100%',
      padding: theme.spacing.xs,
      borderRadius: theme.radius.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      pointerEvents: available ? 'all' : 'none',

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      },
    },
  })
);

interface StepButtonProps {
  to: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  color: string;
  available: boolean;
  done: boolean;
}

const StepButton = ({
  children,
  to,
  icon,
  color,
  available,
  done,
}: StepButtonProps) => {
  const { classes } = useStyles({ available });
  const navigate = useNavigate();
  const active = useLocation().pathname === to;
  return (
    <UnstyledButton className={classes.button} onClick={() => navigate(to)}>
      <Group>
        <ThemeIcon size={24} color={available ? color : 'gray'} variant="light">
          {icon}
        </ThemeIcon>
        <Text
          size="sm"
          color={!available ? 'gray' : undefined}
          style={{ flexGrow: 1 }}
        >
          {children}
        </Text>
        {done && !active && (
          <ActionIcon size={24} color="green" variant="transparent">
            <Check size={16} />
          </ActionIcon>
        )}
        {active && (
          <ActionIcon size={24} color="blue" variant="transparent">
            <ArrowLeft size={16} />
          </ActionIcon>
        )}
      </Group>
    </UnstyledButton>
  );
};

export const StepTracker = () => {
  const { kk } = useKKContext();

  return (
    <>
      <StepButton
        to={URLs.Participants}
        icon={<UserPlus size={16} />}
        color="green"
        available
        done={!!kk.individuals && Object.keys(kk.individuals).length > 1}
      >
        Add people
      </StepButton>
      <StepButton
        to={URLs.ManageRelations}
        icon={<Users size={16} />}
        color="red"
        available={!!kk.individuals}
        done={!!kk.disallowedConnections}
      >
        Manage relations
      </StepButton>
      <StepButton
        to={URLs.Generate}
        icon={<Shuffle size={16} />}
        color="blue"
        available={!!kk.individuals && !!kk.disallowedConnections}
        done={!!kk.results}
      >
        Generate
      </StepButton>
      <StepButton
        to={URLs.Results}
        icon={<ShoppingBag size={16} />}
        color="violet"
        available={!!kk.results}
        done={false}
      >
        View results{' '}
        {kk.view === 'secret' && (
          <Text size="sm" color="red">
            (private)
          </Text>
        )}
      </StepButton>
    </>
  );
};
