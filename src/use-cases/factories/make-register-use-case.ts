import { PrismaStudentsRepository } from 'src/repositories/prisma/prisma-students-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaStudentsRepository = new PrismaStudentsRepository()
  const registerUseCase = new RegisterUseCase(prismaStudentsRepository)

  return registerUseCase
}
