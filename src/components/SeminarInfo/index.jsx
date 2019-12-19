import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import urlCopyButtonImg from '../../static/images/10-20@3x.png';
import { SampleConsumer } from '../../contexts/sample.js';
import reverseTriangle from '../../static/images/arrow-up-b-n@3x.png';

class SeminarInfo extends Component {
  render() {
    const { userSeminarName, seminarId, shortUrl, numberOfPeople } = this.props.value;
    return (
      <Fragment>
      <Wrap>
        <FormSeminarHeader>{'세미나 이름'}</FormSeminarHeader>
        <UsersSeminarTitle>
          {userSeminarName}
          <NumberOfPeople>{` (${numberOfPeople} 명)`}</NumberOfPeople>
        </UsersSeminarTitle>
        <Row>
          <WrapRoomNumber>
            <FormSeminarHeader>{'방 번호'}</FormSeminarHeader>
            <UsersSeminarRoomNumber>{seminarId}</UsersSeminarRoomNumber>
          </WrapRoomNumber>
          <WrapUrl>
            <FormSeminarHeader>{'URL'}</FormSeminarHeader>
            <UsersSeminarUrl>{shortUrl}</UsersSeminarUrl>
          </WrapUrl>
          <UrlCopyButton onClick={()=> {navigator.clipboard.writeText(shortUrl)}}/>
        </Row>
      </Wrap>
      <Link to={`/${seminarId}`}><ReverseTriangle></ReverseTriangle></Link>
    </Fragment>
    )
  }
}

const SeminarInfoContainer = () => (
  <SampleConsumer>
    {
      ({state, actions}) => (
        <SeminarInfo
          value={state}
          setValue={actions}
        />
      )
    }
  </SampleConsumer>
)

export default SeminarInfoContainer;

const ReverseTriangle = styled.div`
  background-image: url(${reverseTriangle});
  background-size: cover;
  width: 18px;
  height: 18px;
  position: absolute;
  left: 49.29vw;
  bottom: 1.9vh;
`

const Wrap = styled.div`
  position: absolute;
  bottom: 66px;
  left: 16px;
  font-family: Noto Sans KR;

  @media screen and (min-width: 769px) {
    /* top: 60.47vh; */
    position: relative;
    top: 50.23vh;
    left: 32px;
  }  
`

const Row = styled.div`
  display: flex;
  margin-top: 44px;
`

const UrlCopyButton = styled.div`
  background-image: url(${urlCopyButtonImg});
  background-size: cover;
  width: 24px;
  height: 24px;
  position: relative;
  top: 21px;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    width: 48px;
    height: 48px;
    top: 36px;
  }
`

const FormSeminarHeader = styled.div`
  font-size: 12px;
  font-weight: 300;
  line-height: 1.83;
  color: rgba(0, 0, 0, 0.54);

  @media screen and (min-width: 769px) {
    font-size: 24px;
    line-height: 0.92;
  }
`

const UsersSeminarTitle = styled.div`
  max-width: 301px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.87);

  @media screen and (min-width: 769px) {
    font-size: 48px;
    max-width: 725px;
    font-weight: bold;
    line-height: 1.67;
  }
`

const NumberOfPeople = styled(UsersSeminarTitle.withComponent("span"))`
  font-size: 16px;
  line-height: 1.88;

  @media screen and (min-width: 769px) {
    font-size: 34px;
    font-weight: bold;
    line-height: 2.35;
  }
`

const UsersSeminarRoomNumber = styled(UsersSeminarTitle.withComponent("div"))`
  font-size: 16px;
  line-height: 1.88;

  @media screen and (min-width: 769px) {
    font-size: 34px;
    font-weight: bold;
    line-height: 2.35;
  }
`

const UsersSeminarUrl = styled(UsersSeminarRoomNumber.withComponent("div"))`
`

const WrapRoomNumber = styled.div`
  margin-right: 48px;

  @media screen and (min-width: 769px) {
    margin-right: 264px;
  }  
`

const WrapUrl = styled.div`
  margin-right: 8px;

  @media screen and (min-width: 769px) {
    margin-right: 24px;
  }  
`
