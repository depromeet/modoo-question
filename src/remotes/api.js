import * as axios from 'axios';

export const API_ROOT = 'http://13.125.252.156:8081';

export async function createSeminarRoom(fullUrl, shortUrl, title, password) {
  const { data } = await axios.post(`${API_ROOT}/api/seminar`, {
    seminarRoom: {
      "fullURL": fullUrl,
      "seminarPassword": password,
      "seminarTitle": title,
      "shortURL": shortUrl,
    },
  });

  return data;
}
  
