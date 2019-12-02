import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import EntryView from '../EntryView';
import SeminarInfo from '../SeminarInfo';
import logoImg from '../../static/images/33-3@3x.png';
import reverseTriangle from '../../static/images/arrow-up-b-n@3x.png';
import Store from '../../store';

class EnterCondition extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      isWrongRoomNumber: false, // 방 번호가 잘못되었는가?
      isClickedConfirmButton: false, // 확인 버튼이 클릭 되었는가?
      pressedKey: '',
      isClickedCreateRoomButton: false, // 방 만들기 버튼을 눌렀는가?
      userSeminarName: '',
    }
  }

  handleClickConfirmButton = () => {
    this.setState({
      isClickedConfirmButton: true
    })
  }

  handleClickCreateRoomButton = () => {
    this.setState({
      isClickedCreateRoomButton: true
    })
  }

  handleChangeInput = (event) => {
    // 클릭 초기화
    this.setState({
      isClickedConfirmButton: false
    });
    const changedText = event.target.value;
    const isLessTwoDigits = () => {
      return event.target.value.length < 2;
    }
    if (isLessTwoDigits()) {
      switch (event.target.className.split(' ')[0]) { // event.target.className: first-input css-kj2lr3
        case 'first-input':
          this.setState({ input1: changedText });
          break;
        case 'second-input':
          this.setState({ input2: changedText });
          break;
        case 'third-input':
          this.setState({ input3: changedText });
          break;
        case 'fourth-input':
          this.setState({ input4: changedText });
          break;
        default:
          break;
      }
    }
  }

  handleUserSeminarName = (event) => {
    this.setState({
      userSeminarName: event.target.value
    });
  }

  render() {
    const { input1, input2, input3, input4, 
            isWrongRoomNumber, isClickedConfirmButton, pressedKey, isClickedCreateRoomButton, userSeminarName } = this.state;
    const isFullInput = input1.length +
                      input2.length +
                      input3.length + 
                      input4.length === 4;
    const isCorrectRoomNumber = isFullInput && !isWrongRoomNumber && isClickedConfirmButton;
    if (isCorrectRoomNumber) {
      return (
          <Store.Provider value={input1}>
            <Wrap>
              <Logo />
              <SeminarInfo />
            </Wrap>
          </Store.Provider>
        );
    }
    else if (isClickedCreateRoomButton) {
      return (
          <Store.Provider>
            <Wrap>
              <Logo />
              <WrapInput>
              <SeminarTitleForm>세미나 제목</SeminarTitleForm>
              <Input value={userSeminarName} onChange={this.handleUserSeminarName} rows="2" placeholder="세미나 이름은 무엇인가요?" maxLength="24" />
                <BorderBottom />
              </WrapInput>
              <ReverseTriangle />
            </Wrap>
          </Store.Provider>
      );
    }
    else {
      return (
          <Store.Provider>
            <Fragment>
              <EntryPageLogo />
              <EntryView
                input1={input1}
                input2={input2}
                input3={input3}
                input4={input4}
                handleChangeInput={this.handleChangeInput}
                pressedKey={pressedKey}
                isWrongRoomNumber={isWrongRoomNumber}
                isClickedConfirmButton={isClickedConfirmButton}
                handleClickConfirmButton={this.handleClickConfirmButton}
                isClickedCreateRoomButton={isClickedCreateRoomButton}
                handleClickCreateRoomButton={this.handleClickCreateRoomButton}
              />
            </Fragment>
          </Store.Provider>
      );
    }
  }
}

export default EnterCondition;

const ReverseTriangle = styled.div`
  background-image: url(${reverseTriangle});
  background-size: cover;
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: 16px;
  left: 631px;
`

const BorderBottom = styled.div`
  width: 880px;
  height: 2px;
  margin: 0 auto;
  position: relative;
  bottom: 92px;
  border-bottom: solid 2px rgba(112, 112, 112, 0.3);
`

const WrapInput = styled.div`
  position: relative;
  top: 492px;
`

const SeminarTitleForm = styled.div`
  -webkit-text-stroke: 0.5px #707070;
  font-family: NotoSansCJKkr;
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
  font-family: NotoSansCJKkr;
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