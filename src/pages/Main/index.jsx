import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { connectWebSockets, postQuestion, updateLike, updateUnlike, deleteQuestion } from '../../remotes/websocket';
import { UserContext, SpeakerContext, QuestionContext, RankingContext } from '../../contexts';
import QuestionList from '../../components/QuestionList';

function Main() {

  // TODO: URL로 접근시 member join 콜하여 userId 업데이트
  //       URL로 접근시 parameter 값에서 enter seminar 콜하여 seminarRoom 업데이트
  const { userId, setUserId, seminarRoom } = useContext(UserContext);
  const { speakers } = useContext(SpeakerContext);
  const { questions } = useContext(QuestionContext);
  const { rankings } = useContext(RankingContext);

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (!isSocketConnected) {
      connectWebSockets(seminarRoom.seminarId);
      setIsSocketConnected(true);
    }
    // TODO: 백엔드로부터 broadcast 된 질문들 받기 (subscribe -> )
    //       websocket.js에서 바로 question, ranking CONTEXT 업데이트?
    //       -> CONTEXT 업데이트 시 RE-RENDERING하게끔 하기?
    //       -> 그러면 receiveBroadcasting 메소드를 아예 websocket.js로 옮겨서 사용하면 될 듯!
  }, [isSocketConnected, seminarRoom.seminarId]);

  const inputChange = (e) => {
    setUserInput(e.target.value);
  };

  // TODO: 새 질문 작성시 웹소켓 CALL
  const sendNewQuestion = () => {
    if (userInput.trim().length > 0) {
      postQuestion(userInput);
    }
  };

  // TODO: <Question /> 에서 구현?
  const likeQuestion = (question) => {
    updateLike(question);
  }

  const unlikeQuestion = (question) => {
    updateUnlike(question);
  }

  return (
    <Wrapper>
      <Background>
        <SeminarTitle>{seminarRoom.seminarTitle}</SeminarTitle>
        <SeminarId>{seminarRoom.seminarId}</SeminarId>
      </Background>
      <PageArea>
        <Navigation>

        </Navigation>
        <QuestionList list={questions}/>
        <AskQuestion>
          <Input onChange={inputChange}/>
          {/* TODO: 가로 길이에 따라 조건부 렌더링 */}
          {1 === 1 ? <Button onClick={sendNewQuestion}>Send</Button>
          : <MobileButton onClick={sendNewQuestion}>
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
  font-family: NotoSansCJKkr;
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
  font-weight: 30;
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
