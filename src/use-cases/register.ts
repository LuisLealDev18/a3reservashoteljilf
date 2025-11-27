import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  cpf: string
  telephone: string
  address: string
  course: string
  password: string
  status: boolean
}

export async function registerUseCase({
  name,
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

  const password_hash = await hash(password, 6)

  await prisma.student.create({
    data: {
      name,
      email,
      cpf,
      telephone,
      address,
      course,
      password_hash,
      status,
    },
  })
}
