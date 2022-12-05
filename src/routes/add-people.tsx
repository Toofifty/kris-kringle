import {
  ActionIcon,
  Affix,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useState } from 'react';
import { ArrowRight, Delete, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FlatCard } from '../components/flat-card';

import { useKKContext } from '../core/kk-context';
import { randColor } from '../util/rand';
import { useMobile } from '../util/use-mobile';

interface PersonProps {
  uuid: string;
  name: string;
  onDelete: () => void;
}

const Person = ({ uuid, name, onDelete }: PersonProps) => {
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
        variant="transparent"
        onClick={onDelete}
      >
        <Delete size={mobile ? 32 : 16} />
      </ActionIcon>
    </Group>
  );
};

export const AddPeople = () => {
  const navigate = useNavigate();
  const mobile = useMobile();
  const { kk, setKK } = useKKContext();

  const [people, setPeople] = useState<Record<string, string>>(kk.people ?? {});

  const [newPerson, setNewPerson] = useState<string>('');

  const addNewPerson = (e: any) => {
    e.preventDefault();
    setPeople({ ...(people ?? {}), [uuid()]: newPerson });
    setNewPerson('');
  };

  const removePerson = (uuid: string) => {
    const { [uuid]: _, ...rest } = people;
    setPeople(rest);
  };

  return (
    <>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          color="blue"
          rightIcon={<ArrowRight />}
          onClick={() => {
            setKK({ ...kk, people });
            navigate('/manage-relations');
          }}
          disabled={Object.keys(people).length < 2}
        >
          Continue
        </Button>
      </Affix>
      <Text size="xl" mb="sm">
        Let's get started!
      </Text>
      <Text color="light-gray" size="sm">
        Add the participants of your Kris Kringle below.
      </Text>
      <FlatCard my="lg">
        {Object.keys(people).length === 0 && (
          <Text
            size={mobile ? 'md' : 'sm'}
            p={mobile ? 'sm' : 0}
            color="dimmed"
          >
            You haven't added anyone yet.
          </Text>
        )}
        <Stack style={{ minWidth: 300 }}>
          {Object.entries(people).map(([uuid, name]) => (
            <Person
              key={uuid}
              uuid={uuid}
              name={name}
              onDelete={() => removePerson(uuid)}
            />
          ))}
        </Stack>
      </FlatCard>

      <form onSubmit={addNewPerson}>
        <Group noWrap>
          <TextInput
            placeholder="Santa Claus"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
          />
          <Button onClick={addNewPerson} color="green">
            Add
          </Button>
        </Group>
      </form>
    </>
  );
};
