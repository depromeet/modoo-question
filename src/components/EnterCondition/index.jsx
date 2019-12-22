import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import EntryView from '../EntryView';
import SeminarInfoContainer from '../SeminarInfo';
import logoImg from '../../static/images/33-3@3x.png';
import reverseTriangle from '../../static/images/arrow-up-b-n@3x.png';
import { SampleConsumer } from '../../contexts/sample';
import { createSeminarRoom } from '../../remotes/api';
import SpeakerFormsContainer from '../SpeakerForms';
import leftBottomArrow from '../../static/images/leftBottomArrow.png';
import mouse from '../../static/images/mouse.png';

class EnterCondition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideHelp: false,
      isClickedAnywhere: false,
    }
  }
  createRoom = () => {
    const { value, setValue } = this.props;
    const password = value.password.first + value.password.second + value.password.third + value.password.fourth;
    const speakerList = value.seminars.map(value => {
      return {
        "organization": `${value.division}`,
        "seminarId": 0,
        "speakerName": `${value.speakerName}`,
        "speakerTopic": `${value.title}`,
      }
    });
    const seminarDto = {
      "fullURL": "http://naver.com",
      "seminarPassword": `${password}`,
      "seminarTitle": `${value.userSeminarName}`
    }
    createSeminarRoom(seminarDto, speakerList).then(data => {
      console.log(data[0].seminarRoom);
      const { seminarTitle, seminarId, shortURL } = data[0].seminarRoom
      setValue.setUserSeminarName(seminarTitle, seminarId, shortURL);
    });
    setValue.handleIsClickedReverseTriangleToFalse();
    setValue.handleIsCreatedRoom();
  }
  handleHelp = () => {
    this.setState({ isClickedAnywhere: true });
  }

  render() {
    const { value, setValue } = this.props;
    const isCorrectRoomNumber = value.roomNumber.first.length && value.isClickedConfirmButton;
    
    // 유저가 방 번호 입력후 확인 버튼 눌러서 진입 || // 방 정상적으로 생성 후 진입
    if (isCorrectRoomNumber || value.isCreatedRoom) {
      return (
          <Wrap>
            <Logo />
            <SeminarInfoContainer />
          </Wrap>
        );
    }
    // 방 만들기 버튼 눌러서 진입
    else if (value.isClickedCreateRoomButton) {
      return (
          <Wrap onClick={() => {this.setState({ hideHelp: true })}}>
            <Logo />
            {this.state.hideHelp ? null :
            <Help>
              <Arrow />
              <Phrase>세미나 이름은 최대 32글자입니다.</Phrase>
            </Help>}
            <WrapInput>
              <SeminarTitleForm>세미나 이름</SeminarTitleForm>
              <Input 
                onChange={setValue.handleUserSeminarName} 
                value={value.userSeminarName} 
                placeholder="세미나 이름은 무엇인가요?" 
                maxLength="32" 
              />
              <BorderBottom />
            </WrapInput>
            <ReverseTriangle onClick={setValue.handleIsClickedReverseTriangle}/>
            {value.userSeminarName ? <HelpMouse /> : null}
          </Wrap>
      );
    }
    else if (value.isClickedReverseTriangle) {
      return (
        <WhiteWrapper onClick={this.handleHelp}>
          <SpeakerFormsContainer isClickedAnywhere={this.state.isClickedAnywhere} />
          <CreateRoomButton onClick={this.createRoom}>방 만들기</CreateRoomButton>
        </WhiteWrapper>
      );
    }
    else {
      return (
          <Fragment>
            <EntryPageLogo />
            <EntryView />
          </Fragment>
      );
    }
  }
}

export const EnterConditionContainer = () => (
  <Background>
    <SampleConsumer>
      {
        ({state, actions}) => (
          <EnterCondition 
            value={state}
            setValue={actions}
          />
        )
      }
    </SampleConsumer>
  </Background>
)

const HelpMouse = styled.div`
  background-image: url(${mouse});
  background-size: cover;
  width: 24px;
  height: 40px;
  position: absolute;
  left: 49.1vw;
  bottom: 4vh;
`

const Help = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 51.78vh;
`

const Arrow = styled.div`
  background-image: url(${leftBottomArrow});
  background-size: cover;
  width: 98.9px;
  height: 49.2px;
  position: relative;
  left: 150px;
  top: 20px;
`

const Phrase = styled.span`
  width: 193px;
  height: 23px;
  font-family: NanumPen;
  font-size: 20px;
  line-height: 1.1;
  color: #f2c063;
  position: relative;
  left: 254px;
  bottom: 38px;
`

const CreateRoomButton = styled.div`
  width: 70px;
  height: 27px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  margin: 0 auto;
  position: absolute;
  left: 47.26vw;
  bottom: 3.8vh;
  text-decoration: underline;
  cursor: pointer;
`

const WhiteWrapper = styled.div`
  width: 944px;
  height: 100vh;
  box-shadow: 0 10px 90px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  margin: 0 auto;
`

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: #f2f2f2;
`

const ReverseTriangle = styled.div`
  background-image: url(${reverseTriangle});
  background-size: cover;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 49.29vw;
  bottom: 1.9vh;
  cursor: pointer;
`

const BorderBottom = styled.div`
  width: 880px;
  height: 2px;
  margin: 0 auto;
  position: relative;
  left: 32px;
  bottom: 92px;
  border-bottom: solid 2px rgba(112, 112, 112, 0.3);
`

const WrapInput = styled.div`
  position: absolute;
  top: 60.47vh;
`

const SeminarTitleForm = styled.div`
  -webkit-text-stroke: 0.5px #707070;
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 300;
  line-height: 0.92;
  color: rgba(0, 0, 0, 0.54);
  position: relative;
  left: 32px;
`

const Input = styled.textarea`
  resize: none;
  overflow: hidden;
  padding: 0;
  border: 0;
  width: 880px;
  height: 158px;
  position: relative;
  left: 32px;
  font-family: Noto Sans KR;
  font-size: 48px;
  font-weight: bold;
  line-height: 1.67;
  color: rgba(0, 0, 0, 0.87);
  border-bottom: solid 2px rgba(112, 112, 112, 0.3);

  ::placeholder {
    color: rgba(102, 102, 102, 0.1);
  }
`

const Wrap = styled.div`
  width: 944px;
  height: 100vh;
  background-color: #ffffff;
  margin: 0 auto;
  box-shadow: 0 10px 90px 0 rgba(0, 0, 0, 0.16);
`

const EntryPageLogo = styled.div`
  width: 60px;
  height: 24px;
  background-image: url(${logoImg});
  background-size: cover;
  position: absolute;
  top: 32px;
  left: 16px;

  @media screen and (min-width: 769px) {
    width: 80px;
    height: 32px;
    left: 32px;
  }
`

const Logo = styled(EntryPageLogo.withComponent('div'))`
  position: relative;
  left: 32px;
`