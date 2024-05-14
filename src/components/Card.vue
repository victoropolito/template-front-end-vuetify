<template>
  <v-card append-avatar="https://cdn.vuetifyjs.com/images/john.jpg" hover>
    <v-card-text><i>{{ cards.description }}</i></v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn>
        <edit-issue-modal :card="cards" />
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn>
        <delete-issue-modal :card="cards" />
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import EditIssueModal from './project/modals/EditIssueModal.vue';
import DeleteIssueModal from './project/modals/DeleteIssueModal.vue';

export default {
  components: { EditIssueModal, DeleteIssueModal },
  props: {
    cards: {
      type: Object,
      required: true
    }
  }
}
</script>
