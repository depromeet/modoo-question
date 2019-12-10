import React , { Component } from 'react';
import styled from '@emotion/styled';
import { InputBoxContainer } from '../InputBox';
import { ConfirmButtonContainer } from '../ConfirmButton'
import { SampleConsumer } from '../../contexts/sample';

class EntryBox extends Component {
  render() {
    const { isClickedAdminMode, } = this.props.value;
    const { handleIsClickedAdminMode, handleIsClickedCreateRoomButton, } = this.props.setValue;
    return (
      <Contents>
        <Content>
          <CenterBox>
            <Row>
              <EntranceRoom>방 입장하기</EntranceRoom>
              {
              isClickedAdminMode ?
              <CreateRoom onClick={handleIsClickedCreateRoomButton}>방 만들기</CreateRoom>
              :
              <CreateRoom onClick={handleIsClickedAdminMode}>관리자 모드</CreateRoom>
              }
            </Row>
            <InputBoxContainer />
            <ConfirmButtonContainer />
          </CenterBox>
        </Content>
      </Contents>
    )
  }
};

export const EntryBoxContainer = () => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <EntryBox 
          value={state}
          setValue={actions}
        />
      )
    }
  </SampleConsumer>
)

const Contents = styled.div`
  display: flex;
  height: 100%;
`

const Content = styled.div`
  margin: auto 0;
  width: 100%;
`

const CenterBox = styled.div`
  width: 328px;
  height: 268px;
  border-radius: 5px;
  box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.08);
  background-color: #ffffff;
  bottom: 29vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  z-index: 2;

  @media screen and (min-width: 769px) {
    width: 496px;
    height: 438px;
    bottom: 25vh;
  }
`

const Row = styled.div`
  display: flex;
  position: relative;
  top: 16px;
  justify-content: space-between;

  @media screen and (min-width: 769px) {
    top: 32px;
  }
`

const EntranceRoom = styled.div`
  position: relative;
  left: 16px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.19;
  color: rgba(0, 0, 0, 0.87);

  @media screen and (min-width: 769px) {
    left: 32px;
    font-size: 24px;
  }
`

const CreateRoom = styled.div`
  display: none;
  position: relative;
  right: 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  color: rgba(0, 0, 0, 0.87);
  text-decoration: underline;

  @media screen and (min-width: 769px) {
    display: block;
    right: 32px;
    font-size: 18px;
  }
`
