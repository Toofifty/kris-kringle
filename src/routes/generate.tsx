import { Button, Card, Center, Group, Loader, Text } from '@mantine/core';
import { useEffect } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom';
import { generate } from '../core/generate-kks';
import { useKKContext } from '../core/kk-context';

const ATTEMPTS = 10;

export const Generate = () => {
  const navigate = useNavigate();
  const { kk, setKK } = useKKContext();

  const attemptToGenerate = () => {
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
          if (kk.results!.length === 0 && kk.view) {
            navigate('/results');
          }
          return;
        } catch {}
      }
    }, 100);
  };

  useEffect(() => {
    attemptToGenerate();
  }, []);

  const setViewMode = (view: 'all' | 'secret') => {
    setKK({ ...kk, view });
  };

  return (
    <>
      <Center>
        <Group direction="column" position="center">
          {kk.results && kk.results.length > 0 ? (
            <>
              <Text size="xl">Done!</Text>
              <Text>How would you like to view the results?</Text>
              <Group style={{ alignItems: 'start' }}>
                <Card shadow="sm" style={{ flex: 1 }}>
                  <Text mb="lg">
                    View all results. There's no secrets here.
                  </Text>
                  <Button
                    component={NavLink}
                    to="/results"
                    leftIcon={<Eye size={16} />}
                    onClick={() => setViewMode('all')}
                  >
                    View all
                  </Button>
                </Card>
                <Card shadow="sm" style={{ flex: 1 }}>
                  <Text mb="lg">View results one at a time.</Text>
                  <Text color="gray" size="sm" mb="lg">
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
                </Card>
              </Group>
            </>
          ) : (
            <>
              <Text size="xl">Generating...</Text>
              <Text>Sit tight! This won't take long</Text>
              <Loader />
            </>
          )}
        </Group>
      </Center>
    </>
  );
};
