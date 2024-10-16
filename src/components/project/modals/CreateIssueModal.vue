<template>
  <div>
    <v-btn color="blue" append @click="openModal">
      Nova Task
    </v-btn>
    <v-dialog v-model="modalOpen" persistent max-width="600px">
      <v-card>
        <v-card-title>
          Adicionar Nova Tarefa
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="form.title" label="Título da Tarefa" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="form.description" label="Descrição" required></v-textarea>
                </v-col>
                <v-col cols="12">
                  <create-category-modal />
                  <v-select v-model="form.category_ids" :items="categoriesItems" item-value="id" item-title="name" label="Categorias" chips clearable multiple />
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
import { mapState } from 'vuex'
import CreateCategoryModal from './CreateCategoryModal.vue'

export default {
  components: { CreateCategoryModal },
  data() {
    return {
      modalOpen: false,
      form: {
        title: '',
        description: '',
        status: 'BACKLOG',
        category_ids: [],
      },
      categoriesItems: [],
    }
  },
  computed: {
    ...mapState(['user']),
    categories() {
      return this.$store.state.categories
    },
    userId() {
      return this.user.id
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
      this.fetchCategories()
    },
    closeModal() {
      this.modalOpen = false
      this.resetForm()
    },
    resetForm() {
      this.form = {
        title: '',
        description: '',
        status: 'BACKLOG',
        category_ids: [],
        user_id: null,
      }
    },
    async submitForm() {
      try {
        await this.$store.dispatch('createCardStore', { 
          userId: this.userId, 
          cardForm: this.form,
        })
        this.closeModal()
      } catch (error) {
        console.error('Erro ao salvar tarefa:', error)
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
