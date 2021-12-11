import {
  ActionIcon,
  Affix,
  Button,
  Card,
  Group,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useState } from 'react';
import { ArrowRight, User, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { useKKContext } from '../core/kk-context';
import { randColor } from '../util/rand';

export const AddPeople = () => {
  const navigate = useNavigate();
  const { kk, setKK } = useKKContext();

  const [people, setPeople] = useState<Record<string, string>>(kk.people ?? {});

  const [newPerson, setNewPerson] = useState<string>('');

  const addNewPerson = (e: any) => {
    e.preventDefault();
    setPeople({ ...people, [uuid()]: newPerson });
    setNewPerson('');
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
      <Text color="gray" size="sm">
        Add the participants of your Kris Kringle below.
      </Text>
      <Card shadow="sm" my="lg">
        {Object.keys(people).length === 0 && (
          <Text size="sm" color="gray">
            You haven't added anyone yet.
          </Text>
        )}
        <Group direction="column" grow>
          {Object.entries(people).map(([key, name]) => (
            <Group key={key}>
              <ThemeIcon size={24} variant="light" color={randColor(key)}>
                <User size={16} />
              </ThemeIcon>
              <Text size="sm" style={{ flexGrow: 1 }}>
                {name}
              </Text>
              <ActionIcon
                size={24}
                color="red"
                variant="transparent"
                onClick={() =>
                  setPeople(
                    Object.fromEntries(
                      Object.entries(people).filter(([, n]) => n !== name)
                    )
                  )
                }
              >
                <X size={16} />
              </ActionIcon>
            </Group>
          ))}
        </Group>
      </Card>

      <form onSubmit={addNewPerson}>
        <Group>
          <TextInput
            placeholder="Santa Claus"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          <Button onClick={addNewPerson} color="green" style={{ flexGrow: 0 }}>
            Add
          </Button>
        </Group>
      </form>
    </>
  );
};
