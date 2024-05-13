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
            <v-chip variant="outlined" class="card-category">
              Category 1
            </v-chip>
            <v-chip class="card-category">
              Category 2
            </v-chip>
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
  components: {
    EditIssueModal,
    DeleteIssueModal
  },
  props: {
    cardsProps: {
      type: Object,
    }
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
  },
  methods: {
    async fetchCards() {
      try {
        await this.$store.dispatch('fetchCardsAction', '65e792e4dded936f2b7b0c24')
      } catch (error) { }
    },
    filteredCards(status) {
      return this.cards.filter(card => card.status === status);
    },
    changeForm(formObject) {
      if (formObject.type === "change") {
        return;
      }
      this.form = formObject;
      console.log(this.form);
    },
  },
  mounted() {
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
  margin: 10px 20px 5px 10px;
  box-shadow: 0 0 1px black;
}
</style>
