export interface IPutEmployeesRequest {
  firstName: string;
  middleName: string;
  lastName: string;
  patronymicName: string;
  phone: string;
  salary: number;
  guidDepartment: string;
  guidSkills: Array<string>;
}
