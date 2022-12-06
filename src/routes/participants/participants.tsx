import { Alert, Button, Tabs, Text } from '@mantine/core';
import { AlertTriangle, ArrowRight, User, Users } from 'react-feather';
import { useNavigate } from 'react-router-dom';

import { ActionAffix } from '~/components';
import { URLs } from '~/urls';

import { GroupMode, IndividualMode } from './components';
import { useParticipants } from './hooks';

export const Participants = () => {
  const navigate = useNavigate();

  const { participants } = useParticipants();

  return (
    <>
      <ActionAffix>
        <Button
          color="blue"
          rightIcon={<ArrowRight />}
          onClick={() => navigate(URLs.ManageRelations)}
          disabled={Object.keys(participants).length < 2}
        >
          Continue
        </Button>
      </ActionAffix>
      <Text size="xl" mb="sm">
        Let's get started!
      </Text>
      <Text color="light-gray" size="sm">
        Add the participants of your Kris Kringle below.
      </Text>

      <Tabs defaultValue="individual" w="100%">
        <Tabs.List grow>
          <Tabs.Tab value="individual" icon={<User />}>
            Individual mode
          </Tabs.Tab>
          <Tabs.Tab value="group" icon={<Users />}>
            Group mode
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="individual">
          <IndividualMode />
        </Tabs.Panel>

        <Tabs.Panel value="group">
          <Text m="lg" color="dimmed">
            Participants in groups can't be matched with other participants in
            the same group. If you're doing a Kris Kringle with your extended
            family, you can use this mode to ensure that no one is matched with
            a family member.
          </Text>

          <GroupMode />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
