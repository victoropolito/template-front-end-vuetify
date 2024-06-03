<template>
  <v-container fill-height fluid class="mb-6">
    <v-row align="start" justify="center" style="height: auto;" no-gutters>
      <v-col cols="4">
        <v-card title="Não iniciado" flat class="column">
          <template v-slot:append>
            {{ filteredCards('BACKLOG').length }}
          </template>
          <v-card v-for="card in filteredCards('BACKLOG')" :key="card.id" class="pa-3 ma-2" :title="card.title"
            append-avatar="https://cdn.vuetifyjs.com/images/john.jpg" hover>
            <div>
              <v-chip v-for="category in card.categories" 
              :key="category.name" 
              :style="{ backgroundColor: category.color }" 
              class="ma-1" 
              variant="tonal"
              density="comfortable" 
              size="small"
              >
                {{ category.name }}
              </v-chip>
            </div>
            <v-card-text><i>{{ card.description }}</i></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>
                <edit-issue-modal v-bind:card="card" />
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <delete-issue-modal v-bind:card="card" />
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card title="Em Progresso" flat class="column">
          <template v-slot:append>
            {{ filteredCards('IN PROGRESS').length }}
          </template>
          <v-card v-for="card in filteredCards('IN PROGRESS')" append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            :key="card.id" class="pa-3 ma-2" :title="card.title" hover>
            <div>
              <v-chip v-for="category in card.categories" 
              :key="category.name" 
              :style="{ backgroundColor: category.color }" 
              class="ma-1" 
              variant="tonal"
              density="comfortable" 
              size="small"
              >
                {{ category.name }}
              </v-chip>
            </div>
            <v-card-text><i>{{ card.description }}</i></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>
                <edit-issue-modal v-bind:card="card" />
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <delete-issue-modal v-bind:card="card" />
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card title="Concluído" flat class="column">
          <template v-slot:append>
            {{ filteredCards('COMPLETED').length }}
          </template>
          <v-card v-for="card in filteredCards('COMPLETED')" :key="card.id" class="pa-3 ma-2" :title="card.title"
            append-avatar="https://cdn.vuetifyjs.com/images/john.jpg" hover>
            <div>
              <v-chip v-for="category in card.categories" 
              :key="category.name" 
              :style="{ backgroundColor: category.color }" 
              class="ma-1" 
              variant="tonal"
              density="comfortable" 
              size="small"
              >
                {{ category.name }}
              </v-chip>
            </div>
            <v-card-text><i>{{ card.description }}</i></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn>
                <edit-issue-modal v-bind:card="card" />
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn>
                <delete-issue-modal v-bind:card="card" />
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import DeleteIssueModal from './project/modals/DeleteIssueModal.vue';
import EditIssueModal from './project/modals/EditIssueModal.vue'

export default {
  components: { EditIssueModal, DeleteIssueModal },
  props: {
    userId: {
      type: String,
      required: true
    },
  },
  computed: {
    cards() {
      return this.$store.state.cards
    },
  },
  mounted() {
    if(!this.cards.length){
      this.fetchCards()
    }
  },
  methods: {
    async fetchCards() {
      try {
        const user_id = this.userId
        await this.$store.dispatch('fetchCardsAction', user_id)
      } catch (error) {
        console.error('Error fetching cards:', error)
      }
    },
    filteredCards(status) {
      return this.cards.filter(card => card.status === status)
    },
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
  margin: 10px 20px 5px 10px;
  box-shadow: 0 0 1px black;
}
</style>
