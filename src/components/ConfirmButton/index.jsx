import React, { Component } from 'react';
import styled from '@emotion/styled';
import { SampleConsumer } from '../../contexts/sample';

class ConfirmButton extends Component {
  handleIsClickedConfirmButton = () => {
    this.props.setValue.callApiWithEnterSeminarRoom();
    
    // api 호출이 비동기라 100ms 시간 지연 후 실행하도록 함. 고쳐야 함.
    setTimeout(() => {
      if (this.props.value.userSeminarName) {
        this.props.setValue.handleIsClickedConfirmButton();
      } else {
        this.props.setValue.handleInvalidRoomNumber();
      }
    }, 100)
  }
  
  render() {
    const { isInvalidRoomNumber, roomNumber } = this.props.value;
    return (
      <Wrapper>
        {isInvalidRoomNumber ? <WarningWrongNumber>잘못된 방 번호 입니다.</WarningWrongNumber> : null}
        <Confirm 
          onClick={this.handleIsClickedConfirmButton} 
          isFullInput={roomNumber.first.length}>
          {'확인'}
        </Confirm>
      </Wrapper>
    )
  }
}

export const ConfirmButtonContainer = () => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <ConfirmButton
          value={state}
          setValue={actions}
        />
      )
    }
  </SampleConsumer>
)

export default ConfirmButtonContainer;

const Wrapper = styled.div`
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
