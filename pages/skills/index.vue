<template>
  <div>
    <div
      class="text-center"
    >
      <v-progress-circular
        v-if="loadingPage"
        indeterminate
        color="white"
      />
    </div>
    <div
      v-if="!loadingPage"
    >
      <div>
        <h2>
          Skills
        </h2>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="title"
            :counter="32"
            :rules="titleRules"
            label="First Name"
            @change="changeTitle"
          />
        </v-form>
      </div>
      <v-simple-table
        dense
      >
        <template #default>
          <thead>
            <tr>
              <th
                v-for="(header, i) in headers"
                :key="i"
                class="text-left"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(skillTable, i) in skillTables"
              :key="i"
            >
              <td>{{ skillTable.title }}</td>
              <td>{{ $moment(skillTable.createdAt).format('YYYY-MM-DD') }}</td>
              <td>
                <v-btn
                  icon
                  :to="{ name: 'skill-guid', params: { guid: skillTable.guid }}"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div
        v-if="totalPages"
      >
        <div class="text-center">
          <v-pagination
            :length="totalPages"
            :value="currentPage"
            @input="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ISkillTable } from '~/types/ISkillTable'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'IndexSkillsPage'
})
export default class IndexPage extends Vue {
  loadingPage: boolean = true
  skillTables: Array<ISkillTable> = []

  headers = [
    'Title',
    'Created',
    'Edit'
  ]

  title: string = ''

  titleRules = [
    (v: any) => (v.length <= 32) || 'First Name must be less than 32 characters'
  ]

  currentPage = 1;
  visibleCount = 32;
  total = 0;

  async changeTitle (selected: string): Promise<void> {
    await this.getSkills()
  }

  get totalPages (): number {
    return Math.round(this.total / this.visibleCount)
  }

  get from (): number {
    return (this.currentPage - 1) * this.visibleCount
  }

  get to (): number {
    return this.from + this.visibleCount - 1
  }

  async onPageChange (page: number): Promise<void> {
    this.currentPage = page
    await this.getSkills()
  }

  async fetch (): Promise<void> {
    await this.getSkills()
  }

  async getSkills (): Promise<void> {
    const data = {
      title: this.title
    }
    const response = await EmployeesService.getPaginationFiltersSkills(this.$axios, this.from, this.to, data)
    this.total = response.totalCount
    this.skillTables = response.values
    this.loadingPage = false
  }

  clearForm (): void {
    // this.title = ''
  }
}
</script>

<style scoped>

</style>
