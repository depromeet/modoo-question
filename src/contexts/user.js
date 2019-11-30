import { createContext } from 'react';

export const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  seminarRoom: {},
  setSeminarRoom: () => {},
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
