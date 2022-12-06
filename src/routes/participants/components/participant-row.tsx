import { ActionIcon, Group, Text, ThemeIcon } from '@mantine/core';
import { Delete, User } from 'react-feather';

import { randColor } from '~/util/rand';
import { useMobile } from '~/util/use-mobile';

interface ParticipantRowProps {
  uuid: string;
  name: string;
  onDelete: () => void;
}

export const ParticipantRow = ({
  uuid,
  name,
  onDelete,
}: ParticipantRowProps) => {
  const mobile = useMobile();

  return (
    <Group noWrap>
      <ThemeIcon
        size={mobile ? 48 : 24}
        variant="light"
        color={randColor(uuid)}
      >
        <User size={mobile ? 32 : 16} />
      </ThemeIcon>
      <Text size={mobile ? 'md' : 'sm'} style={{ flexGrow: 1 }}>
        {name}
      </Text>
      <ActionIcon
        size={mobile ? 48 : 24}
        color="red"
        variant="light"
        onClick={onDelete}
      >
        <Delete size={mobile ? 32 : 16} />
      </ActionIcon>
    </Group>
  );
};
