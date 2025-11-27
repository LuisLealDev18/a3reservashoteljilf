import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

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
  constructor(private studentsRepository: any) {}

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
    const userWithSameEmail = await prisma.student.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    const userWithSameUsername = await prisma.student.findUnique({
      where: {
        username,
      },
    })

    if (userWithSameUsername) {
      throw new Error('Username already exists')
    }

    const userWithSameCpf = await prisma.student.findUnique({
      where: {
        cpf,
      },
    })

    if (userWithSameCpf) {
      throw new Error('CPF already exists')
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
