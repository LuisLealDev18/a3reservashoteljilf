import { hash } from 'bcryptjs'
import { StudentsRepository } from 'src/repositories/students-repository'
import {
  StudentCpfAlreadyExistsError,
  StudentEmailAlreadyExistsError,
  StudentUsernameAlreadyExistsError,
} from './errors/student-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  username: string
  email: string
  cpf: string
  telephone: string
  address: string
  course: string
  password: string
  status: boolean
}

export class RegisterUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    name,
    username,
    email,
    cpf,
    telephone,
    address,
    course,
    password,
    status,
  }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.studentsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new StudentEmailAlreadyExistsError()
    }

    const userWithSameUsername =
      await this.studentsRepository.findByUsername(username)

    if (userWithSameUsername) {
      throw new StudentUsernameAlreadyExistsError()
    }

    const userWithSameCpf = await this.studentsRepository.findByCpf(cpf)

    if (userWithSameCpf) {
      throw new StudentCpfAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.studentsRepository.create({
      name,
      username,
      email,
      cpf,
      telephone,
      address,
      course,
      password_hash,
      status,
    })
  }
}
