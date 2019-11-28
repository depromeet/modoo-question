import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import { UserProvider, QuestionProvider } from './contexts';

const user = {
  /*
  userId: null,
  setUserId: () => {},
  seminarRoom: {},
  setSeminarRoom: () => {},
  */
 userId: 16,
 setUserId: () => {},
 seminarRoom: {seminarId: 15, seminarTitle: "디프만 외부 세미나"},
 setSeminarRoom: () => {},
};

const questionList = /*[]*/ [
  {
    "commentId": 1,
    "content": "질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?",
    "likeCount": 80,
    "target": "1타 강사"
  },
  {
    "commentId": 2,
    "content": "두 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?",
    "likeCount": 58,
    "target": "2타 강사"
  }
];

ReactDOM.render(
  <UserProvider value={user}>
    <QuestionProvider value={questionList}>
      <App />
    </QuestionProvider>
  </UserProvider>, 
  document.getElementById('root'));
