<<<<<<< HEAD
import { useContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_ROOT } from './api';
import { QuestionContext, RankingContext } from '../contexts';

// Socket Configurations
export const STOMP_ENDPOINT = '/q-rank-websock';
export const DESTINATION_PREFIX = '/app';
export const SIMPLE_BROKER = '/subscribe';
export let stompClient = null;

// Contexts
export function Context() {
  const { setQuestionList } = useContext(QuestionContext);
  //const { setRankingList } = useContext(RankingContext);
}

export function connectWebSockets(seminarId) {
  const socket = new SockJS(`${API_ROOT}/${STOMP_ENDPOINT}`);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, 
    // successful connection: subscribe to topic
    () => {    
      stompClient.subscribe(`${SIMPLE_BROKER}/seminar/${seminarId}`, (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        //receiveBroadcasting(data);
    })},
    // unsuccessful connection
    (error) => {
      return error;
    }
  );
};

export function receiveBroadcasting(data) {
  console.log(data);

  /*
  // TODO: Question, Ranking Context 업데이트
  //       data에서 comment, ranking 따로 파싱 필요
  if (data.type === 'comment') {
    //setQuestionList(prev => {
      // TODO: 이전의 LIST에 새 COMMENT 붙이기
    })
  } else if (data.type === 'like' || data.type === 'unlike') {
    //setQuestionList({ })
      // prev.reduce
      // TODO: commentId 매칭하는 comment의 likeCount 변경
      //       questionList 전체를 다시 반환해야 함
  } else if (data.type === 'ranking') {
    //setRankingList(ranking);
  }
  */
};

export function postQuestion(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}`, {}, question);
};

export function updateLike(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/like`, {}, question);
};

export function updateUnlike(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/unlike`, {}, question);
};

export function deleteQuestion(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/delete`, {}, question);
};
=======
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_ROOT } from './api';

// Socket Configurations
export const STOMP_ENDPOINT = '/q-rank-websock';
export const DESTINATION_PREFIX = '/app';
export const SIMPLE_BROKER = '/subscribe';

export let stompClient = null;

export function connectWebSockets(seminarId, callbackFunc) {
  const socket = new SockJS(`${API_ROOT}/${STOMP_ENDPOINT}`);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, 
    // successful connection: subscribe to topic
    () => {    
      stompClient.subscribe(`${SIMPLE_BROKER}/seminar/${seminarId}`, (res) => {
        const data = JSON.parse(res.body);
        console.log("websocket received" + data);
        callbackFunc(data);
    })},
    // unsuccessful connection
    (error) => {
      return error;
    }
  );
};

/**
 *  Methods to send messages to server via websockets
 */
export function postQuestion(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}`, {}, question);
};
export function updateLike(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/like`, {}, question);
};
export function updateUnlike(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/unlike`, {}, question);
};
export function deleteQuestion(seminarId, question) {
  stompClient.send(`${DESTINATION_PREFIX}/comment/${seminarId}/delete`, {}, question);
};
>>>>>>> refs/remotes/origin/master
