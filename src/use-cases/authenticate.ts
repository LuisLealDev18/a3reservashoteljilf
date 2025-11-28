import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Student } from '@prisma/client'
import { StudentsRepository } from 'src/repositories/students-repository'

interface AuthenticateUseCaseRequest {
  username: string
  password: string
}

type AuthenticateUseCaseResponse = {
  student: Student
}

export class AuthenticateUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const student = await this.studentsRepository.findByUsername(username)

    if (!student) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, student.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { student }
  }
}
