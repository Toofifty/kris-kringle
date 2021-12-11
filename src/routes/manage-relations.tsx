import {
  ActionIcon,
  Affix,
  Button,
  Card,
  Center,
  Checkbox,
  createStyles,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Edit, Edit2, Edit3, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useKKContext } from '../core/kk-context';
import { randColor } from '../util/rand';

const useStyles = createStyles((theme) => ({
  button: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

export const ManageRelations = () => {
  const { classes } = useStyles();
  const { kk, setKK } = useKKContext();
  const navigate = useNavigate();

  const [disallows, setDisallows] = useState<Record<string, string[]>>(
    kk.disallowedConnections ?? {}
  );

  const [selectedPerson, setSelectedPerson] = useState<string>();

  const selectedName = selectedPerson && kk.people![selectedPerson];

  const isGiftable = (other: string) => {
    if (!selectedPerson) return false;
    return (
      !disallows[selectedPerson]?.includes(other) &&
      !disallows[other]?.includes(selectedPerson)
    );
  };

  const toggleDisallow = (other: string) => {
    if (!selectedPerson) return;
    if (disallows[selectedPerson]?.includes(other)) {
      setDisallows((disallows) => ({
        ...disallows,
        [selectedPerson]: disallows[selectedPerson]?.filter((p) => p !== other),
      }));
    } else if (disallows[other]?.includes(selectedPerson)) {
      setDisallows((disallows) => ({
        ...disallows,
        [other]: disallows[other]?.filter((p) => p !== selectedPerson),
      }));
    } else {
      setDisallows({
        ...disallows,
        [selectedPerson]: [...(disallows[selectedPerson] ?? []), other],
      });
    }
  };

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Group>
          <Button
            color="gray"
            leftIcon={<ArrowLeft />}
            onClick={() => navigate('/add-people')}
          >
            I forgot someone
          </Button>
          <Button
            color="blue"
            rightIcon={<ArrowRight />}
            onClick={() => {
              setKK({
                ...kk,
                disallowedConnections: disallows,
              });
              navigate('/generate');
            }}
          >
            Done
          </Button>
        </Group>
      </Affix>
      <Text size="xl" mb="sm">
        Let me know who shouldn't be able to gift to who. (optional)
      </Text>
      <Text color="gray" size="sm">
        Useful if you want to make sure that a person can't gift to someone they
        are already giving to.
      </Text>
      <Group mt="lg" style={{ alignItems: 'start' }}>
        <Card shadow="sm">
          <Text color="gray" size="sm" mb="lg">
            Select the person you want to manage.
          </Text>
          {Object.entries(kk.people!).map(([key, name]) => (
            <UnstyledButton
              key={key}
              className={classes.button}
              onClick={() => setSelectedPerson(key)}
            >
              <Group>
                <ThemeIcon size={24} variant="light" color={randColor(key)}>
                  <User size={16} />
                </ThemeIcon>
                <Text
                  size="sm"
                  style={{
                    flexGrow: 1,
                    fontWeight: selectedPerson === key ? 'bold' : undefined,
                  }}
                >
                  {name}
                </Text>
                {selectedPerson === key && (
                  <ActionIcon size={24} color="blue" variant="transparent">
                    <Edit3 size={16} />
                  </ActionIcon>
                )}
              </Group>
            </UnstyledButton>
          ))}
        </Card>
        <Card shadow="sm">
          <Text color="gray" size="sm">
            Uncheck people who they shouldn't be able to gift to.
          </Text>
          {!selectedPerson ? (
            <Text color="gray" size="sm" mt="lg">
              Select someone first.
            </Text>
          ) : (
            <>
              <Text size="sm" my="lg">
                <strong>{selectedName}</strong> can't give to, or receive gifts
                from:
              </Text>{' '}
              {Object.entries(kk.people!)
                .filter(([key]) => key !== selectedPerson)
                .map(([key, name]) => (
                  <Checkbox
                    my="lg"
                    mx="sm"
                    key={key}
                    color={randColor(key)}
                    checked={isGiftable(key)}
                    label={name}
                    onClick={() => toggleDisallow(key)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
            </>
          )}
        </Card>
      </Group>
    </>
  );
};
