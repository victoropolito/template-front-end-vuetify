<template>
  <v-container fill-height fluid class="mb-6">
    <v-row align="start" justify="center" style="height: auto;" no-gutters>
      <v-col style="font-size: large;">
        Projeto Chameleon
      </v-col>
      <create-issue-modal></create-issue-modal>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import CreateIssueModal from './project/modals/CreateIssueModal.vue'

const dialog = ref(false)

export default{
  components: { CreateIssueModal },

}
</script>

<style>

</style>