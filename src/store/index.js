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
  },
})
