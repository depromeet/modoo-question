import { createContext } from 'react';

export const QuestionContext = createContext([]);

export const QuestionProvider = QuestionContext.Provider;
export const QuestionConsumer = QuestionContext.Consumer;
