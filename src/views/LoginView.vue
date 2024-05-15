<template>
  <v-app>
    <div class="pa-12 flex-column align-center justify-center">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="header-logo mb-4 center-card">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
        </div>

        <div>Email</div>
  
        <v-text-field
          v-model="form.email"
          density="compact"
          placeholder="seumail@exemplo.com"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="d-flex align-center justify-space-between">
          Senha
        </div>
  
        <v-text-field
          v-model="form.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Insira sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-card
          v-if="showError"
          class="mb-12"
          color="error"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            Erro ao fazer login. Verifique suas credenciais.
          </v-card-text>
        </v-card>
  
        <v-btn
          :disabled="!validForm"
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="handleLogin"
        >
          Acessar
        </v-btn>
  
        <v-card-text class="text-center">
          <RouterLink to="/create" class="text-blue text-decoration-none">
            Cadastrar agora <v-icon icon="mdi-chevron-right" />
          </RouterLink >
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      visible: false,
      showError: false,
    };
  },
  computed: {
    validForm() {
      return this.form.email && this.form.password
    },
  },
  methods: {
    async handleLogin() {
      try {
        await this.$store.dispatch('createUserSessionStore', { userForm: this.form })
        this.showError = false
        return this.$router.push('/home')
      } catch (error) {
        console.error('Error during login:', error)
        this.showError = true
      }
    },
  },
};
</script>

<style scoped>
.btn,
.blue {
  text-decoration: none;
  color: rgb(8, 73, 158);
  padding: 3px;
}

.header-logo {
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: 150px;
}

.center-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>