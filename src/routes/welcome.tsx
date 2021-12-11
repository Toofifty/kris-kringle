import { Button, Card, Group, Text } from '@mantine/core';
import { ArrowRight } from 'react-feather';
import { NavLink } from 'react-router-dom';

export const Welcome = () => (
  <>
    <Text size="xl">
      <strong>Kris Kringle</strong>
    </Text>
    <Card shadow="sm" my="lg">
      <Group direction="column">
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
      to="/add-people"
      rightIcon={<ArrowRight size={16} />}
    >
      Get started
    </Button>
  </>
);
