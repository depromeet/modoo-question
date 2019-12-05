import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import EntryView from '../EntryView';
import SeminarInfo from '../SeminarInfo';
import logoImg from '../../static/images/33-3@3x.png';
import reverseTriangle from '../../static/images/arrow-up-b-n@3x.png';
import { SampleConsumer } from '../../contexts/sample';

class EnterCondition extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      userSeminarName: '',
    }
  }

  handleUserSeminarName = (event) => {
    this.setState({
      userSeminarName: event.target.value
    });
  }

  render() {
    const { userSeminarName } = this.state;
    const { value, setValue } = this.props;
    const isFullInput = value.roomNumber.first.length +
                        value.roomNumber.second.length +
                        value.roomNumber.third.length +
                        value.roomNumber.fourth.length === 4;
    const isWrongRoomNumber = value.isWrongRoomNumber;
    const isCorrectRoomNumber = isFullInput && !isWrongRoomNumber && this.props.value.isClickedConfirmButton;
    
    if (isCorrectRoomNumber) {
      return (
          <Wrap>
            <Logo />
            <SeminarInfo />
          </Wrap>
        );
    }
    else if (this.props.value.isClickedCreateRoomButton) {
      return (
          <Wrap>
            <Logo />
            <WrapInput>
            <SeminarTitleForm>세미나 제목</SeminarTitleForm>
            <Input 
              onChange={this.handleUserSeminarName} 
              value={userSeminarName} 
              placeholder="세미나 이름은 무엇인가요?" 
              maxLength="32" 
            />
            <BorderBottom />
            </WrapInput>
            <ReverseTriangle />
          </Wrap>
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
)

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