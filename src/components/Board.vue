<template>
  <v-container fill-height fluid class="mb-6">
    <v-row align="start" justify="center" style="height: auto;" no-gutters>
      <v-col class="column" cols="3">
        <v-card title="Backlog" flat>
          <v-card
          v-for="card in backlogCards" :key="card.id"
          class="pa-3 ma-2"
          :title="card.title"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          hover
          >
            <v-card-text> {{ card.description }}</v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col class="column" cols="3">
        <v-card title="Em andamento" flat>
          <v-card
          v-for="card in inProgressCards" :key="card.id"
          class="pa-3 ma-2"
          :title="card.title"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          hover
          >
            <v-card-text> {{ card.description }}</v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col class="column" cols="3">
        <v-card title="Completo" flat>
          <v-card
          v-for="card in completedCards" :key="card.id"
          class="pa-3 ma-2"
          :title="card.title"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          hover
          >
            <v-card-text> {{ card.description }}</v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cards']), // mapState for mapping state of Vuex
    backlogCards() {
      return this.cards.filter(card => card.status === 'BACKLOG')
    },
    inProgressCards() {
      return this.cards.filter(card => card.status === 'IN PROGRESS')
    },
    completedCards() {
      return this.cards.filter(card => card.status === 'COMPLETED')
    }
  },
  methods: {
    async fetchCards() {
      try {
        await this.$store.dispatch('fetchCardsAction', '9d874262-ccd7-41aa-ab38-5446fd164ba3')
      } catch (error) {}
    },
  },
  created() {
    this.fetchCards()
  },
}
</script>

<style scoped>
.column {
  justify-content: flex-start;
  background-color: white; 
  border-radius: 5px; 
  padding: 10px; 
  margin: 10px; 
}
</style>
