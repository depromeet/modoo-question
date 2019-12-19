import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import plusButton from '../../static/images/plus-button.png';
import { SampleConsumer } from '../../contexts/sample';
import SpeakerFormContainer from '../SpeakerForm';
import rightMoveButton from '../../static/images/rightMoveButton.png'
import leftBottomArrow from '../../static/images/leftBottomArrow.png';
import leftArrow from '../../static/images/leftArrow.png';
import leftTopArrow from '../../static/images/leftTopArrow.png';
import topArrow from '../../static/images/topArrow.png';

class SpeakerForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftButton: false,
      RightButton: false,
    }
  }
  moveToLeft = () => {
    this.setState({ rightButton: true });
    document.body.getElementsByClassName('css-1hf2v2b')[0].scrollLeft -= 216
    if (document.body.getElementsByClassName('css-1hf2v2b')[0].scrollLeft === 0) {
      this.setState({ leftButton: false });
    }
  }
  moveToRight = () => {
    this.setState({ leftButton: true });
    document.body.getElementsByClassName('css-1hf2v2b')[0].scrollLeft += 216
    if ((document.body.getElementsByClassName('css-1hf2v2b')[0].childElementCount - 5) * 216 === document.body.getElementsByClassName('css-1hf2v2b')[0].scrollLeft) {
      this.setState({ rightButton: false })
    }
  }
  handlePlusButton = () => {
    this.props.setValue.handleAddSeminarSpeaker();
    setTimeout(() => {
      if (document.body.getElementsByClassName('css-1hf2v2b')[0].scrollWidth > 880) {
        this.setState({ leftButton: true });
      }
    }, 10)
    setTimeout(() => {
      document.body.getElementsByClassName('css-1hf2v2b')[0].scrollLeft = 9999;
    }, 10)
  }
  render() {
    const {value, setValue} = this.props;
    return (
      <Fragment>
        <Wrapper>
          {value.seminars.map((val, idx) => 
            <SpeakerFormContainer 
            key={idx} 
            index={idx} 
            />)}
          <CreateSeminarForm>
            <PlustButton onClick={this.handlePlusButton} />
          </CreateSeminarForm>
          <EmptyBox />
        </Wrapper>
        {this.state.leftButton ? <LeftMoveButton onClick={this.moveToLeft}/> : null}
        {this.state.rightButton ? <RightMoveButton onClick={this.moveToRight}/> : null}
        {this.props.isClickedAnywhere.isClickedAnywhere ? null :
        <Fragment>
          <FirstHelp>
            <LeftArrow />
            <Help>발표를 추가할 수 있습니다.</Help>
          </FirstHelp>
          <SecondHelp>
            <LeftTopArrow />
            <Help>발표 제목은 최대 18글자 입니다. (필수)</Help>
          </SecondHelp>
          <ThirdHelp>
            <TopArrow />
            <Help>스피커 이름은 최대 7글자 입니다. (필수)</Help>
            <Help>소속은 최대 7글자 입니다. (옵션)</Help>
          </ThirdHelp>
          <FourthHelp>
            <LeftBottomArrow />
            <Help>참가자가 1명 이상 있을 경우</Help>
            <Help>방 수정하기를 할 수 없습니다.</Help>
          </FourthHelp>
        </Fragment>}
      </Fragment>
      );
  }
};

const SpeakerFormsContainer = (isClickedAnywhere) => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <SpeakerForms
          value={state}
          setValue={actions}
          isClickedAnywhere={isClickedAnywhere}
        />
      )
    }
  </SampleConsumer>
)

export default SpeakerFormsContainer;

const LeftBottomArrow = styled.div`
  background-image: url(${leftBottomArrow});
  background-size: cover;
  width: 98.9px;
  height: 49.2px;
  position: relative;
  right: 105px;
  bottom: -69px;
`

const LeftTopArrow = styled.div`
  background-image: url(${leftTopArrow});
  background-size: cover;
  width: 103.8px;
  height: 93.3px;
  position: relative;
  right: 110px;
  top: 23px;
`

const TopArrow = styled.div`
  background-image: url(${topArrow});
  background-size: cover;
  width: 63.6px;
  height: 156.5px;
  position: relative;
  right: 67px;
  top: 30px;
`

const LeftArrow = styled.div`
  background-image: url(${leftArrow});
  background-size: cover;
  width: 110.3px;
  height: 85.7px;
  position: relative;
  top: 36px;
  right: 115px;
`

const FirstHelp = styled.span`
  position: absolute;
  left: 60vw;
  top: -5vh;
`

const SecondHelp = styled.span`
  position: absolute;
  left: 38vw;
  top: 3vh;
`

const ThirdHelp = styled.span`
  position: absolute;
  left: 25vw;
  top: 6vh;
  display: flex;
  flex-direction: column;
`

const FourthHelp = styled.span`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 11vh;
  left: 59.3vw;
`

const Help = styled.span`
  font-family: NanumPen;
  font-size: 20px;
  line-height: 1.1;
  color: #f2c063;
`

const LeftMoveButton = styled.div`
  width: 28px;
  height: 28px;
  background-image: url(${rightMoveButton});
  background-size: cover;
  position: absolute;
  left: 200px;
  top: 42px;
  transform: rotate(180deg);
`

const RightMoveButton = styled.div`
  width: 28px;
  height: 28px;
  background-image: url(${rightMoveButton});
  background-size: cover;
  position: absolute;
  right: 200px;
  top: 42px;
`

const EmptyBox = styled.div`
  min-width: 8px;
  width: 8px;
  height: 28px;
`

const PlustButton = styled.div`
  width: 28px;
  height: 28px;
  background-image: url(${plusButton});
  background-size: cover;
  display: flex;
  margin: 0 auto;
  position: relative;
  top: 14px;
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  position: relative;
  left: 32px;
  width: 880px;
  overflow-x: scroll;
  top: 32px;
  height: fit-content;
  ::-webkit-scrollbar {
    display:none;
  }
`

const CreateSeminarForm = styled.div`
  min-width: 208px;
  width: 208px;
  height: 56px;
  border-radius: 5px;
  background-color: #f2f2f2;
  margin-left: 16px;
`
