export interface IPostEmployeesRequest {
  guidDepartments: Array<string> | null;
  guidSkills: Array<string> | null;
  minSalary: number | null;
  maxSalary: number | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  patronymicName: string | null;
}
