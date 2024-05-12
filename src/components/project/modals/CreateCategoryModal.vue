<template>
  <div>
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn 
        v-bind="activatorProps"
        color="blue"
        size="small"
        append 
        variant="flat"
        >
          Criar nova categoria<v-icon icon="mdi mdi-plus"></v-icon>
        </v-btn>
      </template>
      
      <template v-slot:default="{ isActive }">
        <v-card title="Criar nova categoria">
          <v-card-text>
            Escolha uma cor e um texto para a nova categoria
          </v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                  v-model="form.name" 
                  label="Nome da categoria" 
                  required></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-color-picker
                  v-model="form.color" 
                  class="color"
                  label="Cor da categoria">
                  </v-color-picker>
                </v-col>
              </v-row>
            </v-container>

          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text="Cancelar"
              @click="isActive.value = false"
            ></v-btn>
            <v-btn 
              @click="submitForm"
              type="submit" 
              color="primary">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: String, 
      required: true
    }
  },
  data() {
    return {
      modalOpen: false,
      user_id: this.userId,
      form: {
        name: null,
        color: null
      },
    }
  },
  methods: {
    async submitForm() {
      const user_id = '9d874262-ccd7-41aa-ab38-5446fd164ba3'
      console.log("SubmitformCategory: ", this.form)
      try {
        await this.$store.dispatch('createCategoryStore', { userId: user_id, categoryForm: this.form })
        return true
      } catch (error) {
        throw error
      }
    },
  }
}
</script>

<style>
.color-picker {
  display: flex;
  justify-items: center;
}
</style>