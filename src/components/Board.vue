<template>
  <div>
      
      <v-row>
        <v-btn @click="teste()">
          Button
        </v-btn>
        <v-col >
          <v-card class="column" id="notStartedColumn" title="Não Iniciado">
            <template #extra>
              {{ filteredCards('BACKLOG').length }}
            </template>
            <v-card v-for="card in cards" :key="card.id" :bordered="false" size="small">
              <v-card v-if="card.status === 'BACKLOG'" hoverable >
                <template #actions>
                  <EditModal v-bind:card="card"/>
                  <DeleteModal v-bind:card="card"/>
                </template>
                <v-card-meta >
                  <template #title>
                    {{ card.title }}
                  </template>
                  <template #description>
                    {{ card.description }}
                  </template>
                  <template #avatar>
                    <div class="avatar">
                      <v-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />
                    </div>
                  </template>
                </v-card-meta>
              </v-card>
            </v-card>
          </v-card>
        </v-col>
        <v-col :span="8">
          <v-card class="column" id="inProgressColumn" title="Em Progresso">
            <template #extra>
              {{ filteredCards('IN PROGRESS').length }}
            </template>
            <v-card v-for="card in cards" :key="card.id" :bordered="false" size="small">
              <v-card v-if="card.status === 'IN PROGRESS'" hoverable>
                <template #actions>
                  <EditModal v-bind:card="card" />
                  <DeleteModal v-bind:card="card"/>
                </template>
                <v-card-meta >
                  <template #title>
                    {{ card.title }}
                  </template>
                  <template #description>
                    {{ card.description }}
                  </template>
                  <template #avatar>
                    <div class="avatar">
                      <v-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />
                    </div>
                  </template>
                </v-card-meta>
              </v-card>
            </v-card>
          </v-card>
        </v-col>
        <v-col :span="8">
          <v-card class="column" id="completedColumn" title="Concluído">
            <template #extra>
              {{ filteredCards('CONCLUDED').length }}
            </template>
            <v-card v-for="card in cards" :key="card.id" :bordered="false" size="small">
              <v-card v-if="card.status === 'CONCLUDED'" hoverable>
                <template #actions>
                  <EditModal v-bind:card="card" />
                  <DeleteModal v-bind:card="card"/>
                </template>
                <v-card-meta >
                  <template #title>
                    {{ card.title }}
                  </template>
                  <template #description>
                    {{ card.description }}
                  </template>
                  <template #avatar>
                    <div class="avatar">
                      <v-avatar src="https://www.antdv.com/assets/logo.1ef800a8.svg" />
                    </div>
                  </template>
                </v-card-meta>
              </v-card>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>
</template>

<script>

export default {
  methods: {
    teste() {
      console.log('teste')
    }
  }
}
</script>

<style scoped>
.avatar {
  display: inline-block;
  margin: 0 10px;
}

.column {
  background-color: white; /* Adicionando cor de fundo branco */
  border-radius: 5px; /* Arredondando as bordas */
  padding: 10px; /* Adicionando espaço interno */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adicionando uma leve sombra */
  margin: 10px; /* Adicionando margem entre as colunas */
}

</style>
