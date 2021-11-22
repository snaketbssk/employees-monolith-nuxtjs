<template>
  <div>
    <div
      v-if="loadingPage"
      class="text-center"
    >
      <v-progress-circular
        indeterminate
        color="white"
      />
    </div>
    <v-form
      v-if="!loadingPage"
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

      <v-text-field
        v-model="createdAt"
        label="Created"
        disabled
      />

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="submit"
      >
        Submit
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="deleteSkill"
      >
        Delete
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'GuidSkillPage'
})
export default class IndexPage extends Vue {
  loadingPage: boolean = true
  valid: boolean = false
  title: string = ''
  createdAt: string = ''
  titleRules = [
    (v: any) => !!v || 'Title is required',
    (v: any) => (v && v.length <= 32) || 'Title must be less than 20 characters'
  ]

  async fetch (): Promise<void> {
    await this.getSkill()
  }

  async getSkill (): Promise<void> {
    const skillTable = await EmployeesService.getSkill(this.$axios, this.$route.params.guid)
    this.title = skillTable.title
    this.createdAt = moment(skillTable.createdAt).format('YYYY-MM-DD')
    this.loadingPage = false
  }

  async submit (): Promise<void> {
    if (!this.title) { return }
    const data = {
      title: this.title
    }
    const response = await EmployeesService.patchSkill(this.$axios, this.$route.params.guid, data)
    if (response) {
      await this.$router.push('/skills')
    }
  }

  async deleteSkill (): Promise<void> {
    const response = await EmployeesService.deleteSkill(this.$axios, this.$route.params.guid)
    if (response) {
      await this.$router.push('/skills')
    }
  }

  clearForm (): void {
    this.title = ''
  }
}
</script>

<style scoped>

</style>
