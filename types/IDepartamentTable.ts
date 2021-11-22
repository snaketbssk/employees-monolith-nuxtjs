import { IEmployeeTable } from '~/types/IEmployeeTable'
import { ITitleTable } from '~/types/ITitleTable'

export interface IDepartamentTable extends ITitleTable {
  employees: Array<IEmployeeTable> | null;
}
