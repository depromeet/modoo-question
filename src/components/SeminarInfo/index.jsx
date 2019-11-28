import React from 'react';
import styled from '@emotion/styled';
import urlCopyButtonImg from '../../static/images/10-20@3x.png';

const seminarFakeInfo = {
  title: "세미나 이름은 무엇일까요? 이름은무엇일까요? 세미나 이름은 무엇",
  numberOfPeople: "(83명)",
  roomNumber: "0001",
  url: "www.bit.ly/xxxxxx",
}

const SeminarInfo = () => {
  return (
    <Wrap>
      <FormSeminarHeader>세미나 이름</FormSeminarHeader>
      <UsersSeminarTitle>
        {seminarFakeInfo.title}
        <NumberOfPeople> {seminarFakeInfo.numberOfPeople}</NumberOfPeople>
      </UsersSeminarTitle>
      <Row>
        <WrapRoomNumber>
          <FormSeminarHeader>방 번호</FormSeminarHeader>
          <UsersSeminarRoomNumber>{seminarFakeInfo.roomNumber}</UsersSeminarRoomNumber>
        </WrapRoomNumber>
        <WrapUrl>
          <FormSeminarHeader>URL</FormSeminarHeader>
          <UsersSeminarUrl>{seminarFakeInfo.url}</UsersSeminarUrl>
        </WrapUrl>
        <UrlCopyButton />
      </Row>
    </Wrap>
  )
}

export default SeminarInfo;

const Wrap = styled.div`
  position: absolute;
  bottom: 66px;
  left: 16px;
  font-family: NotoSansCJKkr;

  @media screen and (min-width: 769px) {
    position: relative;
    top: 422px;
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
