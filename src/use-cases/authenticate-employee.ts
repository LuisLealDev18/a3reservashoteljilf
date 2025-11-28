import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Employee } from '@prisma/client'
import { EmployeesRepository } from 'src/repositories/employees-repository'

interface AuthenticateEmployeeUseCaseRequest {
  username: string
  password: string
}

type AuthenticateEmployeeUseCaseResponse = {
  employee: Employee
}

export class AuthenticateEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateEmployeeUseCaseRequest): Promise<AuthenticateEmployeeUseCaseResponse> {
    const employee = await this.employeesRepository.findByUsername(username)

    if (!employee) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, employee.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { employee }
  }
}
