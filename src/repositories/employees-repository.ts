import { Employee, Prisma } from '@prisma/client'

export interface EmployeesRepository {
  findByUsername(username: string): Promise<Employee | null>
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>
}
