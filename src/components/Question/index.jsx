import React from 'react';
import styled from '@emotion/styled'
import likeStar from './likeStar.svg'
import unlikeStar from './unlikeStar.svg'

function Question( {questionText, likeNum, liked} ) {

  const star = liked ? likeStar : unlikeStar;
  const ariaLabel = liked ? '질문 좋아하기' : '질문 좋아하지 않기';

  return (
    <Wrapper>
      <Text>{questionText}</Text>
      <Likes>
        <LikeButton aria-label={ariaLabel}>
          <img src={star} alt="" aria-hidden="true" />
        </LikeButton>
        {likeNum}
      </Likes>
    </Wrapper>
  );
}

export default React.memo(Question);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const Text = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  background-color: rgba(242, 242, 242, 0.54);
  box-sizing: border-box;
  padding: 16px;
  font-size: 14px;
  line-height: 1.71;
  color: rgba(0, 0, 0, 0.54);
`

const Likes = styled.div`
  width: 50px;
  height: 28px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.75;
  color: rgba(0, 0, 0, 0.87);
`;

const LikeButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 0;
  background-color: transparent;
  border: none;
`;
