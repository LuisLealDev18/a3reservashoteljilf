import { FastifyRequest, FastifyReply } from 'fastify'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateEmployeeUseCase } from 'src/use-cases/factories/make-authenticate-employee-use-case'
import { z } from 'zod'

export async function authenticateEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateEmployeeBodySchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  })

  const { username, password } = authenticateEmployeeBodySchema.parse(
    request.body,
  )
  let employee = {}

  try {
    const authenticateUseCase = makeAuthenticateEmployeeUseCase()

    employee = await authenticateUseCase.execute({
      username,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(employee)
}
