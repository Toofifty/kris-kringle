import {
  Alert,
  Button,
  Card,
  Group,
  Loader,
  Space,
  Stack,
  Text,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowLeft, Eye, EyeOff, RefreshCcw } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';

import { ActionAffix, FlatCard } from '~/components';
import { URLs } from '~/urls';
import {
  FailedToGenerateError,
  generate,
  NoConnectionError,
} from '~/core/generate-kks';
import { useKKContext } from '~/core/kk-context';

const ATTEMPTS = 10;

export const Generate = () => {
  const navigate = useNavigate();
  const { kk, setKK } = useKKContext();

  const [error, setError] = useState<React.ReactNode>();

  const attemptToGenerate = () => {
    setError(undefined);
    setKK((prev) => ({ ...prev, results: undefined }));
    setTimeout(async () => {
      let attempts = 0;
      while (attempts < ATTEMPTS) {
        attempts++;
        console.log(attempts);
        try {
          const results = generate(
            Object.keys(kk.individuals!),
            kk.disallowedConnections!,
            kk.force
          );
          setKK({ ...kk, results });
          console.table(results);
          // this indicates "regenerate" was clicked
          if (results!.length === 0 && kk.view) {
            navigate(URLs.Results);
          }
          return;
        } catch (e) {
          if (e instanceof NoConnectionError) {
            setError(
              <Text>
                <strong>{kk.individuals?.[e.uuid]}</strong> had no possible
                connections.
                <Space h="sm" />
                The restrictions provided may have been too strict - try
                removing some.
                <Space h="sm" />
                You can also <strong>force it</strong> to allow the algorithm to
                ignore restrictions where needed.
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
        <ActionAffix>
          <Group>
            <Button
              color="gray"
              leftIcon={<ArrowLeft />}
              onClick={() => navigate(URLs.Participants)}
            >
              Change settings
            </Button>
            <Button
              color="red"
              leftIcon={<AlertCircle />}
              onClick={() => {
                setKK((prev) => ({ ...prev, force: true }));
                attemptToGenerate();
              }}
            >
              Force it
            </Button>
          </Group>
        </ActionAffix>
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
            <FlatCard style={{ flex: 1, minWidth: 300 }}>
              <Stack>
                <Button
                  component={NavLink}
                  to={URLs.Results}
                  leftIcon={<Eye size={16} />}
                  onClick={() => setViewMode('all')}
                >
                  View all
                </Button>
                <Text color="gray" size="sm">
                  Show all matches at once.
                </Text>
              </Stack>
            </FlatCard>
            <FlatCard style={{ flex: 1, minWidth: 300 }}>
              <Stack>
                <Button
                  component={NavLink}
                  to={URLs.Results}
                  leftIcon={<EyeOff size={16} />}
                  onClick={() => setViewMode('secret')}
                >
                  View privately
                </Button>
                <Text color="gray" size="sm">
                  Pass your phone around so people can see who they're gifting
                  to in private.
                </Text>
              </Stack>
            </FlatCard>
          </Group>
        </>
      ) : (
        <FlatCard my="lg">
          <Stack align="center" spacing="xl" my="xl">
            <Text size="xl">Generating...</Text>
            <Loader />
          </Stack>
        </FlatCard>
      )}
    </>
  );
};
