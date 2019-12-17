import React from 'react';
import styled from '@emotion/styled';
import QuestionItem from '../QuestionItem';

function QuestionList( {list} ) {

  return (
    <Wrapper>
        {list.map(q => (
            <QuestionItem key={q.commentId} content={q.content} likeCount={q.likeCount} />
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
