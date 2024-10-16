<template>
  <v-app>
    <div class="pa-12 flex-column align-center justify-space-between">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="header-logo mb-4 center-card">
          <img src="@/assets/logo.png" alt="Logo" class="logo">
        </div>

        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
        <v-text-field 
          v-model="form.name" 
          density="compact" 
          placeholder="Nome" 
          prepend-inner-icon="mdi mdi-account" 
          variant="outlined"
        />

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
        <v-text-field 
          v-model="form.email" 
          density="compact" 
          placeholder="seumail@exemplo.com"
          prepend-inner-icon="mdi-email-outline" 
          variant="outlined"
        />

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
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
        />
        
        <div class="d-flex align-center justify-center">        
          <v-avatar color="info" size="65">
            <v-icon class="camera-icon">mdi-camera</v-icon>
            <input type="file" ref="fileInput" class="file-input" @change="handleFileUpload" >
          </v-avatar>
        </div>

        <v-avatar >
          <v-file-input class="file-input" label="Escolher arquivo"></v-file-input>
        </v-avatar>

        <v-btn @click="submitForm" class="mb-2" color="blue" size="large" variant="tonal" block>
          <RouterLink to="/" class="btn btn-login">Criar</RouterLink>
        </v-btn>
        <v-card-text class="text-center">
          <RouterLink to="/" class="text-blue text-decoration-none">
            Voltar <v-icon icon="mdi-chevron-right" />
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
        name: null,
        email: null,
        password: null,
        photo: null
      },
      visible: false
    }
  },
  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('createUserStore', { userForm: this.form })
        return true
      } catch (error) {
        throw error
      }
    },
    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      console.log('Arquivo selecionado:', file);
    }
  }
}
</script>

<style>
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

.logo {
  width: 150px;
  height: 150px;
}

.header-logo {
  margin-bottom: 20px;
}

.center-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.camera-icon {
  font-size: 64px;
}
</style>