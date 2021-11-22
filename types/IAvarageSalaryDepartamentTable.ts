import { IDepartamentTable } from '~/types/IDepartamentTable'

export interface IAvarageSalaryDepartamentTable {
  department: IDepartamentTable;
  avarageSalary: number;
  countEmployees: number;
}
