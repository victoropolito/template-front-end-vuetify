<template>
  <div>
    <v-btn color="blue" size="large" append prepend-icon="mdi-plus" variant="tonal" @click="openModal">
      Nova Task
    </v-btn>
    <v-dialog v-model="modalOpen" persistent max-width="600px">
      <v-card title="Adicionar Nova Tarefa">
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
                  <v-select v-model="form.category_ids" :items="categoriesItems" label="Categorias" chips clearable multiple />
                </v-col>
                <v-col cols="12">
                  <v-select v-model="form.user_id" :items="users" label="Usuário" required />
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
        user_id: '',
      },
      categoriesItems: [],
      users: ['664270c9472c3c191f2576e1', 'Usuário 2', 'Usuário 3'],
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
      this.fetchCategories()
    },
    closeModal() {
      this.modalOpen = false
      this.form.title = null
      this.form.description = null
      this.form.user_id = null
      this.form.category_ids = []
    },
    async submitForm() {
      const user_id = this.form.user_id

      try {
        await this.$store.dispatch('createCardStore', { userId: user_id, cardForm: this.form })
        this.closeModal()
        return true
      } catch (error) {
        throw error
      }
    },
    async fetchCategories() {
      try {
        await this.$store.dispatch('fetchCategoriesStore', '664270c9472c3c191f2576e1')
        let categoriesData = this.$store.state.categories
        this.categoriesItems = categoriesData.map(category => category.name)
      } catch (error) {
        console.log('Erro ao obter categorias: ', error)
      }
    },
    computed: {
      categories() {
        return this.$store.state.categories
      },
      categoryFromIdToName() {
        // const selectedCategory = this.categories
        // console.log("selected: ", selectedCategory)
        // return selectedCategory
        const selectedCategory = this.$store.state.categories.find(category => category.name === this.form.category_ids);
        return selectedCategory ? selectedCategory.color : '';
      },
    },
  }
}
</script>
