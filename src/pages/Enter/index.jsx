import React from 'react';
import { EnterConditionContainer } from '../../components/EnterCondition';
import { SampleProvider } from '../../contexts/sample';

const Enter = () => {
  return (
    <SampleProvider>
      <EnterConditionContainer />
    </SampleProvider>
  );
};

export default Enter;
