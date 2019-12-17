import React, { useContext } from 'react';
import styled from '@emotion/styled'
import likeStar from './likeStar.svg'
import unlikeStar from './unlikeStar.svg'
import { UserContext } from '../../contexts';
import { updateLike, updateUnlike, deleteQuestion } from '../../remotes/websocket';

function QuestionItem({ content, likeCount, liked }) {

  const { userId, seminarRoom, currentSpeakerId } = useContext(UserContext);

  const star = liked ? likeStar : unlikeStar;
  const ariaLabel = liked ? '질문 좋아요' : '질문 좋아요 취소';

  const likeQuestion = (question) => {
    const message = JSON.stringify({
      commentId: question.commentId,
      mid: userId,
      speakerId: currentSpeakerId,
    });
    updateLike(seminarRoom.seminarId, message);
  };

  const unlikeQuestion = (question) => {
    const message = JSON.stringify({
      commentId: question.commentId,
      mid: userId,
      speakerId: currentSpeakerId,
    });
    updateUnlike(seminarRoom.seminarId, message);
  };

  const deleteExistingQuestion = (question) => {
    const message = JSON.stringify({
      commentId: question.commentId,
      mid: userId,
      speakerId: currentSpeakerId,
    });
    deleteQuestion(seminarRoom.seminarId, message);
  };

  return (
    <Wrapper>
      <Text>{content}</Text>
      <Likes>
        <LikeButton aria-label={ariaLabel}>
          <img src={star} alt="" aria-hidden="true" />
        </LikeButton>
        {likeCount}
      </Likes>
    </Wrapper>
  );
}

export default React.memo(QuestionItem);

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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.54);
`

const Likes = styled.div`
  width: 50px;
  height: 28px;
  display: flex;
  justify-content: space-between;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.75;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);

`;

const LikeButton = styled.button`
  width: 28px;
  height: 28px;
  padding: 0;
  background-color: transparent;
  border: none;
`;
