<template>
  <v-container fill-height fluid class="mb-6">
    <v-row align="start" justify="center" style="height: auto;" no-gutters>
      <v-col cols="3">
        <v-card title="Backlog" flat class="column">
          <v-card
          v-for="card in backlogCards" :key="card.id"
          class="pa-3 ma-2"
          :title="card.title"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          hover
          >
            <v-card-text><i>{{ card.description }}</i></v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card title="Em andamento" flat class="column" >
          <v-card
          v-for="card in inProgressCards" :key="card.id"
          class="pa-3 ma-2"
          :title="card.title"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          hover
          >
            <v-card-text>
              <i>{{ card.description }}</i>
            </v-card-text>
            <v-chip variant="outlined" class="card-category">
              Category 1 
            </v-chip>
            <v-chip class="card-category">
              Category 2
            </v-chip>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card title="Completo" flat class="column">
          <v-card
          v-for="card in completedCards" :key="card.id"
          class="pa-3 ma-2"
          :title="card.title"
          append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
          hover
          >
            <v-card-text><i>{{ card.description }}</i></v-card-text>
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
.card-category {
  margin: 0 1px 1px 0;
}

.column {
  background-color: rgba(255, 255, 255, 0.932);
  justify-content: flex-start;
  border-radius: 3px; 
  padding: 10px; 
  margin: 10px; 
  box-shadow: 0 0 1px black;
}
</style>
