import { prisma } from 'src/lib/prisma'
import { Prisma, Student } from '@prisma/client'
import { StudentsRepository } from '../students-repository'

export class PrismaStudentsRepository implements StudentsRepository {
  async findByCpf(cpf: string) {
    const student = await prisma.student.findUnique({
      where: {
        cpf,
      },
    })
    return student
  }

  async findByUsername(username: string) {
    const student = await prisma.student.findUnique({
      where: {
        username,
      },
    })

    return student
  }

  async findByEmail(email: string) {
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
    })

    return student
  }

  async create(data: Prisma.StudentCreateInput) {
    const student = await prisma.student.create({
      data,
    })

    return student
  }
}
