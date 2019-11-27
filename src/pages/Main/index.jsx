import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import QuestionList from '../../components/QuestionList';
import { connectWebSockets, postQuestion, updateLike, updateUnlike, deleteQuestion } from '../../remotes/websocket';

function Main(userId, seminarRoom) {

  const [isConnected, setIsConnected] = useState(false);
  const [questionList, setQuestionList] = useState(new Map());
  const [userInput, setUserInput] = useState('');

  // TODO: 인풋 validtation -> 
  const inputChange = (e) => {
    setUserInput(e.target.value);
  }

  const postNewQuestion = () => {
    if (userInput.trim().length > 0) {
      //postQuestion()
    }
  }


  // TODO: liked 관리...? (API에는 liked가 포함이 되지 않음...)
  const exampleList = [
    {commentId: 1, content: "질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 80, liked: true},
    {commentId: 2, content: "두 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 52, liked: false},
    {commentId: 3, content: "세 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 2, liked: true},
  ];

  useEffect(() => {

    // TODO: 백엔드로부터 broadcast 된 질문들 받기
    if (!isConnected) {
      connectWebSockets(seminarRoom.seminarId);
    }
  });

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
        <QuestionList list={exampleList}/>
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
