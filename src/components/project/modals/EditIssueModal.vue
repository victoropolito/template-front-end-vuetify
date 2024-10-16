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
                  <v-select 
                    v-model="editCard.status" 
                    :items="translatedStatus" 
                    item-value="value" 
                    item-title="text" 
                    label="Novo status" 
                    required />
                </v-col>
                <v-col cols="12">
                  <create-category-modal />
                  <v-select v-model="editCard.category_ids" :items="categoriesItems" item-value="id" item-title="name" label="Categorias" chips clearable multiple />
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
import CreateCategoryModal from './CreateCategoryModal.vue'
import { mapState } from 'vuex'

export default {
  components: { CreateCategoryModal },
  props: {
    card: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      modalOpen: false,
      editCard: {
        title: '',
        description: '',
        status: '',
        category_ids: []
      },
      allStatus: ['BACKLOG', 'IN PROGRESS', 'COMPLETED'],
      categoriesItems: []
    }
  },
  computed: {
    ...mapState(['user']),
    userId() {
      return this.user.id
    },
    categories() {
      return this.$store.state.categories
    },
    translatedStatus() {
      const statusMap = {
        'BACKLOG': 'Não Iniciado',
        'IN PROGRESS': 'Em Progresso',
        'COMPLETED': 'Concluído'
      }
      return this.allStatus.map(status => ({
        text: statusMap[status] || status, 
        value: status 
      }))
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
      this.fetchCategories()
      this.editCard = { ...this.card }
    },
    closeModal() {
      this.resetForm()
      this.modalOpen = false
    },
    resetForm() {
      this.editCard = {
        title: '',
        description: '',
        status: '',
        category_ids: []
      }
    },
    async submitForm() {
      const id = this.card.id
      try {
        await this.$store.dispatch('editCard', { cardId: id, updatedCardData: { ...this.editCard, user_id: this.userId } })
        this.closeModal()
        return true
      } catch (error) {
        throw error
      }
    },
    async fetchCategories() {
      try {
        await this.$store.dispatch('fetchCategoriesStore', this.userId)
        this.categoriesItems = this.categories.map(category => ({
          id: category.id,
          name: category.name,
        }))
      } catch (error) {
        console.error('Erro ao obter categorias:', error)
      }
    },
  },
}
</script>