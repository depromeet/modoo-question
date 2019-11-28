import * as axios from 'axios';

export const API_ROOT = 'http://13.125.252.156:8081';

export async function createSeminarRoom(fullUrl, title, password) {
  const { data } = await axios.post(`${API_ROOT}/api/seminar`, {
    "fullURL": fullUrl,
    "seminarPassword": password,
    "seminarTitle": title
  });

  return data;
}
  
export async function createMember(seminarId) {
  const { data } = await axios.post(`${API_ROOT}/api/member/join`, {
    "seminarId": seminarId
  });
  return data;
}

export async function enterSeminar(seminarId, userId) {
  const { data } = await axios.get(`${API_ROOT}/api/seminar/enter/${seminarId}/${memberId}`);
  return data;
}
