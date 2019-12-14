import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { API_ROOT } from './api';

// 웹소켓 설정 정의
export const STOMP_ENDPOINT = '/q-rank-websock';
export const DESTINATION_PREFIX = '/app';
export const SIMPLE_BROKER = '/subscribe';

export let stompClient = null;

export function connectWebSockets(seminarId, callbackFunc) {
  const socket = new SockJS(`${API_ROOT}/${STOMP_ENDPOINT}`);
  stompClient = Stomp.over(socket);

  stompClient.connect({}, 
    // 연결 성공 시, topic에 구독
    () => {    
      // @SendTo("/seminar/{seminarid}")
      stompClient.subscribe(`${SIMPLE_BROKER}/seminar/${seminarId}`, (res) => {
        const data = JSON.parse(res.body);
        callbackFunc(data);
      });
    },
    // 연결 실패 시, 에러 메세지 전달
    (error) => {
      console.log("failed connecting!");
      // TODO: return error message -> isConnected 업데이트 확인 위해
    }
  );
};

/**
 *  웹소켓을 통해 서버에게 메세지 전달
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
