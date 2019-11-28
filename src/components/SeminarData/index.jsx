import React from 'react';
import styled from '@emotion/styled';

const SeminarData = ({ title, content, rightMargin, fontSize, numberOfPeople }) => {
  return (
    <Wrap rightMargin={rightMargin}>
      <SeminarDataTitle>{title}</SeminarDataTitle>
      <SeminarDataContent fontSize={fontSize}>{content} 
        <NumberOfPeople> {numberOfPeople}</NumberOfPeople>
      </SeminarDataContent>
    </Wrap>
  )
}

SeminarData.defaultProps = {
  numberOfPeople: ''
}

export default SeminarData;

const Wrap = styled.div`
  margin-right: ${props => props.rightMargin};
  font-family: NotoSansCJKkr;
`

const SeminarDataTitle = styled.div`
  object-fit: contain;
  font-size: 12px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.83;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.54);

  @media screen and (min-width: 769px) {
    font-size: 24px;
  }
`

const SeminarDataContent = styled.div`
  max-width: 301px;
  object-fit: contain;
  font-size: ${props => props.fontSize};
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);

  @media screen and (min-width: 769px) {
    font-size: 48px;
    max-width: 725px;
    font-weight: bold;
  }
`

const NumberOfPeople = styled(SeminarDataContent.withComponent("span"))`
  font-size: 16px;
  line-height: 1.88;
`