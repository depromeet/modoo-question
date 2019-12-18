import React, { Component } from 'react';
import styled from '@emotion/styled';
import plusButton from '../../static/images/plus-button.png';
import { SampleConsumer } from '../../contexts/sample';
import SpeakerFormContainer from '../SpeakerForm';

class SpeakerForms extends Component {
  render() {
    const {value, setValue} = this.props;
    return (
      <Wrapper>
        {value.seminars.map((val, idx) => 
          <SpeakerFormContainer 
            key={idx} 
            index={idx} 
          />)}
        <CreateSeminarForm>
          <PlustButton onClick={setValue.handleAddSeminarSpeaker} />
        </CreateSeminarForm>
      </Wrapper>
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
  left: 16px;
  width: 880px;
  overflow-x: scroll;
  top: 32px;
  height: fit-content;
`

const CreateSeminarForm = styled.div`
  width: 208px;
  height: 56px;
  border-radius: 5px;
  background-color: #f2f2f2;
  margin-left: 16px;
`
