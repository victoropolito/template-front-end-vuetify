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
      console.log("state.cards: ", state.cards)
    },
    getUsers(usersState, users) {
      usersState.users = users
      console.log("Mutations: saiu getUsers")
    },
    addCard(state, card) {
      state.cards.push(card)
    },
  },
  actions: {
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
    async fetchUsersAction({ commit }, userId) {
      try {
        const response = await api.get(`/user/${userId}`)
        commit('getUsers', response.data)
        console.log("Actions: retorno users", response)
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
  },
  getters: {
    getCardsState: state => {
      return state.cards
    }
  }
})
