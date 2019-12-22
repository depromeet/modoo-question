import React, { Component } from 'react';
import styled from '@emotion/styled';
import { SampleConsumer } from '../../contexts/sample';

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 방 번호
      password : { first: '', second: '', third: '', fourth: '' },

       // 숫자가 아닌 키를 눌렀는가?
      isPressedNotNumber: { first: false, second: false, third: false, fourth: false },
    }
  }

  handleChangePassword = (event) => {
    // 클릭 초기화
    this.props.setValue.handleIsClickedConfirmButtonToFalse();
    this.props.setValue.handleInvalidPasswordToFalse();

    const changedText = event.target.value;
    const isLessTwoDigits = () => {
      return event.target.value.length < 2;
    }
    if (isLessTwoDigits()) {
      switch (event.target.className.split(' ')[0]) { // event.target.className: first css-kj2lr3
        case 'first':
          this.setState(prevState => ({ password: { ...prevState.password, first: changedText } }));
          break;
        case 'second':
          this.setState(prevState => ({ password: { ...prevState.password, second: changedText } }));
          break;
        case 'third':
          this.setState(prevState => ({ password: { ...prevState.password, third: changedText } }));
          break;
        case 'fourth':
          this.setState(prevState => ({ password: { ...prevState.password, fourth: changedText } }));
          break;
        default:
          break;
        }
      }
    
    setTimeout(() => {
      this.props.setValue.handleChangePassword(this.state.password);
    }, 1);
    // 문제점: password state가 SampleProvider에서 곧바로 변경되지 않는다.
    // setState가 비동기라서 그런 것 같음.
    // setTimeout으로 임시로 설정.
    // 빨리 고쳐야 함...
  }
  
  handleMoveFocusInput = (event) => {
    this.handleChangePassword(event);

    const changedText = event.target.value;
    const isDelete = () => (changedText === '');

    switch (event.target.className.split(' ')[0]) { // event.target.className: first css-kj2lr3
      case 'first':
        if (!isDelete()) {
          this.secondInput.focus();
        }
        break;
      case 'second':
        if (isDelete()) {
          this.firstInput.focus();
        }
        else {
          this.thirdInput.focus();
        }
        break;
      case 'third':
        if (isDelete()) {
          this.secondInput.focus();
        }
        else {
          this.fourthInput.focus();
        }
        break;
      case 'fourth':
        if (isDelete()) {
          this.thirdInput.focus();
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
            isPressedNotNumber : { ...prevState.first, first: true }
          }));
          break;
        case 'second':
          this.setState(prevState => ({
            isPressedNotNumber : { ...prevState.second, second: true }
          }));
          break;
        case 'third':
          this.setState(prevState => ({
            isPressedNotNumber : { ...prevState.third, third: true }
          }));
          break;
        case 'fourth':
          this.setState(prevState => ({
            isPressedNotNumber : { ...prevState.fourth, fourth: true }
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

  // 방번호 맨 앞에서부터 입력하도록 고정
  handleInputFocus = () => {
    const { first, second, third } = this.props.value.password;
    const isEmpty = (value) => {
      return value === '';
    }
    if (isEmpty(first)) {
      this.firstInput.focus();
    }
    else if (isEmpty(second)) {
      this.secondInput.focus();
    }
    else if (isEmpty(third)) {
      this.thirdInput.focus();
    }
  }
  
  render() {
    const { first, second, third, fourth } = this.props.value.password;
    const { isClickedAdminMode } = this.props.value;
    return (
        <Inputs isAdminMode={isClickedAdminMode}>
          <Input 
            type="password" 
            placeholder="*" 
            className="first" 
            value={first}
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber} 
            blink={this.state.isPressedNotNumber.first} 
            ref={element => this.firstInput = element}
            onClick={this.handleInputFocus}
            isAdminMode={isClickedAdminMode}
          />
          <Input 
            type="password" 
            placeholder="*" 
            className="second" 
            value={second} 
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber} 
            blink={this.state.isPressedNotNumber.second} 
            ref={element => this.secondInput = element}
            onClick={this.handleInputFocus}
            isAdminMode={isClickedAdminMode}
          />
          <Input 
            type="password" 
            placeholder="*" 
            className="third" 
            value={third}
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber} 
            blink={this.state.isPressedNotNumber.third} 
            ref={element => this.thirdInput = element}
            onClick={this.handleInputFocus}
            isAdminMode={isClickedAdminMode}
          />
          <Input 
            type="password" 
            placeholder="*" 
            className="fourth" 
            value={fourth} 
            onChange={this.handleMoveFocusInput} 
            onKeyDown={this.filterNumber}
            blink={this.state.isPressedNotNumber.fourth} 
            ref={element => this.fourthInput = element}
            onClick={this.handleInputFocus}
            isAdminMode={isClickedAdminMode}
          />
        </Inputs>
      );
  }
};

export const PasswordFormContainer = () => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <PasswordForm 
          value={state}
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
    width: ${props => props.isAdminMode ? "274px" : "432px"};
    height: ${props => props.isAdminMode ? "119px" : "222px"};
    left: ${props => props.isAdminMode ? "93px" : "0px"};
    top: ${props => props.isAdminMode ? "-50px" : "0px"};
  }
`

const Input = styled.input`
  height: 100%;
  width: 60px;
  font-family: Noto Sans KR;
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
  position: relative;
  top: 30px;
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
    width: ${props => props.isAdminMode ? "42px" : "96px"};
    font-size: ${props => props.isAdminMode ? "80px" : "160px"};
  }
`
