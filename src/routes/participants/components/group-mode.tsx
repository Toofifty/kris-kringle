import { ActionIcon, Button, Group, Text } from '@mantine/core';
import { Plus, Trash } from 'react-feather';

import { FlatCard } from '~/components';
import { randColor } from '~/util/rand';
import { useMobile } from '~/util/use-mobile';

import { useGroups } from '../hooks';

import { ParticipantInput } from './participant-input';
import { ParticipantList } from './participant-list';

export const GroupMode = () => {
  const mobile = useMobile();

  const {
    groups,
    participants,
    addGroup,
    removeGroup,
    addParticipant,
    removeParticipant,
  } = useGroups();

  return (
    <>
      {Object.keys(groups).map((group, i) => (
        <FlatCard
          key={group}
          mt="lg"
          sx={(theme) => ({
            border: `1px solid ${
              theme.colors[randColor(group)][
                theme.colorScheme === 'light' ? 2 : 9
              ]
            }`,
            backgroundColor:
              theme.colorScheme === 'light'
                ? theme.colors[randColor(group)][0]
                : theme.colors.gray[8],
          })}
        >
          <Group position="apart">
            <Text>
              <strong>Group {i + 1}</strong>
            </Text>
            <ActionIcon
              onClick={() => removeGroup(group)}
              variant="light"
              color="red"
              size={mobile ? 48 : 24}
            >
              <Trash size={mobile ? 32 : 16} />
            </ActionIcon>
          </Group>
          <ParticipantList
            grouped
            participants={Object.fromEntries(
              groups[group].map((uuid) => [uuid, participants[uuid]])
            )}
            onRemoveParticipant={removeParticipant}
          />
          <ParticipantInput
            onAddParticipant={(name) => addParticipant(name, group)}
          />
        </FlatCard>
      ))}
      <Button
        my="lg"
        leftIcon={<Plus />}
        onClick={addGroup}
        variant="light"
        fullWidth
      >
        Add group
      </Button>
    </>
  );
};
