import { useEffect } from 'react';
import { useKKContext } from '~/core/kk-context';

const convertGroupsToDisallowedConnections = (
  groups: Record<string, string[]>
) => {
  const disallowedConnections: Record<string, string[]> = {};

  Object.entries(groups).forEach(([group, members]) => {
    members.forEach((member) => {
      disallowedConnections[member] = members.filter((m) => m !== member);
    });
  });

  return disallowedConnections;
};

export const useDisallowConnections = () => {
  const { kk, setKK } = useKKContext();

  useEffect(() => {
    if (Object.keys(kk.groups ?? {}).length > 0) {
      setKK((prev) => ({
        ...prev,
        disallowedConnections: convertGroupsToDisallowedConnections(
          prev.groups ?? {}
        ),
      }));
    }
  }, [kk.groups, setKK]);

  const disallows = kk.disallowedConnections ?? {};

  /**
   * Tests if `a` is not allowed to be connected to `b`.
   */
  const isDisallowed = (a: string, b: string) =>
    b === a || disallows[a]?.includes(b) || disallows[b]?.includes(a);

  const disallow = (a: string, b: string) => {
    setKK((prev) => ({
      ...prev,
      disallowedConnections: {
        ...prev.disallowedConnections,
        [a]: [...(prev.disallowedConnections?.[a] ?? []), b],
      },
    }));
  };

  const allow = (a: string, b: string) => {
    setKK((prev) => ({
      ...prev,
      disallowedConnections: {
        ...prev.disallowedConnections,
        [a]: (prev.disallowedConnections?.[a] ?? []).filter((p) => p !== b),
        [b]: (prev.disallowedConnections?.[b] ?? []).filter((p) => p !== a),
      },
    }));
  };

  return {
    disallows,
    isDisallowed,
    disallow,
    allow,
    toggle: (a: string, b: string) =>
      isDisallowed(a, b) ? allow(a, b) : disallow(a, b),
  };
};
