import { FastifyRequest, FastifyReply } from 'fastify'

import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    telephone: z.string(),
    address: z.string(),
    course: z.string(),
    password: z.string().min(6),
    status: z.boolean(),
  })

  const { name, email, cpf, telephone, address, course, password, status } =
    registerBodySchema.parse(request.body)

  await prisma.student.create({
    data: {
      name,
      email,
      cpf,
      telephone,
      address,
      course,
      password_hash: password,
      status,
    },
  })

  return reply.status(201).send()
}
