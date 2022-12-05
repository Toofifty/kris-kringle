import {
  Affix,
  Alert,
  Button,
  Card,
  Group,
  Loader,
  MediaQuery,
  Stack,
  Text,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, Eye, EyeOff } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';
import { FlatCard } from '../components/flat-card';
import {
  FailedToGenerateError,
  generate,
  NoConnectionError,
} from '../core/generate-kks';
import { useKKContext } from '../core/kk-context';

const ATTEMPTS = 10;

export const Generate = () => {
  const navigate = useNavigate();
  const { kk, setKK } = useKKContext();

  const [error, setError] = useState<React.ReactNode>();

  const attemptToGenerate = () => {
    setError(undefined);
    setKK({ ...kk, results: undefined });
    setTimeout(async () => {
      let attempts = 0;
      while (attempts < ATTEMPTS) {
        attempts++;
        console.log(attempts);
        try {
          const results = generate(
            Object.keys(kk.people!),
            kk.disallowedConnections!
          );
          setKK({ ...kk, results });
          console.table(results);
          // this indicates "regenerate" was clicked
          if (results!.length === 0 && kk.view) {
            navigate('/results');
          }
          return;
        } catch (e) {
          if (e instanceof NoConnectionError) {
            setError(
              <Text>
                <strong>{kk.people?.[e.uuid]}</strong> had no possible
                connections.
                <br />
                The restrictions provided may have been too strict - try
                removing some.
              </Text>
            );
            return;
          }

          if (e instanceof FailedToGenerateError) {
            setError(
              <Text>
                Failed to generate after trying for a really long time... I
                don't really know why it didn't work this time. I guess you can
                try again and see if it works?
              </Text>
            );
            return;
          }

          if (e instanceof Error) {
            setError(
              <Text>
                An unknown error occurred. Please report this to the developer.
                <br />
                {e.stack}
              </Text>
            );
            return;
          }
        }
      }
    }, 100);
  };

  useEffect(() => {
    attemptToGenerate();
  }, []);

  const setViewMode = (view: 'all' | 'secret') => {
    setKK({ ...kk, view });
  };

  if (error) {
    return (
      <>
        <Affix position={{ bottom: 20, right: 20 }}>
          <Group>
            <Button
              color="gray"
              leftIcon={<ArrowLeft />}
              onClick={() => navigate('/add-people')}
            >
              Let me try again
            </Button>
          </Group>
        </Affix>
        <Alert icon={<AlertCircle />} title="Error" color="red">
          {error}
        </Alert>
      </>
    );
  }

  return (
    <>
      {kk.results && kk.results.length > 0 ? (
        <>
          <Text size="xl">Done!</Text>
          <Text>How would you like to view the results?</Text>
          <Group style={{ alignItems: 'start' }}>
            <Card shadow="sm" style={{ flex: 1, minWidth: 300 }}>
              <Stack>
                <Text>View all results. </Text>
                <Text color="gray" size="sm">
                  There's no secrets here.
                </Text>
                <Button
                  component={NavLink}
                  to="/results"
                  leftIcon={<Eye size={16} />}
                  onClick={() => setViewMode('all')}
                >
                  View all
                </Button>
              </Stack>
            </Card>
            <Card shadow="sm" style={{ flex: 1, minWidth: 300 }}>
              <Stack>
                <Text>View results one at a time.</Text>
                <Text color="gray" size="sm">
                  Pass your phone around so people can see who they're gifting
                  to, privately.
                </Text>
                <Button
                  component={NavLink}
                  to="/results"
                  leftIcon={<EyeOff size={16} />}
                  onClick={() => setViewMode('secret')}
                >
                  View privately
                </Button>
              </Stack>
            </Card>
          </Group>
        </>
      ) : (
        <FlatCard my="lg">
          <Stack align="center" spacing="xl" my="xl">
            <Text size="xl">Generating...</Text>
            <Text size="lg" color="dimmed">
              Sit tight! This won't take long
            </Text>
            <Loader />
          </Stack>
        </FlatCard>
      )}
    </>
  );
};
