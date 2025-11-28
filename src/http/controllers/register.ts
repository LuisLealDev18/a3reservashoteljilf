import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import {
  StudentCpfAlreadyExistsError,
  StudentEmailAlreadyExistsError,
  StudentUsernameAlreadyExistsError,
} from 'src/use-cases/errors/student-already-exists-error'
import { makeRegisterUseCase } from 'src/use-cases/factories/make-register-use-case'

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
  })

  const { name, username, email, cpf, telephone, address, course, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      username,
      email,
      cpf,
      telephone,
      address,
      course,
      password,
      status: true,
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
