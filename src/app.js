import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserProvider, SpeakerProvider, QuestionProvider, RankingProvider } from './contexts';
import Enter from './pages/Enter';
import Main from './pages/Main';

export default function App() {
  
  // Global State인 Contexts 디폴트 값 정의
  const [id, setId] = useState(0);
  const [room, setRoom] = useState({
    seminarId: 0,
    seminarTitle: '',
  });
  const [curSpeakerId, setCurSpeakerId] = useState(0);
  const [speakers, setSpeakers] = useState([]);

  /* 성능 개선점: 배열이 아닌 object (또는 dict) 형태로 바꾸기
     option 1: 백엔드로부터 받을 때 object로 받음
               -> 최초 질문 리스트 업데이트 O(1), like 업데이트 O(1)
     option 2: 백엔드로부터 array로 받되 최초 업데이트 시 object로 형태 변형하여 저장
               -> 최초 질문 리스트 업데이트 O(n), like 업데이트 O(1)
  */
  const [questionsForSpeakers, setQuestionsForSpeakers] = useState({});
  const [rankingsPerSpeakers, setRankingsPerSpeakers] = useState({});

  const userContext = {
    userId: id,
    setUserId: (idNum) => { setId(idNum) },
    seminarRoom: room,
    setSeminarRoom: (roomInfo) => { setRoom(roomInfo) },
    currentSpeakerId: curSpeakerId,
    setCurrentSpeakerId: (speakerId) => { setCurSpeakerId(speakerId) },
  };

  const speakerContext = {
    speakers: speakers,
    setSpeakers: (speakerList) => { setSpeakers(speakerList) },
    addNewSpeaker: (speaker) => { setSpeakers(prev => [...prev, speaker] ) },
  };

  const questionContext = {
    questions: questionsForSpeakers,
    setQuestions: (questionMap) => { 
      setQuestionsForSpeakers(questionMap) 
    },
    addNewQuestion: (speaker, question) => { 
      setQuestionsForSpeakers(prev => ({
        ...prev, 
        [speaker.speakerId]: [...prev[speaker.speakerId], question],
      }));
    },
    // TODO: question보다 question.id만 받아서 사용할 수 있는지
    removeQuestion: (speaker, question) => { 
      setQuestionsForSpeakers(prev => ({
        ...prev,
        [speaker.speakerId]: prev[speaker.speakerId].filter(q => 
          q.commentId !== question.commentId
        ),
      }));
    },
    // TODO: question보다 question.id만 받아서 사용할 수 있는지
    updateLikeCount: (speaker, question, likeCount) => {
      setQuestionsForSpeakers(prev => ({
        ...prev,
        [speaker.speakerId]: prev[speaker.speakerId].map(q => {
          if (q.commentId === question.commentId) {
            return ({
              ...q,
              likeCount: likeCount,
            });
          }
          return q;
        }),
      }));
    }
  };

  const rankingContext = {
    rankings: rankingsPerSpeakers,
    setRankings: (rankingMap) => { setRankingsPerSpeakers(rankingMap) },
    updateRankingsOfSpeaker: (speaker, rankingsList) => {
      setRankingsPerSpeakers(prev => ({
        ...prev,
        [speaker.speakerId]: rankingsList,
      }))
    }
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
