import { v1 as uuid } from 'uuid';

import { useKKContext } from '~/core/kk-context';

import { useParticipants } from './use-participants';

export const useGroups = () => {
  const { kk, setKK } = useKKContext();
  const { participants, addParticipant, removeParticipant } = useParticipants();

  return {
    groups: kk.groups ?? {},
    participants,
    addGroup: () => {
      const id = uuid();
      setKK({ ...kk, groups: { ...kk.groups, [id]: [] } });
      return id;
    },
    removeGroup: (id: string) => {
      const { [id]: group, ...rest } = kk.groups ?? {};
      group.forEach(removeParticipant);
      setKK((prev) => ({ ...prev, groups: rest }));
    },
    addParticipant: (participant: string, group: string) => {
      const id = addParticipant(participant);
      setKK((prev) => ({
        ...prev,
        groups: {
          ...prev.groups,
          [group]: [...(prev.groups?.[group] ?? []), id],
        },
      }));
    },
    removeParticipant: (participant: string) => {
      removeParticipant(participant);
      setKK((prev) => ({
        ...prev,
        groups: Object.fromEntries(
          Object.entries(prev.groups ?? {}).map(([k, v]) => [
            k,
            v.filter((p) => p !== participant),
          ])
        ),
      }));
    },
  };
};
