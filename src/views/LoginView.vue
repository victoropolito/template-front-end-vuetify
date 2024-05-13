<template>
  <v-app>
    <div class="d-flex pa-12 flex-column align-center justify-center">
      <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
      >
        <div class="header-logo mb-4 center-card">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
        </div>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
  
        <v-text-field
          v-model="form.userEmail"
          density="compact"
          placeholder="seumail@exemplo.com"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>
  
        <v-text-field
          v-model="form.userPassword"
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
            <b>Aviso</b>: após <b>3 tentativas incorretas</b>, o usuário será bloqueado!
          </v-card-text>
        </v-card>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
        >
          <RouterLink to="/home" class="btn btn-login">Acessar</RouterLink>
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
import { ref } from 'vue'
import { mapState } from 'vuex'

const visible = ref(false)

export default {
  data() {
    return {
      form: {
        userEmail: null,
        userPassword: null,
      }
    }
  },
  methods: {
    async fetchUsers() {
      try {
      await this.$store.dispatch('fetchUsersAction', '5bcf6f87-5df4-4748-9ccd-fa0ded177420')
      } catch (error) {

      }
    },
    async checkUserCredentials() {
      console.log('clicou')
    },
  },
  computed: {
    ...mapState(['users']),
    createdUser(){
      return this.users.filter(user => user.email === 'testelogin@example.com')
    },
  }
}
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