import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { SampleConsumer } from '../../contexts/sample';

class SpeakerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClickedDeleteButton: false,
    }
  }

  handleDeleteButton = () => {
    this.setState({ isClickedDeleteButton: true });
  }
  handleCancel = () => {
    this.setState({ isClickedDeleteButton: false });
  }
  handleDeleteFormFromContext = () => {
    const newSeminars = this.props.value.seminars.concat();
    newSeminars.splice(this.props.index.index, 1);
    this.props.setValue.handleChangeSeminar(newSeminars);
    this.handleCancel();
  }
  render() {
    const {value, setValue, index} = this.props;
    return (
      <Fragment>
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
            {this.state.isClickedDeleteButton ? 
            <PinkBox>
              <Phrase onClick={this.handleDeleteFormFromContext}>삭제</Phrase>
              <Phrase onClick={this.handleCancel}>취소</Phrase>
            </PinkBox>
            :
            <DeleteButton onClick={this.handleDeleteButton} />}
          </Row>
        </Wrap>
      </Fragment>
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

const Phrase = styled.div`
  min-width: 26px;
  height: 20px;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-weight: 600;
  line-height: 2;
  color: rgba(255, 255, 255, 0.87);
  margin-left: 4px;
  margin-right: 4px;
  text-decoration: underline;
`

const PinkBox = styled.span`
  min-width: 66px;
  height: 28px;
  border-radius: 5px;
  background-color: #f2385a;
  position: relative;
  right: 67px;
  bottom: 22px;
  display: flex;
  padding: 4px;
`

const DeleteButton = styled.span`
  min-width: 18px;
  height: 18px;
  background-color: gray;
  border-radius: 50%;
  position: relative;
  right: 20px;
  top: -20px;
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 48px;
  margin: 0;
  margin-left: 16px;
` 

const Delimiter = styled.div`
  font-family: Noto Sans KR;
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
  font-family: Noto Sans KR;
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
  font-family: Noto Sans KR;
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
  font-family: Noto Sans KR;
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
