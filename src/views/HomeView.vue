<template>
  <v-app id="inspire" app>
    <v-app-bar prominent style="display: flex; text-align: center;margin: auto;">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <div class="header-logo">
          <!-- Espaço para a logo --> 
          <img src="@/assets/logo.png" alt="Logo" class="logo">
        </div>
      </template>

      <v-spacer></v-spacer>
      <v-text-field 
        v-model="search" 
        label="Procurar" 
        prepend-inner-icon="mdi-magnify" 
        style="margin-top: 20px;text-align: center;"
        >
      </v-text-field>
      <v-spacer></v-spacer>
      
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      
      <template v-slot:append>
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="blue" size="large">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="blue">
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  Editar Contar
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  Desconectar
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer">
            
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>

  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const user = {
  initials: 'VP',
  fullName: 'Victor Polito',
  email: 'victor.polito@aluno.ufop.edu.br',
}
</script>

<style scoped>
.header-logo {
  margin-left: 10px;
}

.logo {
  width: 40px;
  height: 40px;
}
</style>