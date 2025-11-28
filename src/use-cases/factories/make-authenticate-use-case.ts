import { AuthenticateUseCase } from '../authenticate'
import { PrismaStudentsRepository } from 'src/repositories/prisma/prisma-students-repository'

export function makeAuthenticateUseCase() {
  const StudentsRepository = new PrismaStudentsRepository()
  const authenticateUseCase = new AuthenticateUseCase(StudentsRepository)

  return authenticateUseCase
}
