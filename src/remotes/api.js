import * as axios from 'axios';

export const API_ROOT = 'http://13.125.252.156:8081';

export async function createSeminarRoom(seminarRoomDto, speakerList) {
  try {
    const { data } = await axios.post(`${API_ROOT}/api/seminar`, {
      seminarRoomDto: seminarRoomDto,
      speakerList: speakerList,
    });
    return data;
  } 
  catch(error) {
    console.log(error.response);
    return null;
  }
};

export async function enterSeminar(seminarId) {
  try {
    const { data } = await axios.get(`${API_ROOT}/api/seminar/enter/${seminarId}/1`);
    return data;
  }
  catch (error) {
    console.log(error.response);
    return null;
  }
};

// TODO: 제대로 정의하기
export async function enterSeminarAdmin(seminarId, userId) {
  const { data } = await axios.get(`${API_ROOT}/api/seminar/enter/${seminarId}/${userId}`);
  return data;
}

export async function getMemberBySeminarId(seminarId) {
  const { data } = await axios.get(`${API_ROOT}/api/members/${seminarId}`);
  return data;
}
