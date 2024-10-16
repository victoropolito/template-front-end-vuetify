<template>
  <div>
    <v-btn @click="openModal" color="blue" size="small" append variant="flat">
      <v-icon icon="mdi mdi-plus" />Criar nova categoria
    </v-btn>

    <v-dialog v-model="modalOpen" max-width="500">
      <v-card title="Criar nova categoria">
        <v-card-text>
          Escolha um texto e uma cor para a nova categoria
        </v-card-text>
        <v-form @submit.prevent="submitForm">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="form.name" label="Nome da categoria" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-color-picker
                label="Cor da categoria"
                v-model="form.color"
                class="ma-2"
                ></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Cancelar" @click="modalOpen = false"></v-btn>
          <v-btn @click="submitForm" type="submit" color="primary">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      modalOpen: false,
      form: {
        name: null,
        color: null
      },
    }
  },
  computed: {
    ...mapState(['user']),
    userId() {
      return this.user.id
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true
    },
    async submitForm() {    
      try {
        await this.$store.dispatch('createCategoryStore', { userId: this.userId, categoryForm: this.form })
        this.modalOpen = false
        this.$emit('category-created')
      } catch (error) {
        throw error
      }
    },
  },

}
</script>