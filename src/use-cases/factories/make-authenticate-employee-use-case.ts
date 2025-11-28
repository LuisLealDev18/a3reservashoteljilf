import { PrismaEmployeeRepository } from 'src/repositories/prisma/prisma-employees-repository'
import { AuthenticateEmployeeUseCase } from '../authenticate-employee'

export function makeAuthenticateEmployeeUseCase() {
  const EmployeeRepository = new PrismaEmployeeRepository()
  const authenticateEmployeeUseCase = new AuthenticateEmployeeUseCase(
    EmployeeRepository,
  )

  return authenticateEmployeeUseCase
}
