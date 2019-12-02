import { createContext } from 'react';

export const QuestionContext = {
  questions: {
    'speaker': [
      {
        commentId: 0,
        context: "",
        likeCount: 0,
      },
    ],
  },
  setQuestions: () => {},
}

export const QuestionProvider = QuestionContext.Provider;
export const QuestionConsumer = QuestionContext.Consumer;
