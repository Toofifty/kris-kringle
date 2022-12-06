import { Button, Group, TextInput } from '@mantine/core';
import { useState } from 'react';
import { randXmasName } from '~/util/rand';

interface ParticipantInputProps {
  onAddParticipant: (name: string) => void;
}

export const ParticipantInput = ({
  onAddParticipant,
}: ParticipantInputProps) => {
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddParticipant(value);
    setValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <Group noWrap>
        <TextInput
          placeholder={randXmasName()}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <Button type="submit" color="green">
          Add
        </Button>
      </Group>
    </form>
  );
};
