import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import QuestionList from '../../components/QuestionList';
import { connectWebSockets, postQuestion, updateLike, updateUnlike, deleteQuestion } from '../../remotes/websocket';
import { UserContext, QuestionContext } from '../../contexts';

function Main() {

  // TODO: URL로 접근시 member join 콜하여 userId 업데이트
  //       URL로 접근시 parameter 값에서 enter seminar 콜하여 seminarRoom 업데이트
  const { userId, setUserId, seminarRoom } = useContext(UserContext);
  const questionList = useContext(QuestionContext);

  const [isConnected, setIsConnected] = useState(false);
  const [userInput, setUserInput] = useState('');

  const inputChange = (e) => {
    setUserInput(e.target.value);
  }

  const receiveBroadcasting = (data) => {
    console.log(data);
  };

  const postNewQuestion = () => {
    if (userInput.trim().length > 0) {
      //postQuestion()
    }
  }

  useEffect(() => {

    // TODO: 백엔드로부터 broadcast 된 질문들 받기 (subscribe -> )
    if (!isConnected) {
      connectWebSockets(seminarRoom.seminarId, receiveBroadcasting);
      setIsConnected(true);
    }
  }, [isConnected, seminarRoom.seminarId]);

  // TODO: 새 질문 작성시 웹소켓 CALL

  return (
    <Wrapper>
      <Background>
        <SeminarTitle>{seminarRoom.seminarTitle}</SeminarTitle>
        <SeminarId>{seminarRoom.seminarId}</SeminarId>
      </Background>
      <PageArea>
        <Navigation>

        </Navigation>
        <QuestionList list={questionList}/>
        <AskQuestion>
          <Input onChange={inputChange}/>
          <Button onClick={postNewQuestion}>Send</Button>
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
  width: 207px;
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
`;

const PageArea = styled.div`
  max-width: 944px;
  height: 100%;
  box-sizing: border-box;
  margin: auto;
  padding: 32px;
  background-color: white;
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
