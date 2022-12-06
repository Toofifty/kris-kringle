import { Button, Card, Center, Group, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { ArrowRight, Check, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { URLs } from '~/urls';
import { Avatar } from '../components/avatar';
import { useKKContext } from '../core/kk-context';

export const ViewSecret = () => {
  const navigate = useNavigate();
  const { kk } = useKKContext();

  const getName = (id: string) => {
    return kk.individuals?.[id];
  };

  const [personId, setPersonId] = useState(0);

  const [revealed, setRevealed] = useState(false);

  const currentViewer = kk.results![personId][0];
  const currentGiftee = kk.results![personId][1];
  const nextViewer = kk.results![personId + 1]?.[0];

  const isLast = personId === kk.results!.length - 1;

  return (
    <>
      <Center>
        <Stack align="center">
          {isLast ? (
            <Text size="xl" mb="sm">
              Lucky last! Pass the phone to{' '}
              <strong>{getName(currentViewer)}</strong>
            </Text>
          ) : (
            <Text size="xl" mb="sm">
              Pass the phone to <strong>{getName(currentViewer)}</strong>
            </Text>
          )}
          <Card shadow="sm" p="xl">
            <Stack align="center">
              <Group spacing={0}>
                <Avatar id={currentViewer} type="santa" size="lg" />
                <Text size="lg">, you're gifting to...</Text>
              </Group>
              {!revealed ? (
                <Button color="red" onClick={() => setRevealed(true)}>
                  Reveal!
                </Button>
              ) : (
                <>
                  <Group spacing={0}>
                    <Avatar id={currentGiftee} type="giftee" size="lg" />
                    <Text size="lg">!</Text>
                  </Group>
                  {isLast ? (
                    <>
                      <Text
                        color="gray"
                        size="sm"
                        my="lg"
                        style={{ maxWidth: 300, textAlign: 'center' }}
                      >
                        Memorize who you're gifting to, then press the button
                        below to end the session.
                      </Text>
                      <Button
                        color="blue"
                        onClick={() => {
                          setRevealed(false);
                          navigate(URLs.Welcome);
                        }}
                        rightIcon={<Check size={16} />}
                      >
                        End session
                      </Button>
                    </>
                  ) : (
                    <>
                      <Text
                        color="gray"
                        size="sm"
                        my="lg"
                        style={{ maxWidth: 300, textAlign: 'center' }}
                      >
                        Memorize who you're gifting to before pressing{' '}
                        <strong>continue</strong> and passing the phone to{' '}
                        <strong>{getName(nextViewer)}</strong>.
                      </Text>
                      <Button
                        color="green"
                        onClick={() => {
                          setRevealed(false);
                          setPersonId(personId + 1);
                        }}
                        rightIcon={<ArrowRight size={16} />}
                      >
                        Continue
                      </Button>
                    </>
                  )}
                </>
              )}
            </Stack>
          </Card>
        </Stack>
      </Center>
    </>
  );
};
