import { createContext } from 'react';

export const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  seminarRoom: null,
  setSeminarRoom: () => {},
  currentSpeakerId: null,
  setCurrentSpeakerId: () => {},
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
