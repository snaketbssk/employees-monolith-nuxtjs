<template>
  <div>
    <h2>
      Create skill
    </h2>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        :counter="32"
        :rules="titleRules"
        label="Title"
        required
      />

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submit"
      >
        Submit
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'CreateSkillPage'
})
export default class IndexPage extends Vue {
  valid: boolean = false
  title: string = ''
  titleRules = [
    (v: any) => !!v || 'Title is required',
    (v: any) => (v && v.length <= 32) || 'Title must be less than 20 characters'
  ]

  async submit (): Promise<void> {
    if (!this.title) { return }
    const data = {
      title: this.title
    }
    const response = await EmployeesService.putSkill(this.$axios, data)
    if (response) {
      this.title = ''
    }
  }
}
</script>

<style scoped>

</style>
