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
          Employees
        </h2>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="firstName"
            :counter="32"
            :rules="firstNameRules"
            label="First Name"
            @change="changeFirstName"
          />

          <v-text-field
            v-model="lastName"
            :counter="32"
            :rules="lastNameRules"
            label="Last Name"
            @change="changeLastName"
          />

          <v-text-field
            v-model="patronymicName"
            :counter="32"
            :rules="patronymicNameRules"
            label="Patronymic Name"
            @change="changePatronymicName"
          />

          <v-select
            v-model="selectedDepartment"
            :items="departments"
            label="Department"
            item-value="value"
            item-text="name"
            multiple
            @change="changeDepartment"
          />

          <v-select
            v-model="selectedSkills"
            :items="skills"
            label="Skills"
            item-value="value"
            item-text="name"
            multiple
            @change="changeSkills"
          />

          <v-text-field
            v-model="minSalary"
            :rules="numberRules"
            :counter="10"
            type="number"
            label="Min salary"
            @change="changeMinSalary"
          />

          <v-text-field
            v-model="maxSalary"
            :rules="numberRules"
            :counter="10"
            type="number"
            label="Max salary"
            @change="changeMaxSalary"
          />
        </v-form>
      </div>
      <div>
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
                v-for="(employeeTable, i) in employeeTables"
                :key="i"
              >
                <td>{{ employeeTable.firstName }}</td>
                <td>{{ employeeTable.lastName }}</td>
                <td>{{ employeeTable.patronymicName }}</td>
                <td>{{ employeeTable.salary.toFixed(2) }}</td>
                <td>{{ $moment(employeeTable.createdAt).format('YYYY-MM-DD') }}</td>
                <td>
                  <v-btn
                    icon
                    :to="{ name: 'employee-guid', params: { guid: employeeTable.guid }}"
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
      </div>
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
import { IEmployeeTable } from '../../types/IEmployeeTable'
import { ISelect } from '~/types/ISelect'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'IndexEmployeesPage'
})
export default class IndexPage extends Vue {
  numberRules = [
    (v: any) => (v && v.length <= 10) || 'Salary must be less than 10 characters',
    (v: any) => /^\d+$/.test(v) || 'Must be a number'
  ]

  headers = [
    'First Name',
    'Last name',
    'Patronymic Name',
    'Salary',
    'Created',
    'Edit'
  ]

  firstNameRules = [
    (v: any) => (v.length <= 32) || 'First Name must be less than 32 characters'
  ]

  patronymicNameRules = [
    (v: any) => (v.length <= 32) || 'Patronymic Name must be less than 32 characters'
  ]

  lastNameRules = [
    (v: any) => (v.length <= 32) || 'Last Name must be less than 32 characters'
  ]

  firstName: string = ''
  middleName: string = ''
  lastName: string = ''
  patronymicName: string = ''

  currentPage = 1
  visibleCount = 32
  total = 0

  loadingDepartments: boolean = true
  loadingSkills: boolean = true

  loadingPage: boolean = true
  employeeTables: Array<IEmployeeTable> = []

  selectedDepartment: Array<string> = []
  departments: Array<ISelect> = []

  selectedSkills: Array<string> = []
  skills: Array<ISelect> = []

  minSalary: string | null = null
  maxSalary: string | null = null

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
    await this.getEmployees()
  }

  async changeFirstName (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changeLastName (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changeMiddleName (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changePatronymicName (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changeDepartment (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changeSkills (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changeMinSalary (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async changeMaxSalary (selected: string): Promise<void> {
    await this.getEmployees()
  }

  async fetch (): Promise<void> {
    await this.getDepartments()
    await this.getSkills()
    await this.getEmployees()
  }

  async getDepartments (): Promise<void> {
    const departmentTables = await EmployeesService.getDepartments(this.$axios)
    this.departments = []
    for (const i in departmentTables) {
      const department: ISelect = {
        name: departmentTables[i].title,
        value: departmentTables[i].guid
      }
      this.departments.push(department)
    }
    this.loadingDepartments = false
  }

  async getSkills (): Promise<void> {
    const skillTables = await EmployeesService.getSkills(this.$axios)
    this.skills = []
    for (const i in skillTables) {
      const skill: ISelect = {
        name: skillTables[i].title,
        value: skillTables[i].guid
      }
      this.skills.push(skill)
    }
    this.loadingSkills = false
  }

  async getEmployees (): Promise<void> {
    this.loadingPage = false
    const minSalary: number | null = this.minSalary ? +this.minSalary : null
    const maxSalary: number | null = this.maxSalary ? +this.maxSalary : null
    const data = {
      guidDepartments: this.selectedDepartment,
      guidSkills: this.selectedSkills,
      minSalary,
      maxSalary,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      patronymicName: this.patronymicName
    }
    const response = await EmployeesService.getPaginationEmployees(this.$axios, this.from, this.to, data)
    this.total = response.totalCount
    this.employeeTables = response.values
    this.loadingSkills = false
  }
}
</script>

<style scoped>

</style>
