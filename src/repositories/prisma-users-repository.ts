import { prisma } from 'src/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaStudentsRepository {
  async create(data: Prisma.StudentCreateInput) {
    const student = await prisma.student.create({
      data,
    })

    return student
  }
}
