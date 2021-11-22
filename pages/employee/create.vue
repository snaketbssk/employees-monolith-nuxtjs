<template>
  <div>
    <div
      v-if="loadingDepartments || loadingSkills"
      class="text-center"
    >
      <v-progress-circular
        indeterminate
        color="white"
      />
    </div>
    <div
      v-if="!loadingDepartments && !loadingSkills"
    >
      <h2>
        Create employee
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
          v-model="selectedDepartment"
          :items="departments"
          :rules="selectRules"
          label="Department"
          item-value="value"
          item-text="name"
          required
        />

        <v-select
          v-model="selectedSkills"
          :items="skills"
          label="Skills"
          item-value="value"
          item-text="name"
          multiple
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ISelect } from '~/types/ISelect'
import { EmployeesService } from '~/services/EmployeesService'

@Component({
  name: 'CreateEmployeePage'
})
export default class IndexPage extends Vue {
  loadingDepartments: boolean = true
  loadingSkills: boolean = true
  valid: boolean = false
  firstName: string = ''
  middleName: string = ''
  lastName: string = ''
  patronymicName: string = ''
  phone: string = ''
  salary: number = 0
  firstNameRules = [
    (v: any) => !!v || 'First Name is required',
    (v: any) => (v && v.length <= 32) || 'First Name must be less than 20 characters'
  ]

  patronymicNameRules = [
    (v: any) => !!v || 'Patronymic Name is required',
    (v: any) => (v && v.length <= 32) || 'Patronymic Name must be less than 20 characters'
  ]

  lastNameRules = [
    (v: any) => !!v || 'Last Name is required',
    (v: any) => (v && v.length <= 32) || 'Last Name must be less than 20 characters'
  ]

  selectRules = [
    (v: any) => !!v || 'Department is required'
  ]

  numberRules = [
    (v: any) => !!v || 'Salary is required',
    (v: any) => (v && v.length <= 10) || 'Salary must be less than 10 characters',
    (v: any) => /^\d+$/.test(v) || 'Must be a number'
  ]

  selectedDepartment: string = ''
  departments: Array<ISelect> = []

  selectedSkills: Array<string> = []
  skills: Array<ISelect> = []

  async fetch (): Promise<void> {
    await this.getDepartments()
    await this.getSkills()
  }

  async getDepartments (): Promise<void> {
    const departmanetTables = await EmployeesService.getDepartments(this.$axios)
    this.departments = []
    for (const i in departmanetTables) {
      const department: ISelect = {
        name: departmanetTables[i].title,
        value: departmanetTables[i].guid
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
    if (this.selectedDepartment === '') { return }

    const data = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      patronymicName: this.patronymicName,
      phone: this.phone,
      salary: +this.salary,
      guidDepartment: this.selectedDepartment,
      guidSkills: this.selectedSkills
    }
    const response = await EmployeesService.putEmployee(this.$axios, data)
    if (response) {
      this.clearForm()
    }
  }

  clearForm (): void {
    this.firstName = ''
    this.middleName = ''
    this.lastName = ''
    this.patronymicName = ''
    this.phone = ''
    this.salary = 0
    this.selectedDepartment = ''
    this.selectedSkills = []
  }
}
</script>

<style scoped>

</style>
