import { createContext } from 'react';

export const QuestionContext = createContext({
  // questions[speakerId] = commentList
  questions: {
    speakerId: [
      {
        commentId: 0,
        context: "",
        likeCount: 0,
      },
    ],
  },
  setQuestions: () => {},
  addNewQuestion: () => {},
  deleteQuestion: () => {},
  updateLikeCount: () => {},
});

export const QuestionProvider = QuestionContext.Provider;
export const QuestionConsumer = QuestionContext.Consumer;
