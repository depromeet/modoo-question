import React from 'react';
import styled from '@emotion/styled';
<<<<<<< HEAD
import EnterCondition from '../../components/EnterCondition';

const Enter = () => {
  return (
    <Background>
      <EnterCondition />
    </Background>
  );
=======
import EntryView from '../../components/EntryView';
import SeminarInfo from '../../components/SeminarInfo';
import logoImg from '../../static/images/33-3@3x.png';
import { createSeminarRoom } from '../../remotes/api';

// 새 세미나 방 생성하는 함수 호출
  /* createNewRoom(fullUrl, title, password).then(res => {
      console.log(res);
    });
  */
async function createNewRoom(fullUrl, title, password) {
  try {
    return await createSeminarRoom(fullUrl, title, password);
  } catch {
    return null;
  }
}

class Enter extends Component {
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
 
  render() {
    const { input1, input2, input3, input4, 
            isWrongRoomNumber, isClickedConfirmButton, pressedKey } = this.state;
    const isFullInput = input1.length +
                        input2.length +
                        input3.length + 
                        input4.length === 4;
    const isCorrectRoomNumber = isFullInput && !isWrongRoomNumber && isClickedConfirmButton;
    return (
      <BackgroundColor>
        <Body isCorrectRoomNumber={isCorrectRoomNumber}>
            <Logo />
            {isCorrectRoomNumber ? 
            <SeminarInfo />
            :
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
            />
            }
        </Body>
      </BackgroundColor>
    );
  }
>>>>>>> 00f0ef2ab609a1bc2c0a56cc910dee3e1c80067c
};

export default Enter;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: #f2f2f2;
`

