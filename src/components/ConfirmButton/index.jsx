import React from 'react';
import styled from '@emotion/styled';

const ConfirmButton = ({ isFullInput, isWrongRoomNumber, isClickedConfirmButton, handleClickConfirmButton }) => {
  return (
    <ThirdRow>
      {isWrongRoomNumber && isFullInput && isClickedConfirmButton ? <WarningWrongNumber>잘못된 방 번호 입니다.</WarningWrongNumber> : <div />}
      <Confirm onClick={handleClickConfirmButton} isFullInput = {isFullInput}>확인</Confirm>
    </ThirdRow>
  )
}

export default ConfirmButton;

const ThirdRow = styled.div`
  display: flex;
  position: relative;
  bottom: 16px;
  justify-content: flex-end;

  @media screen and (min-width: 769px) {
    bottom: 32px;
  }
`

const Confirm = styled.div`
  position: relative;
  right: 16px;
  object-fit: contain;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.43;
  color: ${props => props.isFullInput ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.3)'};
  cursor: pointer;

  @media screen and (min-width: 769px) {
    font-size: 18px;
    right: 32px;
  }
`

const WarningWrongNumber = styled.div`
  position: relative;
  right: 80px;
  object-fit: contain;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  text-align: center;
  color: #f2385a;

  @media screen and (min-width: 769px) {
    font-size: 18px;
    right: 140px;
  }
`
