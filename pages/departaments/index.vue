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
          Departments
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
              v-for="(avarageSalaryDepartamentTable, i) in avarageSalaryDepartamentTables"
              :key="i"
            >
              <td>{{ avarageSalaryDepartamentTable.department.title }}</td>
              <td>{{ avarageSalaryDepartamentTable.avarageSalary.toFixed(2) }}</td>
              <td>{{ avarageSalaryDepartamentTable.countEmployees }}</td>
              <td>{{ $moment(avarageSalaryDepartamentTable.department.createdAt).format('YYYY-MM-DD') }}</td>
              <td>
                <v-btn
                  icon
                  :to="{ name: 'departament-guid', params: { guid: avarageSalaryDepartamentTable.department.guid }}"
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
import { IAvarageSalaryDepartamentTable } from '~/types/IAvarageSalaryDepartamentTable'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'IndexDepartmentsPage'
})
export default class IndexPage extends Vue {
  loadingPage: boolean = true
  avarageSalaryDepartamentTables: Array<IAvarageSalaryDepartamentTable> = []

  headers = [
    'Title',
    'Avarage salary',
    'Count employees',
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

  get totalPages (): number {
    return Math.round(this.total / this.visibleCount)
  }

  get from (): number {
    return (this.currentPage - 1) * this.visibleCount
  }

  get to (): number {
    return this.from + this.visibleCount - 1
  }

  async changeTitle (selected: string): Promise<void> {
    await this.getDepartments()
  }

  async onPageChange (page: number): Promise<void> {
    this.currentPage = page
    await this.getDepartments()
  }

  async fetch (): Promise<void> {
    await this.getDepartments()
  }

  async getDepartments (): Promise<void> {
    const data = {
      title: this.title
    }
    const response = await EmployeesService.getAvarageSalaryFiltersDepartments(this.$axios, this.from, this.to, data)
    this.total = response.totalCount
    this.avarageSalaryDepartamentTables = response.values
    this.loadingPage = false
  }
}
</script>

<style scoped>

</style>
