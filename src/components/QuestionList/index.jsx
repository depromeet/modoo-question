import React from 'react';
import styled from '@emotion/styled';
import Question from '../Question';

function QuestionList( {list} ) {

  return (
    <Wrapper>
        {list.map(q => (
            <Question questionText={q.text} likeNum={q.likeNum} liked={q.liked} />
        ))}
    </Wrapper>
    
  );
}

export default React.memo(QuestionList);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;
