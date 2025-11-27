import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    telephone: z.string(),
    address: z.string(),
    course: z.string(),
    password: z.string().min(6),
    status: z.string(),
  })

  const { name, email, cpf, telephone, address, course, password, status } =
    registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      cpf,
      telephone,
      address,
      course,
      password,
      status,
    },
  })

  return reply.status(201).send()
})
