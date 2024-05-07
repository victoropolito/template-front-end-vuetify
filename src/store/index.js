import { createStore } from 'vuex'
import api from '@/services/api/api.js'

export default createStore({
  state: {
    cards: [],
  },
  usersState: {
    users: []
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards
    },
    addCard(state, card) {
      state.cards.push(card)
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
    getUsers(usersState, users) {
      usersState.users = users
    },
  },
  actions: {
    async fetchUsersAction({ commit }, userId) {
      try {
        const response = await api.get(`/user/${userId}`)
        commit('getUsers', response.data)
      } catch (error) {
        console.error('Error fetching cards:', error)
        throw error
      }
    },
    async fetchCardsAction({ commit }, userId) {
      try {
        const response = await api.get(`/card/${userId}`)
        console.log(response)
        commit('setCards', response.data)
      } catch (error) {
        console.error('Error fetching cards:', error)
        throw error
      }
    },
    async createCardStore({ commit }, { userId, cardForm }) {
      try {
        const response = await api.post(`/card/${userId}`, cardForm)
        commit('addCard', response.data)
        return response.data
      } catch (error) {
        console.error('Error creating card:', error)
        throw error
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
  },
  getters: {
    getCardsState: state => {
      return state.cards
    }
  }
})
