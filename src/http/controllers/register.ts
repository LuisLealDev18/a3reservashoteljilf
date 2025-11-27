import { FastifyRequest, FastifyReply } from 'fastify'

import { z } from 'zod'
import { registerUseCase } from 'src/use-cases/register'

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
    await registerUseCase({
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
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
