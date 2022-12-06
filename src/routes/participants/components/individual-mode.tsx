import { useParticipants } from '../hooks';
import { ParticipantInput } from './participant-input';
import { ParticipantList } from './participant-list';

export const IndividualMode = () => {
  const { participants, addParticipant, removeParticipant } = useParticipants();

  return (
    <>
      <ParticipantList
        participants={participants}
        onRemoveParticipant={removeParticipant}
      />
      <ParticipantInput onAddParticipant={addParticipant} />
    </>
  );
};
