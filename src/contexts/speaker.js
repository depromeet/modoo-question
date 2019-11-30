import { createContext } from 'react';

export const SpeakerContext = createContext({
  // TODO: speaker 자료구조 구조 넣기
  speakers: [
    {
      targetName: "",
      target
    }
  ],
  setSpeakers: () => {},
});

export const SpeakerProvider = SpeakerContext.Provider;
export const SpeakerConsumer = SpeakerContext.Consumer;
