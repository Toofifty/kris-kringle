import { Button, Card, Center, Group, Text, ThemeIcon } from '@mantine/core';
import { useState } from 'react';
import { ArrowRight, Check, User } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useKKContext } from '../core/kk-context';
import { randColor } from '../util/rand';

export const ViewSecret = () => {
  const navigate = useNavigate();
  const { kk } = useKKContext();

  const getName = (id: string) => {
    return kk.people?.[id];
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
        <Group direction="column" position="center">
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
          <Card shadow="sm" padding="xl">
            <Group direction="column" position="center">
              <Group>
                <ThemeIcon
                  size={48}
                  variant="light"
                  color={randColor(currentViewer)}
                >
                  <User size={32} />
                </ThemeIcon>
                <Text size="lg">
                  <strong>{getName(currentViewer)}</strong>, you're gifting
                  to...
                </Text>
              </Group>
              {!revealed ? (
                <Button color="red" onClick={() => setRevealed(true)}>
                  Reveal!
                </Button>
              ) : (
                <>
                  <Group>
                    <ThemeIcon
                      size={48}
                      variant="light"
                      color={randColor(currentGiftee)}
                    >
                      <User size={32} />
                    </ThemeIcon>
                    <Text size="lg">
                      <strong>{getName(currentGiftee)}</strong>!
                    </Text>
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
                          navigate('/');
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
            </Group>
          </Card>
        </Group>
      </Center>
    </>
  );
};
