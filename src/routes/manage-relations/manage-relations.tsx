import {
  ActionIcon,
  Affix,
  Button,
  createStyles,
  Group,
  MediaQuery,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Edit3, User, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { URLs } from '~/urls';
import { Avatar } from '~/components/avatar';
import { FlatCard } from '~/components/flat-card';
import { useKKContext } from '~/core/kk-context';
import { randColor } from '~/util/rand';
import { useMobile } from '~/util/use-mobile';
import { useDisallowConnections } from './hooks';

const useButtonStyles = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },
}));

interface PersonProps {
  uuid: string;
  name: string;
  selected: boolean;
  options: number;
  totalOptions: number;
  onClick: () => void;
}

const Person = ({
  uuid,
  name,
  selected,
  options,
  totalOptions,
  onClick,
}: PersonProps) => {
  const { classes } = useButtonStyles();
  const mobile = useMobile();

  return (
    <UnstyledButton className={classes.button} onClick={onClick}>
      <Group>
        {selected && mobile && (
          <ActionIcon size={48} variant="transparent">
            <ArrowLeft size={32} />
          </ActionIcon>
        )}
        <ThemeIcon
          size={mobile ? 48 : 24}
          variant="light"
          color={randColor(uuid)}
        >
          <User size={mobile ? 32 : 16} />
        </ThemeIcon>
        <Text inline size={mobile ? 'md' : 'sm'} style={{ flexGrow: 1 }}>
          <Group spacing="xs">
            <Text inline style={{ fontWeight: selected ? 'bold' : undefined }}>
              {name}
            </Text>
            <Text inline color={options == 0 ? 'red' : 'dimmed'}>
              {options === totalOptions
                ? '(anyone)'
                : `(${options} option${options === 1 ? '' : 's'})`}
            </Text>
          </Group>
        </Text>
        {selected && !mobile && (
          <ActionIcon size={24} variant="transparent">
            <Edit3 size={16} />
          </ActionIcon>
        )}
      </Group>
    </UnstyledButton>
  );
};

export const ManageRelations = () => {
  const mobile = useMobile();

  const { kk } = useKKContext();
  const navigate = useNavigate();
  const { classes } = useButtonStyles();

  const { isDisallowed, toggle } = useDisallowConnections();

  const [selectedPerson, setSelectedPerson] = useState<string>();

  const selectedName = selectedPerson && kk.individuals![selectedPerson];

  const isGiftable = (other: string) => {
    if (!selectedPerson) return false;
    return !isDisallowed(selectedPerson, other);
  };

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Group>
          <Button
            color="gray"
            leftIcon={<ArrowLeft />}
            onClick={() => navigate(URLs.Participants)}
          >
            I forgot someone
          </Button>
          <Button
            color="blue"
            rightIcon={<ArrowRight />}
            onClick={() => {
              navigate(URLs.Generate);
            }}
          >
            Done
          </Button>
        </Group>
      </Affix>
      <Text size="xl" mb="sm">
        Any restrictions?
      </Text>
      <Text color="dimmed" size="sm">
        You can prevent people from being matched with each other. For example,
        you might not want a match that occured last year to happen again.
        <br />
        <br /> Skip this step if anyone can be matched with anyone else.
      </Text>
      <Group style={{ alignItems: 'start' }} w={mobile ? '100%' : undefined}>
        <MediaQuery largerThan="sm" styles={{ flexGrow: 1 }}>
          <FlatCard>
            <Text color="dimmed" size="sm" mb="lg">
              Select the person you want to manage
            </Text>
            {Object.entries(kk.individuals!)
              .filter(
                ([uuid]) =>
                  !mobile || !selectedPerson || selectedPerson === uuid
              )
              .map(([uuid, name]) => (
                <Person
                  key={uuid}
                  uuid={uuid}
                  name={name}
                  selected={selectedPerson === uuid}
                  options={
                    Object.keys(kk.individuals!).filter(
                      (other) => !isDisallowed(uuid, other)
                    ).length
                  }
                  totalOptions={Object.keys(kk.individuals!).length - 1}
                  onClick={() =>
                    setSelectedPerson(
                      selectedPerson === uuid ? undefined : uuid
                    )
                  }
                />
              ))}
          </FlatCard>
        </MediaQuery>
        {selectedPerson && (
          <MediaQuery largerThan="sm" styles={{ flexGrow: 1 }}>
            <FlatCard>
              <Stack spacing="sm">
                <Text color="dimmed" size="sm">
                  <strong>{selectedName}</strong> can match with...
                </Text>{' '}
                {Object.entries(kk.individuals!)
                  .filter(([uuid]) => uuid !== selectedPerson)
                  .map(([uuid]) => (
                    <UnstyledButton
                      p="xs"
                      sx={(theme) => ({
                        backgroundColor: isGiftable(uuid)
                          ? theme.colorScheme === 'dark'
                            ? theme.colors.dark[5]
                            : theme.colors.gray[0]
                          : 'transparent',
                        borderRadius: theme.radius.sm,
                      })}
                      onClick={() => toggle(selectedPerson, uuid)}
                      className={classes.button}
                    >
                      <Group>
                        <ActionIcon
                          size={mobile ? 48 : 24}
                          variant="transparent"
                        >
                          {isGiftable(uuid) ? (
                            <Check size={mobile ? 32 : 16} color="green" />
                          ) : (
                            <X size={mobile ? 32 : 16} color="red" />
                          )}
                        </ActionIcon>
                        <Avatar id={uuid} size={mobile ? 'lg' : 'sm'} />
                      </Group>
                    </UnstyledButton>
                  ))}
              </Stack>
            </FlatCard>
          </MediaQuery>
        )}
      </Group>
    </>
  );
};
