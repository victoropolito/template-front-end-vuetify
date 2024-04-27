import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nodejs-nest-postgresql.cyclic.app/',
  timeout: 5000,
});

export default api

// export const createCard = async (userId, title, description, status) => {
//   try {
//     const response = await api.post(`/card/${userId}`, { title, description, status });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message || 'Failed to create card');
//   }
// };

// export const deleteCard = async (cardId) => {
//   try {
//     await api.delete(`/card/${cardId}`);
//   } catch (error) {
//     throw new Error(error.response.data.message || 'Failed to delete card');
//   }
// };

// export const updateCard = async (cardId, title, description, status) => {
//   try {
//     const response = await api.patch(`/card/${cardId}`, { title, description, status });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message || 'Failed to update card');
//   }
// };

// export const getCards = async (userId, status, title, description, id) => {
//   try {
//     const response = await api.get('/card', {
//       params: { user_id: userId, status, title, description, id },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response.data.message || 'Failed to get cards');
//   }
// };
