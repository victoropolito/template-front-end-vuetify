<template>
  <div>
    <v-btn @click="openModal" color="blue" size="small" append variant="flat">
      Criar nova categoria<v-icon icon="mdi mdi-plus"></v-icon>
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
                <v-color-picker v-model="form.color" label="Cor da categoria"></v-color-picker>
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
  methods: {
    openModal() {
      this.modalOpen = true
    },
    async submitForm() {
      const user_id = '664270c9472c3c191f2576e1'

      try {
        await this.$store.dispatch('createCategoryStore', { userId: user_id, categoryForm: this.form })
        this.modalOpen = false
        return true
      } catch (error) {
        throw error
      }
    },
  },
  computed: {
    ...mapState(['user']),
    userState() {
      return this.user;
    }
  },
}
</script>