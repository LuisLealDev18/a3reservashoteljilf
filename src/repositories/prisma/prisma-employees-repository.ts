import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { EmployeesRepository } from '../employees-repository'

export class PrismaEmployeeRepository implements EmployeesRepository {
  async findByUsername(username: string) {
    const student = await prisma.employee.findUnique({
      where: {
        username,
      },
    })

    return student
  }

  async create(data: Prisma.EmployeeCreateInput) {
    const employee = await prisma.employee.create({
      data,
    })

    return employee
  }
}
