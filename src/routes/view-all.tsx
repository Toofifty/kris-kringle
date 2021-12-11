import { Button, Card, Group, Text, ThemeIcon } from '@mantine/core';
import { RotateCcw, User } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { useKKContext } from '../core/kk-context';
import { randColor } from '../util/rand';

export const ViewAll = () => {
  const { kk, setKK } = useKKContext();

  const getName = (id: string) => {
    return kk.people?.[id];
  };

  return (
    <>
      <Text size="xl" mb="sm">
        Here's your results!
      </Text>
      <Text color="gray" size="sm" mb="lg">
        You can go back to change settings at any time using the navigation on
        the left.
      </Text>
      <Card shadow="sm" mb="lg">
        <Group direction="column" style={{ minWidth: 300 }}>
          {kk.results!.map(([person, recipient]) => (
            <Group key={person}>
              <Group key={person} style={{ minWidth: 100 }}>
                <ThemeIcon size={24} variant="light" color={randColor(person)}>
                  <User size={16} />
                </ThemeIcon>
                <Text>
                  <strong>{getName(person)}</strong>
                </Text>
              </Group>
              <Text color="gray" size="sm">
                is gifting to
              </Text>
              <Group key={person} style={{ minWidth: 100 }}>
                <ThemeIcon
                  size={24}
                  variant="light"
                  color={randColor(recipient)}
                >
                  <User size={16} />
                </ThemeIcon>
                <Text>
                  <strong>{getName(recipient)}</strong>
                </Text>
              </Group>
            </Group>
          ))}
        </Group>
      </Card>
      <Button
        component={NavLink}
        leftIcon={<RotateCcw size={16} />}
        color="red"
        onClick={() => {
          setKK({ ...kk, results: [] });
        }}
        to="/generate"
      >
        Regenerate
      </Button>
    </>
  );
};
