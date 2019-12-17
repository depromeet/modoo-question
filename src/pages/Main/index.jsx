import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { enterSeminar } from '../../remotes/api';
import { connectWebSockets, postQuestion } from '../../remotes/websocket';
import { UserContext, SpeakerContext, QuestionContext, RankingContext } from '../../contexts';
import QuestionList from '../../components/QuestionList';
import ScrollableTabBar from '../../components/ScrollableTabBar';

function Main() {
  // Global State인 Context 변수 및 메소드 불러오기
  const { userId, setUserId, seminarRoom, setSeminarRoom } = useContext(UserContext);
  const { speakers, addNewSpeaker } = useContext(SpeakerContext);
  const { questions, setQuestions, addNewQuestion, updateLikeCount, removeQuestion } = useContext(QuestionContext);
  const { rankings, setRankings, updateRankingsOfSpeaker } = useContext(RankingContext);

  // Local State 변수 및 메소드 정의
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [currentSpeakerId, setCurrentSpeakerId] = useState(0);
  const [currentQuestionList, setCurrentQuestionList] = useState([]);
  const [currentRankingList, setCurrentRankingList] = useState([]);

  // URL로 방 입장 시
  useEffect(() => {
    if (userId === 0) {
      // URL을 직접 파싱하여 방 번호 구하기
      const paths = window.location.pathname.split("/");
      const seminarId = (seminarRoom.seminarId > 0)
        ? seminarRoom.seminarId
        : Number(paths[paths.length - 1]);

      // TODO: 방 번호가 존재하지 않는 방의 경우 체크하기

      // 현재 방의 발표자, 질문, 랭킹 정보를 업데이트
      enterSeminar(seminarId).then(res => {
        const { commentListBySpeaker, member } = res;
        const questionMap = {};
        const rankingMap = {};

        setUserId(member.mid);
        setSeminarRoom(member.seminarRoom);
        commentListBySpeaker.forEach(speech => {
          addNewSpeaker(speech.speaker);
          questionMap[speech.speaker.speakerId] = speech.commentList;
          rankingMap[speech.speaker.speakerId] = speech.commentRankingList;
        })
        setQuestions(questionMap);
        setRankings(rankingMap);
      });
    }
  }, []);

  // 발표자들 중 맨 앞의 발표자로 디폴트 설정 (선택한 발표)
  useEffect(() => {
    if (currentSpeakerId === 0 && speakers.length > 0) {
      setCurrentSpeakerId(speakers[0].speakerId);
    }
  }, [speakers]);

  // 발표자가 업데이트되면, 질문 및 랭킹 업데이트
  useEffect(() => {
    if (questions !== undefined && questions[currentSpeakerId]) {
      setCurrentQuestionList(questions[currentSpeakerId]);
      setCurrentRankingList(rankings[currentSpeakerId]);
    }
  }, [currentSpeakerId, questions])

  /** 웹소켓 연결 */
  useEffect(() => {
    if (seminarRoom.seminarId > 0 && userId > 0 && !isSocketConnected) {
      // TODO: async-await 형식으로 바꾸기 (connect 성공이면 -> setIsSocketConnected)
      connectWebSockets(seminarRoom.seminarId, receiveBroadcasting);
      setIsSocketConnected(true);
    }
  }, [userId, seminarRoom, isSocketConnected]);

  const inputChange = (e) => {
    setUserInput(e.target.value);
  };

  // TODO: currentSpeakerId 연동 확인
  const postNewQuestion = () => {
    if (userInput.trim().length > 0) {
      const message = JSON.stringify({
        'content': userInput,
        'mid': userId,
        'speakerId': currentSpeakerId,
      });
      postQuestion(seminarRoom.seminarId, message);
    }
  };

  const receiveBroadcasting = (data) => {
    console.log(data);

    if (data.type === 'COMMENT') {
      // addNewQuestion -> context
    } else if (data.type === 'LIKE') {
      // updateLikeCount
    } else if (data.type === 'UNLIKE') {
      // updateLikeCount
    } else if (data.type === 'DELETE') {
      // removeQuestion
    }
  };

  return (
    <Wrapper>
      <Background>
        <SeminarTitle>{seminarRoom.seminarTitle}</SeminarTitle>
        <SeminarId>{seminarRoom.seminarId}</SeminarId>
      </Background>
      <PageArea>
        <Navigation>
          <ScrollableTabBar>
            {speakers.map(s => (
              <div key={s.speakerId}>
                <p>{s.speakerTopic}</p>
                <p>
                  <span>{s.speakerName}</span>
                  <span>{s.organization}</span>
                </p>
              </div>
            ))}
          </ScrollableTabBar>
        </Navigation>
        <RankingSection>
          <RankingTitle>Question Ranking</RankingTitle>
          <RankingFoldButton>접는 아이콘</RankingFoldButton>
        </RankingSection>
        <QuestionSection>
          <QuestionList list={currentQuestionList} />
        </QuestionSection>
        <AskQuestion>
          <Input onChange={inputChange} />
          {/* TODO: 가로 길이에 따라 조건부 렌더링 */}
          {1 === 1 ? <SendButton onClick={postNewQuestion}>Send</SendButton>
            : <MobileButton onClick={postNewQuestion}>
            </MobileButton>}
        </AskQuestion>
      </PageArea>
    </Wrapper>);
}

export default React.memo(Main);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: -1;
  background-color: #f2f2f2;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 100;
  text-align: left;
  color: rgba(0, 0, 0, 0.08);
`;

const SeminarTitle = styled.div`
  width: 300px;
  height: 100%;
  font-size: 48px;
  line-height: 1.67;
  overflow-y: hidden;
`;

const SeminarId = styled.div`
  width: 183px;
  height: 100px;
  align-self: flex-end;
  font-size: 88px;
  line-height: 0.91;
  text-align: right;
`;

const PageArea = styled.div`
  max-width: 944px;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(4, auto);
  box-sizing: border-box;
  margin: auto;
  padding: 32px;
  background-color: white;
  box-shadow: 0 10px 90px 0 rgba(0, 0, 0, 0.16);
`;

const Navigation = styled.div`
  width: 100%;
`;

const RankingSection = styled.div`
  display: flex;
`;

const RankingTitle = styled.h2`
  font-family: 'Noto Sans', sans-serif;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: italic;
  line-height: 2.38;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
`;

const RankingFoldButton = styled.button`

`;

const QuestionSection = styled.div`
  overflow-x: auto;
`;

const AskQuestion = styled.div`
  width: 100%;
  height: 92px;
  display: grid;
  grid-template-columns: auto 132px;
  border-radius: 5px;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
`;

const Input = styled.textarea`
  border: none;
  box-sizing: border-box;
  padding: 16px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
  outline: none;
`;

const SendButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.45;
  text-align: center;
  background-color: transparent;
  color: rgba(242, 192, 99, 0.3);
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  margin: 7px 0 9px 0;
  outline: none;
  /* TODO: props 받아서 color: #f2c063 적용하기 */
`;

const MobileButton = styled.button`

`;
