import { hash } from 'bcryptjs'
import { EmployeesRepository } from 'src/repositories/employees-repository'
import { EmployeeUsernameAlreadyExistsError } from './errors/employee-already-exists-error'

interface RegisterEmployeeUseCaseRequest {
  name: string
  code: string
  username: string
  password: string
}

export class RegisterEmployeeUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    name,
    code,
    username,
    password,
  }: RegisterEmployeeUseCaseRequest) {
    const userWithSameUsername =
      await this.employeesRepository.findByUsername(username)

    if (userWithSameUsername) {
      throw new EmployeeUsernameAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.employeesRepository.create({
      name,
      code,
      username,
      password_hash,
    })
  }
}
