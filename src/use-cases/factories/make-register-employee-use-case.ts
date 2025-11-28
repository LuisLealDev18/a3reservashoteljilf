import { PrismaEmployeeRepository } from 'src/repositories/prisma/prisma-employees-repository'
import { RegisterEmployeeUseCase } from '../register-employee'

export function makeRegisterEmployeeUseCase() {
  const prismaEmployeeRepository = new PrismaEmployeeRepository()
  const registerEmployeeUseCase = new RegisterEmployeeUseCase(
    prismaEmployeeRepository,
  )

  return registerEmployeeUseCase
}
