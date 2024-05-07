import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nodejs-nest-postgresql.cyclic.app',
  timeout: 15000,
})

export default api