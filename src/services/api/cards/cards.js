import api from '../api'

export const getCards = async (userId) => {
  try {
    const response = await api.get(`/card/${userId}`)
    const cardData = response.data
    return cardData
  } catch (error) {
    throw error
  }
}