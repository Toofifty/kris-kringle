import { v4 as uuid } from 'uuid';

import { useKKContext } from '~/core/kk-context';

export const useParticipants = () => {
  const { kk, setKK } = useKKContext();

  return {
    participants: kk.individuals ?? {},
    addParticipant: (name: string) => {
      const id = uuid();
      setKK((prev) => ({
        ...prev,
        individuals: { ...(prev.individuals ?? {}), [id]: name },
      }));
      return id;
    },
    removeParticipant: (uuid: string) => {
      setKK((prev) => {
        const { [uuid]: _, ...rest } = prev.individuals ?? {};
        return { ...prev, individuals: rest };
      });
    },
  };
};
