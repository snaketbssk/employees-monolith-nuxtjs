import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IDepartamentTable } from '~/types/IDepartamentTable'
import { ISkillTable } from '~/types/ISkillTable'
import { IPutDepartmentRequest } from '~/types/IPutDepartmentRequest'
import { IPutSkillRequest } from '~/types/IPutSkillRequest'
import { IPaginationResponse } from '~/types/IPaginationResponse'
import { IAvarageSalaryDepartamentTable } from '~/types/IAvarageSalaryDepartamentTable'
import { IPutEmployeesRequest } from '~/types/IPutEmployeesRequest'
import { IEmployeeTable } from '~/types/IEmployeeTable'
import { IEmployeeResponse } from '~/types/IEmployeeResponse'
import { IPostEmployeesRequest } from '~/types/IPostEmployeesRequest'
import { IPostSkillsRequest } from '~/types/IPostSkillsRequest'
import { IPostDepartmentRequest } from '~/types/IPostDepartmentRequest'

export class EmployeesService {
  static baseUrl: string = 'http://localhost:5000'

  static config = {
    headers: {
      'X-Token': '7893d448-7fc5-4fdf-b2f0-7d68a3d190d7'
    }
  }

  static departmentApi: string = '/api/Department/'
  static departmentsApi: string = '/api/Departments'
  static avarageSalaryDepartmentsApi: string = '/api/Departments/avarage-salary/'
  static skillApi: string = '/api/Skill/'
  static skillsApi: string = '/api/Skills'
  static paginationSkillsApi: string = '/api/Skills/'
  static employeeApi: string = '/api/Employee/'
  static employeesApi: string = '/api/Employees'
  static paginationEmployeesApi: string = '/api/Employees/'

  public static getUrl (api: string): string {
    return EmployeesService.baseUrl + api
  }

  public static getGuidUrl (api: string, guid: string): string {
    return EmployeesService.baseUrl + api + guid
  }

  public static getPaginationUrl (api: string, from: number, to: number): string {
    return EmployeesService.baseUrl + api + from + '/' + to
  }

  public static async putDepartment (axios: NuxtAxiosInstance, request: IPutDepartmentRequest): Promise<boolean> {
    const response = await axios.put(EmployeesService.getUrl(EmployeesService.departmentApi), request, EmployeesService.config)
    return response.status === 200
  }

  public static async patchDepartment (axios: NuxtAxiosInstance, guid: string, request: IPutDepartmentRequest): Promise<boolean> {
    const response = await axios.patch(EmployeesService.getGuidUrl(EmployeesService.departmentApi, guid), request, EmployeesService.config)
    return response.status === 200
  }

  public static async getDepartment (axios: NuxtAxiosInstance, guid: string): Promise<IDepartamentTable> {
    const { data } = await axios.get(EmployeesService.getGuidUrl(EmployeesService.departmentApi, guid), EmployeesService.config)
    return data as IDepartamentTable
  }

  public static async deleteDepartment (axios: NuxtAxiosInstance, guid: string): Promise<boolean> {
    const response = await axios.delete(EmployeesService.getGuidUrl(EmployeesService.departmentApi, guid), EmployeesService.config)
    return response.status === 200
  }

  public static async getDepartments (axios: NuxtAxiosInstance): Promise<IDepartamentTable[]> {
    const { data } = await axios.get(EmployeesService.getUrl(EmployeesService.departmentsApi), EmployeesService.config)
    return data as IDepartamentTable[]
  }

  public static async getAvarageSalaryDepartments (axios: NuxtAxiosInstance, from: number, to: number): Promise<IPaginationResponse<IAvarageSalaryDepartamentTable>> {
    const { data } = await axios.get(EmployeesService.getPaginationUrl(EmployeesService.avarageSalaryDepartmentsApi, from, to), EmployeesService.config)
    return {
      totalCount: data.totalCount,
      values: data.values
    }
  }

  public static async getAvarageSalaryFiltersDepartments (axios: NuxtAxiosInstance, from: number, to: number, request: IPostDepartmentRequest): Promise<IPaginationResponse<IAvarageSalaryDepartamentTable>> {
    const { data } = await axios.post(EmployeesService.getPaginationUrl(EmployeesService.avarageSalaryDepartmentsApi, from, to), request, EmployeesService.config)
    return {
      totalCount: data.totalCount,
      values: data.values
    }
  }

  public static async putSkill (axios: NuxtAxiosInstance, request: IPutSkillRequest): Promise<boolean> {
    const response = await axios.put(EmployeesService.getUrl(EmployeesService.skillApi), request, EmployeesService.config)
    return response.status === 200
  }

  public static async patchSkill (axios: NuxtAxiosInstance, guid: string, request: IPutSkillRequest): Promise<boolean> {
    const response = await axios.patch(EmployeesService.getGuidUrl(EmployeesService.skillApi, guid), request, EmployeesService.config)
    return response.status === 200
  }

  public static async getSkill (axios: NuxtAxiosInstance, guid: string): Promise<ISkillTable> {
    const { data } = await axios.get(EmployeesService.getGuidUrl(EmployeesService.skillApi, guid), EmployeesService.config)
    return data as ISkillTable
  }

  public static async deleteSkill (axios: NuxtAxiosInstance, guid: string): Promise<boolean> {
    const response = await axios.delete(EmployeesService.getGuidUrl(EmployeesService.skillApi, guid), EmployeesService.config)
    return response.status === 200
  }

  public static async getSkills (axios: NuxtAxiosInstance): Promise<ISkillTable[]> {
    const { data } = await axios.get(EmployeesService.getUrl(EmployeesService.skillsApi), EmployeesService.config)
    return data as ISkillTable[]
  }

  public static async getPaginationSkills (axios: NuxtAxiosInstance, from: number, to: number): Promise<IPaginationResponse<ISkillTable>> {
    const { data } = await axios.get(EmployeesService.getPaginationUrl(EmployeesService.paginationSkillsApi, from, to), EmployeesService.config)
    return {
      totalCount: data.totalCount,
      values: data.values
    }
  }

  public static async getPaginationFiltersSkills (axios: NuxtAxiosInstance, from: number, to: number, request: IPostSkillsRequest): Promise<IPaginationResponse<ISkillTable>> {
    const { data } = await axios.post(EmployeesService.getPaginationUrl(EmployeesService.paginationSkillsApi, from, to), request, EmployeesService.config)
    return {
      totalCount: data.totalCount,
      values: data.values
    }
  }

  public static async putEmployee (axios: NuxtAxiosInstance, request: IPutEmployeesRequest): Promise<boolean> {
    const response = await axios.put(EmployeesService.getUrl(EmployeesService.employeeApi), request, EmployeesService.config)
    return response.status === 200
  }

  public static async patchEmployee (axios: NuxtAxiosInstance, guid: string, request: IPutEmployeesRequest): Promise<boolean> {
    const response = await axios.patch(EmployeesService.getGuidUrl(EmployeesService.employeeApi, guid), request, EmployeesService.config)
    return response.status === 200
  }

  public static async getEmployee (axios: NuxtAxiosInstance, guid: string): Promise<IEmployeeResponse> {
    const { data } = await axios.get(EmployeesService.getGuidUrl(EmployeesService.employeeApi, guid), EmployeesService.config)
    return data as IEmployeeResponse
  }

  public static async getPaginationEmployees (axios: NuxtAxiosInstance, from: number, to: number, request: IPostEmployeesRequest): Promise<IPaginationResponse<IEmployeeTable>> {
    const { data } = await axios.post(EmployeesService.getPaginationUrl(EmployeesService.paginationEmployeesApi, from, to), request, EmployeesService.config)
    return {
      totalCount: data.totalCount,
      values: data.values
    }
  }

  public static async deleteEmployee (axios: NuxtAxiosInstance, guid: string): Promise<boolean> {
    const response = await axios.delete(EmployeesService.getGuidUrl(EmployeesService.employeeApi, guid), EmployeesService.config)
    return response.status === 200
  }
}
