import { Group, MantineSize, Text, ThemeIcon } from '@mantine/core';
import { User, Gift } from 'react-feather';
import { useKKContext } from '../core/kk-context';
import { randColor } from '../util/rand';

import { ReactComponent as Santa } from '../assets/santa.svg';

interface AvatarProps {
  id: string;
  type?: 'santa' | 'giftee' | 'user';
  size?: 'sm' | 'lg';
}

export const Avatar = ({ id, type = 'user', size = 'sm' }: AvatarProps) => {
  const { kk } = useKKContext();

  const getName = (id: string) => kk.people?.[id];

  const Icon = {
    santa: Santa,
    giftee: Gift,
    user: User,
  }[type];

  return (
    <Group style={{ minWidth: 100 }}>
      <ThemeIcon
        size={size == 'sm' ? 24 : 48}
        variant="light"
        color={randColor(id)}
      >
        <Icon size={16} style={{ transform: size == 'lg' ? 'scale(2)' : '' }} />
      </ThemeIcon>
      <Text size={size}>
        <strong>{getName(id)}</strong>
      </Text>
    </Group>
  );
};
