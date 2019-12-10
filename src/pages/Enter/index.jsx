import React from 'react';
import styled from '@emotion/styled';
import { createSeminarRoom } from '../../remotes/api';
import { EnterConditionContainer } from '../../components/EnterCondition';
import { SampleProvider } from '../../contexts/sample';

// 새 세미나 방 생성하는 함수 호출
// createNewRoom(fullUrl, title, password).then(res => {
//   console.log(res);
// });

async function createNewRoom(fullUrl, title, password) {
  try {
    return await createSeminarRoom(fullUrl, title, password);
  } catch {
    return null;
  }
}


const Enter = () => {
  return (
    <SampleProvider>
      <EnterConditionContainer />
    </SampleProvider>
  );
};

export default Enter;
