import React , { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { InputBoxContainer } from '../InputBox';
import { ConfirmButtonContainer } from '../ConfirmButton'
import { SampleConsumer } from '../../contexts/sample';
import { PasswordFormContainer } from '../PasswordForm';
import backspaceImg from '../../static/images/arrow-set-action-n@3x.png';

class EntryBox extends Component {
  render() {
    const { isClickedAdminMode, } = this.props.value;
    const { handleIsClickedAdminMode, handleIsClickedCreateRoomButton, handleIsClickedAdminModeToFalse, } = this.props.setValue;
    return (
      <Contents>
        <Content>
          <CenterBox>
            <Row>
              {isClickedAdminMode ?
              <Fragment>
                <BackspaceImage onClick={handleIsClickedAdminModeToFalse}/>
                <EntranceRoom isClickedAdminMode={isClickedAdminMode}>관리자로 방 입장하기</EntranceRoom>
              </Fragment>
              :
              <EntranceRoom>방 입장하기</EntranceRoom>}
              {isClickedAdminMode ?
              <CreateRoom onClick={handleIsClickedCreateRoomButton}>방 만들기</CreateRoom>
              :
              <CreateRoom onClick={handleIsClickedAdminMode}>관리자 모드</CreateRoom>}
            </Row>
            {isClickedAdminMode && <RoomNumber>방 번호</RoomNumber>}
            <InputBoxContainer />
            {isClickedAdminMode && <Password>방 비밀번호</Password>}
            {isClickedAdminMode && <PasswordFormContainer />}
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

const RoomNumber = styled.div`
  font-size: 24px;
  font-weight: 300;
  line-height: 0.92;
  color: rgba(0, 0, 0, 0.54);
  position: relative;
  top: 85px;
  left: 32px;
`

const Password = styled.div`
  font-size: 24px;
  font-weight: 300;
  line-height: 0.92;
  color: rgba(0, 0, 0, 0.54);
  position: relative;
  top: 58px;
  left: 32px;
`

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
  top: 3px;

  @media screen and (min-width: 769px) {
    left: ${props => props.isClickedAdminMode ? "-65px" : "32px"};
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
const BackspaceImage = styled.span`
  width: 28px;
  height: 28px;
  background-image: url(${backspaceImg}); 
  background-size: cover;
  position: relative;
  left: 32px;
  cursor: pointer;
`