import { createStore } from 'vuex';
import api from '@/services/api/api.js';

export default createStore({
  state: {
    cards: [],
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards;
    },
    addCard(state, card) {
      state.cards.push(card);
    },
    updateCard(state, updatedCard) {
      const index = state.cards.findIndex((card) => card.id === updatedCard.id);
      if (index !== -1) {
        state.cards.splice(index, 1, updatedCard);
      }
    },
    deleteCard(state, cardId) {
      state.cards = state.cards.filter((card) => card.id !== cardId);
    },
  },
  actions: {
    async createCardStore({ commit }, { userId, cardForm}) {
      try {
        const response = await api.post(`/card/${userId}`, cardForm);
        commit('addCard', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating card:', error);
        throw error;
      }
    },
    async editCard({ commit }, { cardId, updatedCardData }) {
      try {
        const response = await api.patch(`/card/${cardId}`, updatedCardData);
        commit('updateCard', response.data);
        return response.data;
      } catch (error) {
        console.error('Error editing card:', error);
        throw error;
      }
    },
    async deleteCardStore({ commit }, cardId) {
      try {
        await api.delete(`/card/${cardId}`);
        commit('deleteCard', cardId);
      } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
      }
    },
    updateCardsOrder({ commit }, updatedCards) {
      try {
        // Atualize a ordem dos cards no servidor (se necessário)
        // e emita a mutação para atualizar o estado local
        commit('setCards', updatedCards);
      } catch (error) {
        console.error('Error updating cards order:', error);
        throw error;
      }
    },
  },
});
