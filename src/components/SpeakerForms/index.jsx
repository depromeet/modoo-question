import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import plusButton from '../../static/images/plus-button.png';
import { SampleConsumer } from '../../contexts/sample';
import SpeakerFormContainer from '../SpeakerForm';
import rightMoveButton from '../../static/images/rightMoveButton.png'

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
      </Fragment>
      );
  }
};

const SpeakerFormsContainer = () => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <SpeakerForms
          value={state}
          setValue={actions}
        />
      )
    }
  </SampleConsumer>
)

export default SpeakerFormsContainer;

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
