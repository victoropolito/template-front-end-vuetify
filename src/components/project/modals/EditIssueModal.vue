<template>
  <div>
    <v-card-actions>
      <v-btn color="medium-emphasis" icon="mdi-pencil" start @click="openModal" />
    </v-card-actions>
    <v-dialog v-model="modalOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Editar Tarefa
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="editCard.title" label="Novo título" required>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="editCard.description" label="Nova descrição" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-select v-model="editCard.status" :items="allStatus" label="Novo status" required>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-btn @click="closeModal">Cancelar</v-btn>
              <v-btn type="submit" color="primary">Salvar</v-btn>
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
      cards: [],
      editCard: {
        user_id: '664270c9472c3c191f2576e1',
        title: '',
        description: '',
        status: '',
        category_ids: []
      },
      allStatus: ['BACKLOG', 'IN PROGRESS', 'COMPLETED'],
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    closeModal() {
      this.resetForm()
      this.modalOpen = false
    },
    resetForm() {
      this.editCard.title = ''
      this.editCard.description = ''
      this.editCard.category_ids = null
      this.editCard.user_id = null
    },
    async submitForm() {
      const id = this.card.id;

      try {
        await this.$store.dispatch('editCard', { cardId: id, updatedCardData: this.editCard })
        this.closeModal()
        return true
      } catch (error) {
        throw error
      }
    },
  },
}
</script>

<style></style>