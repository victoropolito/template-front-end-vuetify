<template>
  <v-app id="inspire">
    <v-app-bar prominent style="display: flex; text-align: center; margin: auto">
      <!-- Logo space -->
      <template v-slot:prepend>
        <div class="header-logo">
          <a href="#">
            <img src="@/assets/logo.png" alt="Logo" class="logo">
          </a>
        </div>
        <v-divider style="margin-left: 5px" vertical></v-divider>
      </template>
      <!-- Search input -->
      <v-spacer></v-spacer>
      <v-text-field label="Pesquisar" prepend-inner-icon="mdi-magnify"
        style="margin-top: 20px; text-align: center">
      </v-text-field>
      <v-spacer></v-spacer>

      <!-- Notifications and avatar space -->
      <template v-slot:append>
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="blue" size="large">
                <span class="text-h5">{{ userInitials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="blue">
                  <span class="text-h5">{{ userInitials }}</span>
                </v-avatar>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  Editar Conta
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn variant="text" rounded>
                  <RouterLink to="/">Desconectar</RouterLink>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
        <div class="user-details">
          <b>{{ userState.name }}</b>
          <p class="text-caption mt-1">{{ userState.email }}</p>
        </div>
      </template>
    </v-app-bar>
    <!-- Main content -->
    <v-main>
      <BoardNav />
      <v-divider></v-divider>
      <Board :userId="userState.id"/>
    </v-main>
  </v-app>
</template>

<script>
import Board from '../components/Board.vue'
import BoardNav from '../components/BoardNav.vue'
import { mapState } from 'vuex'

export default {
  components: { Board, BoardNav },
  computed: {
    ...mapState(['user']),
    userState() {
      return this.user
    },
    userInitials() {
      if (this.user && this.user.name) {
        const nameParts = this.user.name.split(' ')

        const firstNameInitial = nameParts[0].charAt(0)
        const lastNameInitial = nameParts.length > 1 ? nameParts[1].charAt(0) : ''

        return firstNameInitial.toUpperCase() + (lastNameInitial.toUpperCase() ? lastNameInitial.toUpperCase() : '')
      } else {
        return '';
      }
    }
  },
  created() {
    const storedUser = sessionStorage.getItem('user')
    const storedToken = sessionStorage.getItem('token')

    if (storedUser && storedToken) {
      this.$store.commit('setUser', JSON.parse(storedUser))
      this.$store.commit('setToken', storedToken)
    }
  }
}
</script>

<style scoped>
.header-logo {
  margin: 0px 15px 0px 10px;
}

.logo {
  width: 40px;
  height: 40px;
}

.user-details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  padding: 5px;
  text-align: left;
}
</style>