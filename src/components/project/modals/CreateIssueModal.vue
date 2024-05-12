<template>
  <div>
    <v-btn 
      color="blue"
      size="large"
      append 
      prepend-icon="mdi-plus" 
      variant="tonal"
      @click="openModal"
    >
      Nova Task
    </v-btn>

    <v-dialog 
      v-model="modalOpen" 
      persistent 
      max-width="600px"
      >
      <v-card>
        <v-card-title>
          Adicionar Nova Tarefa
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                    v-model="form.title" 
                    label="Título da Tarefa" 
                    required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea 
                    v-model="form.description" 
                    label="Descrição" 
                    required></v-textarea>
                </v-col>
                <v-col cols="12"> 
                  <create-category-modal :userId="form.user_id"/>
                  <v-select
                    v-model="form.category_ids"
                    :items="categories_Data"
                    label="Categorias"
                    chips
                    item-text="name"
                    item-value="name"
                    clearable
                    multiple 
                  />
                </v-col>
                <v-col cols="12">
                  <v-select 
                    v-model="form.user_id" 
                    :items="users" 
                    label="Usuário" 
                    required
                  />
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
        user_id: null,
        title: null,
        description: null,
        status: 'BACKLOG',
        category_ids: [],
      },
      categories_Data: [],
      users: ['9d874262-ccd7-41aa-ab38-5446fd164ba3', 'Usuário 2', 'Usuário 3'],
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
      this.form.category_ids = null
    },
    async submitForm() {
      const user_id = this.form.user_id
      console.log("Submitform: ", this.form)
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
        await this.$store.dispatch('fetchCategoriesAction', '9d874262-ccd7-41aa-ab38-5446fd164ba3');
        let categoriesData = this.$store.state.categories;
        this.categories_Data = categoriesData.map(category => category.name);
      } catch (error) {
        console.log('Erro ao obter categorias: ', error);
      }
    },
    computed: {
      categories(){
        return this.$store.state.categories
      },
      selectedCategoryColor() {
        const selectedCategory = this.$store.state.categories.find(category => category.name === this.form.category_ids);
        return selectedCategory ? selectedCategory.color : '';
      },
    },
  }
}
</script>
