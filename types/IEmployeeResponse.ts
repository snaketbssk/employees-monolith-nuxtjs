import { IEmployeeTable } from '~/types/IEmployeeTable'

export interface IEmployeeResponse {
  employee: IEmployeeTable;
  guidDepartment: string;
}
