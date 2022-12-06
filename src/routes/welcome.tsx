import { Button, Card, Group, Text, ThemeIcon } from '@mantine/core';
import { ArrowRight } from 'react-feather';
import { NavLink } from 'react-router-dom';
import { URLs } from '~/urls';

import { ReactComponent as Santa } from '../assets/santa.svg';

export const Welcome = () => (
  <>
    <Text size="xl">
      <strong>
        Kris Kringle{' '}
        <ThemeIcon size={48} variant="light" color="red">
          <Santa style={{ transform: 'scale(2)' }} />
        </ThemeIcon>
      </strong>
    </Text>
    <Card shadow="sm" my="lg">
      <Group dir="column">
        <Text color="gray">
          Use this tool to generate random Kris Kringle pairings between your
          family and friends.
        </Text>
        <Text color="gray">
          Just enter their names, filter out any unwanted pairings and click
          generate.
        </Text>
        <Text color="gray">
          Then, you can either show the list of all pairings, or pass your phone
          around so individuals can see who they're gifting to privately.
        </Text>
      </Group>
    </Card>
    <Button
      size="md"
      component={NavLink}
      to={URLs.Participants}
      rightIcon={<ArrowRight size={16} />}
    >
      Get started
    </Button>
  </>
);
