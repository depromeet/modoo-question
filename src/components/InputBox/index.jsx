import React, { Component } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressedNotNumber: { first: false, 
                            second: false, 
                            third: false, 
                            fourth: false }, // 숫자가 아닌 키를 눌렀는가?
    }
  }
  
  handleMoveFocusInput = (event) => {
    this.props.handleChangeInput(event);
    const changedText = event.target.value;
    const isDelete = () => {
      return changedText === '';
    }
    switch (event.target.className.split(' ')[0]) { // event.target.className: first-input css-kj2lr3
      case 'first-input':
        if (!isDelete()) {
          this.textInput2.focus();
        }
        break;
      case 'second-input':
        if (isDelete()) {
          this.textInput1.focus();
        }
        else {
          this.textInput3.focus();
        }
        break;
      case 'third-input':
        if (isDelete()) {
          this.textInput2.focus();
        }
        else {
          this.textInput4.focus();
        }
        break;
      case 'fourth-input':
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
      switch (event.target.className.split(' ')[0]) { // event.target.className: first-input css-kj2lr3
        case 'first-input':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.first,
              first: true
            }
          }));
          break;
        case 'second-input':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.second,
              second: true
            }
          }));
          break;
        case 'third-input':
          this.setState(prevState => ({
            isPressedNotNumber : {
              ...prevState.third,
              third: true
            }
          }));
          break;
        case 'fourth-input':
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
    const { input1, input2, input3, input4, } = this.props;
    return (
      <Inputs>
        <Input 
          type="number" 
          placeholder="0" 
          className="first-input" 
          value={input1} 
          onChange={this.handleMoveFocusInput} 
          onKeyDown={this.filterNumber} 
          blink={this.state.isPressedNotNumber.first} 
          ref={element => this.textInput1 = element}
        />
        <Input 
          type="number" 
          placeholder="0" 
          className="second-input" 
          value={input2} 
          onChange={this.handleMoveFocusInput} 
          onKeyDown={this.filterNumber} 
          blink={this.state.isPressedNotNumber.second} 
          ref={element => this.textInput2 = element}
        />
        <Input 
          type="number" 
          placeholder="0" 
          className="third-input" 
          value={input3} 
          onChange={this.handleMoveFocusInput} 
          onKeyDown={this.filterNumber} 
          blink={this.state.isPressedNotNumber.third} 
          ref={element => this.textInput3 = element}
        />
        <Input 
          type="number" 
          placeholder="0" 
          className="fourth-input" 
          value={input4} 
          onChange={this.handleMoveFocusInput} 
          onKeyDown={this.filterNumber}
          blink={this.state.isPressedNotNumber.fourth} 
          ref={element => this.textInput4 = element}
        />
      </Inputs>
    );
  }
};

InputBox.propTypes = {
  input1: PropTypes.number,
  input2: PropTypes.number,
  input3: PropTypes.number,
  input4: PropTypes.number,
  handleChangeInput: PropTypes.func.isRequired,
  pressedKey: PropTypes.number
}

export default InputBox;

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
