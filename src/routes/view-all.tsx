import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { RotateCcw } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { FlatCard } from '~/components';
import { URLs } from '~/urls';
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
      <FlatCard mb="lg" miw={400}>
        <Stack>
          {kk.results!.map(([person, recipient]) => (
            <Group grow key={person}>
              <Avatar id={person} type="santa" />
              <Text color="gray" size="sm">
                is gifting to
              </Text>
              <Avatar id={recipient} type="giftee" />
            </Group>
          ))}
        </Stack>
      </FlatCard>
      <Button
        component={NavLink}
        leftIcon={<RotateCcw size={16} />}
        color="red"
        onClick={() => {
          setKK({ ...kk, results: [] });
        }}
        to={URLs.Generate}
      >
        Regenerate
      </Button>
    </>
  );
};
