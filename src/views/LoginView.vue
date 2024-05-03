<template>
  <v-app>
    <div class="d-flex flex-column align-center justify-center">
      <div class="header-logo mb-4">
        <img src="@/assets/logo.png" alt="Logo" class="logo">
      </div>
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
  
        <v-text-field
          density="compact"
          placeholder="seumail@exemplo.com"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Esqueceu sua senha?</a>
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Insira sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Aviso: após 3 tentativas incorretas, o usuário será bloqueado!
          </v-card-text>
        </v-card>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
        >
          <RouterLink to="/" class="btn btn-login">Acessar</RouterLink>
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Cadastrar agora <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
  import { ref } from 'vue'
  
  const visible = ref(false)

  export default {
    methods: {
      async fetchCards() {
        try {
          await this.$store.dispatch('fetchCardsAction', '9d874262-ccd7-41aa-ab38-5446fd164ba3')
        } catch (error) {}
      }
    }
  }
</script>

<style scoped>
.btn,
.blue {
  text-decoration: none;
  color: rgb(8, 73, 158);
  transition: 1s;
  padding: 3px;
}

.btn-login {
  color: rgb(17, 111, 189);
}

.header-logo {
  margin-bottom: 20px;
}

.logo {
  width: 250px;
  height: 250px;
}
</style>