import { TOKENACCOUNT } from './Constants';

const API_URL = 'http://192.168.249.7:3331/api';
// const API_URL = 'http://117.2.6.94:3331/api';
// const API_URL = "http://localhost:3331/api";

export const callApi = (url, data) => {
  const apiUrl = API_URL + url;

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      if (!response.ok) {
        throw Error(response.status);
      }
    })
    .catch((error) => {
      const dataStr = JSON.stringify({ data }).replace(/[\u{0080}-\u{FFFF}]/gu, '');
      alert(JSON.stringify({ error: error.message, url: apiUrl, data: dataStr }));

      throw error;
    });
}

export const getAccessInfo = () => {

  const strAccessInfo = localStorage.getItem(TOKENACCOUNT);

  try {
    return JSON.parse(strAccessInfo);
  } catch (error) {
    return null;
  }
}