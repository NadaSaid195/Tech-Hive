import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.22:3000/';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// export const getAllItems = () => {
//   return api.get('/items');
// };

// export const loginUser = (loginData) => {
//   return api.post('/login', loginData);
// };
