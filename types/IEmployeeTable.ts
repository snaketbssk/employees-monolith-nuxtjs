import { ITitleTable } from '~/types/ITitleTable'
import { ISkillTable } from '~/types/ISkillTable'

export interface IEmployeeTable extends ITitleTable {
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  patronymicName: string | null;
  salary: number;
  phone: string | null;
  skills: Array<ISkillTable> | null;
}
