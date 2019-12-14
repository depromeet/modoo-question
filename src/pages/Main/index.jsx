import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { connectWebSockets, postQuestion } from '../../remotes/websocket';
import { UserContext, SpeakerContext, QuestionContext, RankingContext } from '../../contexts';
import QuestionList from '../../components/QuestionList';
import ScrollableTabBar from '../../components/ScrollableTabBar';

function Main() {

  // TODO: URL로 접근시 member join 콜하여 userId 업데이트
  //       URL로 접근시 parameter 값에서 enter seminar 콜하여 seminarRoom 업데이트
  const { userId, setUserId, seminarRoom, setSeminarRoom, currentSpeakerId, setCurrentSpeakerId } = useContext(UserContext);
  const { speakers, setSpeakers } = useContext(SpeakerContext);
  const { questions, addNewQuestion, updateLikeCount, removeQuestion } = useContext(QuestionContext);
  const { rankings, updateRankingsOfSpeaker } = useContext(RankingContext);

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (!isSocketConnected) {
      // TODO: async-await 형식으로 바꾸기 (connect 성공이면 -> setIsSocketConnected)
      connectWebSockets(seminarRoom.seminarId, receiveBroadcasting);
      setIsSocketConnected(true);
    }
  }, [isSocketConnected, seminarRoom.seminarId]);

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

    } else if (data.type === 'LIKE') {

    } else if (data.type === 'UNLIKE') {

    } else if (data.type === 'DELETE') {

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
        <QuestionList list={questions[currentSpeakerId]} />
        <AskQuestion>
          <Input onChange={inputChange} />
          {/* TODO: 가로 길이에 따라 조건부 렌더링 */}
          {1 === 1 ? <Button onClick={postNewQuestion}>Send</Button>
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
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: -1;
  background-color: #f2f2f2;
  font-family: 'NotoSansCJKkr';
  font-weight: 100;
  text-align: left;
  color: rgba(0, 0, 0, 0.08);
`;

const SeminarTitle = styled.div`
  width: 300px;
  height: 100%;
  font-size: 48px;
  font-weight: 50;
  line-height: 1.67;
  overflow-y: hidden;
`;

const SeminarId = styled.div`
  width: 183px;
  height: 100px;
  font-weight: 100;
  align-self: flex-end;
  font-size: 88px;
  line-height: 0.91;
`;

const PageArea = styled.div`
  max-width: 944px;
  height: 100%;
  box-sizing: border-box;
  margin: auto;
  padding: 32px;
  background-color: white;
  box-shadow: 0 10px 90px 0 rgba(0, 0, 0, 0.16);
`;

const Navigation = styled.div`
  width: 100%;
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

const Button = styled.button`
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
`;

const MobileButton = styled.button`

`;
