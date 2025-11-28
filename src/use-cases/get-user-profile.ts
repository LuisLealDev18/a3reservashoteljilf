import { Student } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { StudentsRepository } from 'src/repositories/students-repository'

interface GetUserProfileUseCaseRequest {
  studentId: string
}

type GetUserProfileUseCaseResponse = {
  user: Student
}

export class GetUserProfileUseCase {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute({
    studentId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.studentsRepository.findById(studentId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
