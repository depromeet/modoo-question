import { createContext } from 'react';

export const SpeakerContext = createContext({
  // speakers: targetList 형태
  speakers: [
    {
      speakerId: 0,
      speakerName: "",
      speakerTopic: "",
      organization: "",
    },
  ],
  setSpeakers: () => {},
  addNewSpeaker: () => {},
});

export const SpeakerProvider = SpeakerContext.Provider;
export const SpeakerConsumer = SpeakerContext.Consumer;
