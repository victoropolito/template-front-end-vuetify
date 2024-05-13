<template>
  <v-container fill-height fluid class="mb-6">
    <v-row align="center" justify="space-between" style="height: auto;" no-gutters>
      <v-col cols="auto" class="brand-name">
        <v-icon class="mr-2">mdi-infinity</v-icon>
        <span class="brand-title">Projeto Chameleon</span>
      </v-col>
      <v-col cols="auto">
        <create-issue-modal v-model="dialog"></create-issue-modal>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import CreateIssueModal from './project/modals/CreateIssueModal.vue'

const dialog = ref(false)
</script>

<style scoped>
.brand-name {
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: larger;
  font-weight: bold;
}

.create-issue-btn {
  margin-left: 10px;
}
</style>