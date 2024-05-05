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
                <!-- <v-col cols="12">
                  <v-select 
                    v-model="form.category_ids" 
                    :items="categories" 
                    label="Categoria" 
                    @change="updateSelectedCategory"
                    required></v-select>
                </v-col> -->
                <v-col cols="12">
                  <v-select 
                    v-model="form.user_id" 
                    :items="users" 
                    label="Usuário" 
                    required></v-select>
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
import api from '@/services/api/api'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['cards']),
  },
  data() {
    return {
      modalOpen: false,
      form: {
        user_id: this.users,
        description: '',
        title: '',
        status: 'BACKLOG',
        category_ids: ['177f5cf2-ed0a-4e10-8160-a9c7d419f0c3'],
      },
      categories: ['177f5cf2-ed0a-4e10-8160-a9c7d419f0c3', 'Categoria 2', 'Categoria 3'],
      users: ['9d874262-ccd7-41aa-ab38-5446fd164ba3', 'Usuário 2', 'Usuário 3'],
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
      this.form.title = ''
      this.form.description = ''
      this.form.category_ids = null
      this.form.user_id = null
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
    updateSelectedCategory(...selectedCategories) {
      this.form.category_ids.push(selectedCategories)
      console.log(selectedCategories)
      console.log(this.form.category_ids)
    },
  },
}
</script>
