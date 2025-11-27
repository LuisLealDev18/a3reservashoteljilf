import { Prisma, Student } from '@prisma/client'

export interface StudentsRepository {
  findByEmail(email: string): Promise<Student | null>
  findByCpf(cpf: string): Promise<Student | null>
  findByUsername(username: string): Promise<Student | null>
  create(data: Prisma.StudentCreateInput): Promise<Student>
}
