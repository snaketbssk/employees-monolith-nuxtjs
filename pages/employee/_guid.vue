<template>
  <div>
    <div
      v-if="loadingDepartments || loadingSkills || loadingEmployee"
      class="text-center"
    >
      <v-progress-circular
        indeterminate
        color="white"
      />
    </div>
    <div
      v-if="!loadingDepartments && !loadingSkills && !loadingEmployee"
    >
      <h2>
        Edit employee
      </h2>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="firstName"
          :counter="32"
          :rules="firstNameRules"
          label="First Name"
          required
        />

        <v-text-field
          v-model="lastName"
          :counter="32"
          :rules="lastNameRules"
          label="Last Name"
          required
        />

        <v-text-field
          v-model="patronymicName"
          :counter="32"
          :rules="patronymicNameRules"
          label="Patronymic name"
          required
        />

        <v-text-field
          v-model="salary"
          :rules="numberRules"
          :counter="10"
          type="number"
          label="Salary"
          required
        />

        <v-select
          v-model="selectDepartment"
          :items="departments"
          :rules="selectRules"
          label="Department"
          item-value="value"
          item-text="name"
          required
        />

        <v-select
          v-model="selectSkills"
          :items="skills"
          label="Skills"
          item-value="value"
          item-text="name"
          multiple
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
          @click="deleteEmployee"
        >
          Delete
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { ISelect } from '~/types/ISelect'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'GuidEmployeePage'
})
export default class IndexPage extends Vue {
  loadingDepartments: boolean = true
  loadingSkills: boolean = true
  loadingEmployee: boolean = true
  valid: boolean = false
  firstName: string = ''
  middleName: string = ''
  lastName: string = ''
  patronymicName: string = ''
  phone: string = ''
  salary: number = 0
  createdAt: string = ''
  firstNameRules = [
    (v: any) => !!v || 'First Name is required',
    (v: any) => (v && v.length <= 32) || 'First Name must be less than 20 characters'
  ]

  middleNameRules = [
    (v: any) => !!v || 'Middle Name is required',
    (v: any) => (v && v.length <= 32) || 'Middle Name must be less than 20 characters'
  ]

  lastNameRules = [
    (v: any) => !!v || 'Last Name is required',
    (v: any) => (v && v.length <= 32) || 'Last Name must be less than 20 characters'
  ]

  patronymicNameRules = [
    (v: any) => !!v || 'Patronymic Name is required',
    (v: any) => (v && v.length <= 32) || 'Patronymic Name must be less than 20 characters'
  ]

  selectRules = [
    (v: any) => !!v || 'Department is required'
  ]

  numberRules = [
    (v: any) => !!v || 'Salary is required',
    (v: any) => (v && v.length <= 10) || 'Salary must be less than 10 characters',
    (v: any) => /^\d+$/.test(v) || 'Must be a number'
  ]

  selectDepartment: string = ''
  departments: Array<ISelect> = []

  selectSkills: Array<string> = []
  skills: Array<ISelect> = []

  async fetch (): Promise<void> {
    await this.getDepartments()
    await this.getSkills()
    await this.getEmployee()
  }

  async getEmployee (): Promise<void> {
    const employeeResponse = await EmployeesService.getEmployee(this.$axios, this.$route.params.guid)
    this.firstName = employeeResponse.employee.firstName ? employeeResponse.employee.firstName : ''
    this.middleName = employeeResponse.employee.middleName ? employeeResponse.employee.middleName : ''
    this.lastName = employeeResponse.employee.lastName ? employeeResponse.employee.lastName : ''
    this.patronymicName = employeeResponse.employee.patronymicName ? employeeResponse.employee.patronymicName : ''
    this.salary = employeeResponse.employee.salary
    this.createdAt = moment(employeeResponse.employee.createdAt).format('YYYY-MM-DD')
    this.selectDepartment = employeeResponse.guidDepartment
    this.selectSkills = []
    employeeResponse.employee.skills?.forEach((value) => {
      this.selectSkills.push(value.guid)
    })
    this.loadingEmployee = false
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

  async submit (): Promise<void> {
    if (!this.firstName) { return }
    if (!this.patronymicName) { return }
    if (!this.lastName) { return }
    if (this.salary <= 0) { return }
    if (this.selectDepartment === '') { return }
    const data = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      patronymicName: this.patronymicName,
      phone: this.phone,
      salary: +this.salary,
      guidDepartment: this.selectDepartment,
      guidSkills: this.selectSkills
    }
    const response = await EmployeesService.patchEmployee(this.$axios, this.$route.params.guid, data)
    if (response) {
      await this.$router.push('/employees')
    }
  }

  async deleteEmployee (): Promise<void> {
    const response = await EmployeesService.deleteEmployee(this.$axios, this.$route.params.guid)
    if (response) {
      await this.$router.push('/employees')
    }
  }
}
</script>

<style scoped>

</style>
