import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from 'src/use-cases/register'
import { PrismaStudentsRepository } from 'src/repositories/prisma/prisma-students-repository'
import {
  StudentCpfAlreadyExistsError,
  StudentEmailAlreadyExistsError,
  StudentUsernameAlreadyExistsError,
} from 'src/use-cases/errors/student-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    telephone: z.string(),
    address: z.string(),
    course: z.string(),
    password: z.string().min(6),
    username: z.string(),
    status: z.boolean(),
  })

  const {
    name,
    username,
    email,
    cpf,
    telephone,
    address,
    course,
    password,
    status,
  } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaStudentsRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      username,
      email,
      cpf,
      telephone,
      address,
      course,
      password,
      status,
    })
  } catch (err) {
    if (err instanceof StudentEmailAlreadyExistsError) {
      return reply.status(409).send(err.message)
    }
    if (err instanceof StudentCpfAlreadyExistsError) {
      return reply.status(409).send(err.message)
    }
    if (err instanceof StudentUsernameAlreadyExistsError) {
      return reply.status(409).send(err.message)
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
