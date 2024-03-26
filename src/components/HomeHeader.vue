<template>
  <a-row>
    <a-col :span="24">
      <div class="header">
        <div class="left">
          <!-- Espaço para a logo -->
          <img
            src="@/assets/logo.png"
            alt="Logo"
            class="logo"
          >
        </div>
        <div class="center">
          <!-- Input de pesquisa com ícone de lupa -->
          <a-input-search
            v-model:value="value"
            placeholder="Pesquisar..."
            style="width: 300px"
            @search="onSearch"
          />
        </div>
        <div class="right">
          <div class="user-info">
            <a-space
              :size="16"
              wrap
            >
              <a-avatar
                :size="40"
                src="https://www.antdv.com/assets/logo.1ef800a8.svg"
              >
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <template #icon>
                <UserOutlined />
              </template>
              <div class="user-details">
                <div class="user-details-name">{{ user.name }}</div>
                <div class="user-details-email">{{ user.email }}</div>
              </div>
            </a-space>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    UserOutlined,
     // Importando o ícone de lupa
  },
  data() {
    return {
      user: {
        avatar: '',
        name: "Victor Polito",
        email: "victor.polito@aluno.ufop.edu.br",
      },
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #F6F7F9;
  padding: 16px 5% 16px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-details-name {
  color: #2A2A35; /* Adicionando a cor para o título de usuário */
}

.user-details-email {
  color: #9CA3AD; /* Adicionando a cor para o email de usuário */
}

.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}
</style>
