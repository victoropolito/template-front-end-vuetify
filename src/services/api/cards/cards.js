import api from '../api';

export const getCards = async (userId) => {
  try {
    const response = await api.get(`/card/${userId}`);
    const cardData = response.data; // Assuming data is in response.data
    console.log('Cards:', cardData);
    return cardData; // Return the card data for potential asynchronous usage
  } catch (error) {
    console.error('Erro ao buscar cards:', error);
    throw error; // Re-throw for potential error handling in the component
  }
};