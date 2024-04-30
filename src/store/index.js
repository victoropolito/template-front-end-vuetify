// index.js
import { createStore } from 'vuex'
import api from '@/services/api/api.js'

export default createStore({
  state: {
    cards: [],
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards
    },
    addCard(state, card) {
      state.cards.push(card);
    },
  },
  actions: {
    async fetchCardsAction({ commit }, userId) {
      try {
        const response = await api.get(`/card/${userId}`)
        commit('setCards', response.data)
      } catch (error) {
        console.error('Error fetching cards:', error)
        throw error
      }
    },
    async createCardStore({ commit }, { userId, cardForm }) {
      try {
        const response = await api.post(`/card/${userId}`, cardForm);
        commit('addCard', response.data);
        return response.data;
      } catch (error) {
        console.error('Error creating card:', error);
        throw error;
      }
    },
  },
})
