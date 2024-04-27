<template>
  <div class="card-container">
    <v-btn @click="fetchCards()">
      Button
    </v-btn>
    <v-row justify="center" align="center">
      <v-col cols="8" class="card-column">
        <h2>Backlog</h2>
        <v-list>
          <v-list-item v-for="card in cards" :key="card.id">
            <v-list-item-content>
              {{ card.title }}
              <br>
              {{ card.description }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="8" class="card-column">
        <h2>Em Progresso</h2>
        <v-list>
          <v-list-item v-for="card in emProgressoCards" :key="card.id">
            <v-list-item-content>
              {{ card.title }}
              <br>
              {{ card.description }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="8" class="card-column">
        <h2>Concluído</h2>
        <v-list>
          <v-list-item v-for="card in concluidoCards" :key="card.id">
            <v-list-item-content>
              {{ card.title }}
              <br>
              {{ card.description }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getCards } from '@/services/api/cards/cards.js'

export default {
  mounted() {
    this.fetchCards()
  },
  computed: {
    cards() {
      var cards = this.fetchCards()
      return cards
    },
  },
  methods: {
    async fetchCards() {
      try {
        const response = await getCards('9d874262-ccd7-41aa-ab38-5446fd164ba3')
        // Use the cardData here (e.g., display in UI, etc.)
      } catch (error) {
        console.error('Error fetching cards:', error);
        // Handle errors in the component
      }
    },
    filteredCards(status) {
      return this.cards.filter(card => card.status === status);
    },
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh; /* Adjust height as needed */
}

.card-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px; /* Adjust spacing between columns */
}
</style>
