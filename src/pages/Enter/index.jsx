import React from 'react';
import styled from '@emotion/styled';
import EnterCondition from '../../components/EnterCondition';
import { createSeminarRoom } from '../../remotes/api';

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
    <Background>
      <EnterCondition />
    </Background>
  );
};

export default Enter;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-color: #f2f2f2;
`
