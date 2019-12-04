import React from 'react';
import styled from '@emotion/styled';
import EnterCondition, { EnterConditionContainer } from '../../components/EnterCondition';
import { SampleProvider } from '../../contexts/sample';

const Enter = () => {
  return (
    <SampleProvider>
      <Background>
        <EnterConditionContainer />
      </Background>
    </SampleProvider>
  );
};

export default Enter;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: #f2f2f2;
`
