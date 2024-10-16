import { createStore } from 'vuex'
import api from '@/services/api/api.js'

export default createStore({
  state: {
    cards: [],
    categories: [],
    user: {},
    token: String,
  },
  mutations: {
    // Card mutations
    addCard(state, card) {
      state.cards.push(card)
    },
    setCards(state, cards) {
      state.cards = cards
    },
    updateCard(state, updatedCard) {
      const index = state.cards.findIndex((card) => card.id === updatedCard.id)
      if (index !== -1) {
        state.cards.splice(index, 1, updatedCard)
      }
    },
    deleteCard(state, cardId) {
      state.cards = state.cards.filter((card) => card.id !== cardId)
    },
    // Category mutations
    addCategory(state, category) {
      state.categories.push(category)
    },
    setCategory(state, category) {
      state.categories = category
    },
    addUser(state, user) {
      state.user.push(user)
    },
    setUser(state, user) {
      state.user = user
    },
    // User mutations
    addUserSession(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    },
    clearSession(state) {
      state.user = {}
      state.token = null
    },
  },
  actions: {
    // Cards API
    async fetchCardsAction({ commit, state }, userId) {
      try {
        if (state.cards.length === 0) {
          const response = await api.get(`/card/${userId}`)
          commit('setCards', response.data)
        }
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
        const response = await api.patch(`/card/${cardId}`, updatedCardData)
        commit('updateCard', response.data)
        return response.data
      } catch (error) {
        console.error('Error editing card:', error)
        throw error
      }
    },
    async deleteCardStore({ commit }, cardId) {
      try {
        await api.delete(`/card/${cardId}`)
        commit('deleteCard', cardId)
      } catch (error) {
        console.error('Error deleting card:', error)
        throw error
      }
    },
    // Categories API
    async fetchCategoriesStore({ commit }, userId) {
      try {
        const response = await api.get(`/category/${userId}`)
        commit('setCategory', response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
      }
    },
    async createCategoryStore({ commit }, { userId, categoryForm }) {
      try {
        const response = await api.post(`/category/${userId}`, categoryForm)
        commit('addCategory', response.data)
        return response.data
      } catch (error) {
        console.error('Error creating card:', error)
        throw error
      }
    },
    // User API
    async createUserStore({ commit }, { userForm }) {
      try {
        const response = await api.post(`/user`, userForm)
        commit('addUser', response.data)
        return response.data
      } catch (error) {
        console.error('Error creating user:', error)
        throw error
      }
    },
    async createUserSessionStore({ commit }, { userForm }) {
      try {
        const response = await api.post(`/user/session`, userForm)
        commit('setUser', response.data.user)
        commit('setToken', response.data.token)
        // Saving vuex store state into localStorage - for refreshing issues
        sessionStorage.setItem('user', JSON.stringify(response.data.user))
        sessionStorage.setItem('token', response.data.token)

        return response.data
      } catch (error) {
        console.error('Error creating session:', error)
        throw error
      }
    },
    async logoutUser({ commit }) {
      commit('clearSession')
    },
  }
})
