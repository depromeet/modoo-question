import React, { Component } from 'react';
import styled from '@emotion/styled';
import { SampleConsumer } from '../../contexts/sample';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 방 번호
      roomNumber : { first: '', second: '', third: '', fourth: '' },

       // 숫자가 아닌 키를 눌렀는가?
      isPressedNotNumber: { first: false, second: false, third: false, fourth: false },
    }
  }

  handleChangeInput = (event) => {
    // 클릭 초기화
    this.props.setValue.handleIsClickedConfirmButtonToFalse();

    const changedText = event.target.value;
    const isLessTwoDigits = () => {
      return event.target.value.length < 2;
    }
    if (isLessTwoDigits()) {
      switch (event.target.className.split(' ')[0]) { // event.target.className: first css-kj2lr3
        case 'first':
          this.setState(prevState => ({ roomNumber: { ...prevState.roomNumber, first: changedText } }));
          break;
        case 'second':
          this.setState(prevState => ({ roomNumber: { ...prevState.roomNumber, second: changedText } }));
          break;
        case 'third':
          this.setState(prevState => ({ roomNumber: { ...prevState.roomNumber, third: changedText } }));
          break;
        case 'fourth':
          this.setState(prevState => ({ roomNumber: { ...prevState.roomNumber, fourth: changedText } }));
          break;
        default:
          break;
        }
      }
    
    setTimeout(() => {
      this.props.setValue.handleChangeInput(this.state.roomNumber);
    }, 1);
    // 문제점: roomNumber state가 SampleProvider에서 곧바로 변경되지 않는다.
    // setState가 비동기라서 그런 것 같음.
    // setTimeout으로 임시로 설정.
    // 빨리 고쳐야 함...
  }
  
  handleMoveFocusInput = (event) => {
    this.handleChangeInput(event);

    const changedText = event.target.value;
    const isDelete = () => (changedText === '');

    switch (event.target.className.split(' ')[0]) { // event.target.className: first css-kj2lr3
      case 'first':
        if (!isDelete()) {
          this.textInput2.focus();
        }
        break;
      case 'second':
        if (isDelete()) {
          this.textInput1.focus();
        }
        else {
          this.textInput3.focus();
        }
        break;
      case 'third':
        if (isDelete()) {
          this.textInput2.focus();
        }
        else {
          this.textInput4.focus();
        }
        break;
      case 'fourth':
        if (isDelete()) {
          this.textInput3.focus();
        }
        break;
      default:
        break;
    }
  }

  filterNumber = (event) => {
    const isNumber = (event) => {
      const pressedKey = event.keyCode;
      return (pressedKey >= 48 && pressedKey <= 57) || pressedKey === 8;
    }

    // 0 ~ 9, Backspace 만 입력 허용.
    if (!isNumber(event)) {
      switch (event.target.className.split(' ')[0]) { // event.target.className: first css-kj2lr3
        case 'first':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.first,
              first: true
            }
          }));
          break;
        case 'second':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.second,
              second: true
            }
          }));
          break;
        case 'third':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.third,
              third: true
            }
          }));
          break;
        case 'fourth':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.fourth,
              fourth: true
            }
          }));
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.setState({ isPressedNotNumber: false })
      }, 150);
      event.preventDefault();
    }
  }
  
  render() {
    const { first, second, third, fourth, } = this.props.value;
    return (
        <Inputs>
          <Input 
            type="number" 
            placeholder="0" 
            className="first" 
            value={first}
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber} 
            blink={this.state.isPressedNotNumber.first} 
            ref={element => this.textInput1 = element}
          />
          <Input 
            type="number" 
            placeholder="0" 
            className="second" 
            value={second} 
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber} 
            blink={this.state.isPressedNotNumber.second} 
            ref={element => this.textInput2 = element}
          />
          <Input 
            type="number" 
            placeholder="0" 
            className="third" 
            value={third}
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber} 
            blink={this.state.isPressedNotNumber.third} 
            ref={element => this.textInput3 = element}
          />
          <Input 
            type="number" 
            placeholder="0" 
            className="fourth" 
            value={fourth} 
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber}
            blink={this.state.isPressedNotNumber.fourth} 
            ref={element => this.textInput4 = element}
          />
        </Inputs>
    );
  }
};

export const InputBoxContainer = () => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <InputBox 
          value={state.roomNumber}
          setValue={actions}
        />
      )
    }
  </SampleConsumer>
)

const Inputs = styled.div`
  width: 267px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  @media screen and (min-width: 769px) {
    width: 432px !important;
    height: 222px !important;
  }
`

const Input = styled.input`
  height: 100%;
  width: 60px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 85px;
  font-weight: 100;
  line-height: 1.48;
  color: rgba(102, 102, 102, 0.87);
  text-align: center;
  border: 0;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  border-bottom: solid 1px rgba(102, 102, 102, 0.4);
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 rgba(102, 102, 102, 0.87);
  cursor: pointer;

  ::placeholder {
  color: ${props => props.blink ? 'white' : 'transparent'};
  text-shadow: 0 0 0 rgba(153, 153, 153, 0.1);
  }

  :focus {
    border-bottom: solid 1px #367fbf;
  }

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media screen and (min-width: 769px) {
    width: 96px;
    font-size: 160px;
  }
`
