import { Card, CardProps } from '@mantine/core';
import { useMobile } from '../util/use-mobile';

export const FlatCard = ({ children, ...props }: CardProps) => {
  const mobile = useMobile();
  return (
    <Card
      shadow={mobile ? undefined : 'sm'}
      mx={mobile ? 0 : 'md'}
      w={mobile ? '100%' : undefined}
      sx={{ minWidth: 300 }}
      {...props}
    >
      {children}
    </Card>
  );
};
