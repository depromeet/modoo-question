import { createContext } from 'react';

export const UserContext = createContext({});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
