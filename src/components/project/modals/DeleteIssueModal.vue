<template>
  <div>
    <v-card-actions>
      <v-btn icon="mdi-trash-can-outline" color="red" @click="openModal" />
    </v-card-actions>
    <v-dialog v-model="modalOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Excluir tarefa
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="deleteCard">
            <v-container>
              Deseja mesmo excluir a tarefa? Essa ação é irreversível!
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="modalOpen = false">Cancelar</v-btn>
              <v-btn type="submit" color="primary">Excluir</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      modalOpen: false,
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    async deleteCard() {
      const id = this.card.id;

      try {
        await this.$store.dispatch('deleteCardStore', id);
        this.modalOpen = false
        return true;
      } catch (error) {
        console.error('Error deleting card:', error);
        throw error;
      }
    },
  },
}
</script>