import { Stack, Text } from '@mantine/core';

import { FlatCard } from '~/components/flat-card';
import { useMobile } from '~/util/use-mobile';

import { ParticipantRow } from './participant-row';

interface ParticipantListProps {
  participants: Record<string, string>;
  onRemoveParticipant: (uuid: string) => void;
  grouped?: boolean;
}

export const ParticipantList = ({
  participants,
  onRemoveParticipant,
  grouped,
}: ParticipantListProps) => {
  const mobile = useMobile();

  return (
    <FlatCard my="lg" mx={grouped ? 0 : undefined}>
      {Object.keys(participants).length === 0 && (
        <Text size={mobile ? 'md' : 'sm'} p={mobile ? 'sm' : 0} color="dimmed">
          You haven't added anyone yet.
        </Text>
      )}
      <Stack style={{ minWidth: 300 }}>
        {Object.entries(participants).map(([uuid, name]) => (
          <ParticipantRow
            key={uuid}
            uuid={uuid}
            name={name}
            onDelete={() => onRemoveParticipant(uuid)}
          />
        ))}
      </Stack>
    </FlatCard>
  );
};
