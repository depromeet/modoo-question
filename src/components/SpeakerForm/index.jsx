import React, { Component } from 'react';
import styled from '@emotion/styled';
import { SampleConsumer } from '../../contexts/sample';

class SpeakerForm extends Component {
  render() {
    const {value, setValue, index} = this.props;
    return (
      <Wrap>
        <SeminarTitle 
          placeholder="발표 제목을 입력해주세요" 
          value={value.seminars[index.index].title}
          onChange={e => setValue.handleChangeSeminarTitle(e, index.index)}
        />
        <Row>
          <SpeakerName 
            placeholder="스피커 이름"
            value={value.seminars[index.index].speakerName}
            onChange={e => setValue.handleChangeSpeakerName(e, index.index)}
          />
          <Delimiter>|</Delimiter>
          <Division 
            placeholder="소속" 
            value={value.seminars[index.index].division}
            onChange={e => setValue.handleChangeDivision(e, index.index)}
          />
        </Row>
      </Wrap>
    );
  }
};

const SpeakerFormContainer = (index) => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <SpeakerForm
          value={state}
          setValue={actions}
          index={index}
        />
      )
    }
  </SampleConsumer>
)

export default SpeakerFormContainer;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 48px;
  margin: 0;
  padding: 4px;
  margin-left: 16px;
` 

const Delimiter = styled.div`
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.54);
  border: 0;
  padding: 0;
  margin-right: 3px;
`

const Row = styled.div`
  display: flex;
`

const SeminarTitle = styled.input`
  width: 200px;
  height: 24px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  border: 0;
  padding: 0;
`

const SpeakerName = styled.input`
  width: 68px;
  height: 20px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.54);
  border: 0;
  padding: 0;
`

const Division = styled.input`
  width: 134px;
  height: 20px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.54);
  border: 0;
  padding: 0;
`
