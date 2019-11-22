import React, { useState } from 'react';
import styled from '@emotion/styled';
import SockJsClient from 'react-stomp';
import QuestionList from '../../components/QuestionList';

function Main() {
  const userId = 12;
  const seminarRoom = {seminarId: 1234, seminarTitle: '디프만 외부 세미나'};

  const socketUrl = 'http://13.125.252.156:8081/q-rank-websock';
  const topics = [];

  const [isConnected, setIsConnected] = useState(false);

  // TODO: 인풋 validtation -> userInput.trim().length > 0

  const exampleList = [
    {text: "질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 80, liked: true},
    {text: "두 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 52, liked: false},
    {text: "세 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 2, liked: true},
  ]

  const onConnect = () => {
    setIsConnected(true);
    console.log('connected');
  }

  const onDisconnect = () => {
    setIsConnected(false);
    console.log('disconnected');
  }

  const onMessageReceive = (msg, topic) => {
    console.log(msg + topic);
  }
  
  return (
    <Wrapper>
      <SockJsClient 
        url={socketUrl}
        topics={topics}
        onMessage={onMessageReceive}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
      <Background>
        <SeminarTitle>{seminarRoom.seminarTitle}</SeminarTitle>
        <SeminarId>{seminarRoom.seminarId}</SeminarId>
      </Background>
      <PageArea>
        <Navigation>

        </Navigation>
        <QuestionList list={exampleList}/>
        <AskQuestion>
          <Input />
          <Button>Send</Button>
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
