import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { RotateCcw, User } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { Avatar } from '../components/avatar';
import { useKKContext } from '../core/kk-context';

export const ViewAll = () => {
  const { kk, setKK } = useKKContext();

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
        <Stack>
          {kk.results!.map(([person, recipient]) => (
            <Group grow position="center" key={person}>
              <Avatar id={person} type="santa" />
              <Text color="gray" size="sm">
                is gifting to
              </Text>
              <Avatar id={recipient} type="giftee" />
            </Group>
          ))}
        </Stack>
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
