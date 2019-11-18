import React from 'react';
import styled from '@emotion/styled';
import QuestionList from '../../components/QuestionList';

function Main() {

  // TODO: 인풋 validtation -> userInput.trim().length > 0

  const exampleList = [
    {text: "질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 80, liked: true},
    {text: "두 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 52, liked: false},
    {text: "세 번째 질문이 있습니다! 디프만은 어떤 동아리인가요? 구체적으로 어떤 활동을 하나요?", likeNum: 2, liked: true},
  ]
  
  return (
    <Wrapper>
      <PageArea>
        <TabMenu>

        </TabMenu>
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
  display: grid;
  grid-template-row: 
`;

const PageArea = styled.div`
  max-width: 944px;
  height: 100%;
  box-sizing: border-box;
  padding: 32px;
`;

const TabMenu = styled.div`
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
