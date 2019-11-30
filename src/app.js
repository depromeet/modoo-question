import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserProvider, SpeakerProvider, QuestionProvider, RankingProvider } from './contexts';
import Enter from './pages/Enter';
import Main from './pages/Main';

export default function App() {

  // Context로 inject할 디폴트 State 정의
  const [id, setId] = useState(/*-1*/16);
  const [room, setRoom] = useState({
    /*
    seminarId: null,
    seminarTitle: null,
    */
    seminarId: 1234,
    seminarTitle: "디프만 외부 세미나",
  });
  const [speakers, setSpeakers] = useState(/*[]*/
    ['디프마니', '라이언', '니니즈']
  );
  const [questionsForSpeakers, setQuestionsForSpeakers] = useState({
    /*{}*/
    "디프마니": [
      {
        commentId: 1,
        content: "질문 있어요! (to. 디프마니 님)",
        likeContent: 5,
      },
      {
        commentId: 2,
        content: "두 번째 질문! (to. 디프마니 님)",
        likeContent: 10,
      }
    ],
    "라이언": [
      {
        commentId: 1,
        content: "질문! (to. 라이언 님)",
        likeContent: 15,
      },
      {
        commentId: 2,
        content: "두 번째 질문! (to. 라이언 님)",
        likeContent: 20,
      }
    ],
    "니니즈": [],
  });
  const [rankingsPerSpeakers, setRankingsPerSpeakers] = useState(/*{}*/{
    "디프마니": [
      {
        commentId: 1,
        content: "랭킹이 제일 높은 질문! (to. 디프마니 님)",
        likeContent: 50,
      },
      {
        commentId: 2,
        content: "랭킹이 두 번째로 높은 질문! (to. 디프마니 님)",
        likeContent: 10,
      }
    ],
    "라이언": [
      {
        commentId: 1,
        content: "랭킹이 제일 높은 질문! (to. 라이언 님)",
        likeContent: 60,
      },
      {
        commentId: 2,
        content: "랭킹이 두 번째로 높은 질문! (to. 라이언 님)",
        likeContent: 20,
      }
    ],
    "니니즈": [],
  });

  const userContext = {
    userId: id,
    setUserId: (idNum) => { setId(idNum) },
    seminarRoom: room,
    setSeminarRoom: (roomInfo) => { setRoom(roomInfo) },
  };

  const speakerContext = {
    speakers: speakers,
    setSpeakers: (speakerList) => { setSpeakers(speakerList) },
  };

  const questionContext = {
    questions: questionsForSpeakers,
    setQuestions: (questionMap) => { setQuestionsForSpeakers(questionMap) },
  };

  const rankingContext = {
    rankings: rankingsPerSpeakers,
    setRankings: (rankingMap) => { setRankingsPerSpeakers(rankingMap) },
  };

  return (
    <UserProvider value={userContext}>
      <SpeakerProvider value={speakerContext}>
        <QuestionProvider value={questionContext}>
          <RankingProvider value={rankingContext}>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={Enter} />
                <Route exact path='/:roomId' component={Main} />
              </Switch>
            </BrowserRouter>
          </RankingProvider>
        </QuestionProvider>
    </SpeakerProvider>
  </UserProvider>
  );
};
