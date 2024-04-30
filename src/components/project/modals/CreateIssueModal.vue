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
                  <v-select v-model="form.category" :items="categories" label="Categoria" required></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select v-model="form.user" :items="users" label="Usuário" required></v-select>
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
  data() {
    return {
      modalOpen: false,
      form: {
        title: '',
        description: '',
        category: null,
        user: null,
      },
      categories: ['Categoria 1', 'Categoria 2', 'Categoria 3'],
      users: ['Usuário 1', 'Usuário 2', 'Usuário 3'],
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    submitForm() {
      // Aqui você pode adicionar a lógica para enviar o formulário (por exemplo, fazer uma chamada à API para criar a tarefa)
      console.log('Formulário enviado:', this.form);
      this.closeModal(); // Fechar o modal após enviar o formulário
    },
  },
};
</script>
