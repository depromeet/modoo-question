import React, { Component } from 'react';
import EntryBox from '../../components/EntryBox';
import styled from '@emotion/styled';
import logoImg from '../../static/images/33-3@3x.png';
import DesignerAndDevelopersImg from '../../static/images/11615@3x.png';
import EntrancePhraseImg from '../../static/images/mobile-invalid-name@3x.png';
import BigEntrancePhraseImg from '../../static/images/invalid-name@3x.png';

class Enter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      isWrongRoomNumber: true, // 방 번호가 잘못되었는가?, 임시로 true로 설정.
      isClickedConfirmButton: false, // 확인 버튼이 클릭 되었는가?
      pressedKey: '',
    }
  }

  handleClickConfirmButton = () => {
    this.setState({
      isClickedConfirmButton: true
    })
  }

  handleChangeInput = (event) => {
    // 클릭 초기화
    this.setState({
      isClickedConfirmButton: false
    })
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
 
  render() {
    const { input1, input2, input3, input4, 
            isWrongRoomNumber, isClickedConfirmButton, pressedKey } = this.state;
    const isFullInput = input1.length +
                        input2.length +
                        input3.length + 
                        input4.length === 4;
    return (
      <Body>
        <Logo />
        <EntryBox 
          input1={input1}
          input2={input2}
          input3={input3}
          input4={input4}
          handleChangeInput={this.handleChangeInput}
          pressedKey={pressedKey}

          isFullInput={isFullInput}
          isWrongRoomNumber={isWrongRoomNumber}
          isClickedConfirmButton={isClickedConfirmButton}
          handleClickConfirmButton={this.handleClickConfirmButton}
          />
        <EntrancePhrase />
        <DesignerAndDevelopers />
      </Body>
    );
  }
};

export default Enter;

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
`

const Logo = styled.div`
  width: 60px;
  height: 24px;
  background-image: url(${logoImg});
  background-size: cover;
  position: absolute;
  top: 26px;
  left: 24px;

  @media screen and (min-width: 769px) {
    width: 80px;
    height: 32px;
  }
`

const EntrancePhrase = styled.div`
  width: 184px;
  height: 141px;
  object-fit: contain;
  background-image: url(${EntrancePhraseImg});
  background-size: cover;
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: -1;
  @media screen and (min-width: 769px) {
    width: 276px;
    height: 311px;
    background-image: url(${BigEntrancePhraseImg});
    left: 32px;
    bottom: 32px;
  }
`

const DesignerAndDevelopers = styled.div`
  @media screen and (min-width: 769px) {
    width: 161px;
    height: 89px;
    background-image: url(${DesignerAndDevelopersImg});
    background-size: cover;
    position: absolute;
    bottom: 32px;
    right: 32px;
  }
`

