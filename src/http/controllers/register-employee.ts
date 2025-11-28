import { FastifyRequest, FastifyReply } from 'fastify'
import { EmployeeUsernameAlreadyExistsError } from 'src/use-cases/errors/employee-already-exists-error'
import { makeRegisterEmployeeUseCase } from 'src/use-cases/factories/make-register-employee-use-case'
import z from 'zod'

export async function registerEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerEmployeeBodySchema = z.object({
    name: z.string(),
    code: z.string(),
    username: z.string(),
    password: z.string(),
  })

  const { name, code, username, password } = registerEmployeeBodySchema.parse(
    request.body,
  )

  try {
    const registerEmployeeUseCase = makeRegisterEmployeeUseCase()
    await registerEmployeeUseCase.execute({
      name,
      username,
      code,
      password,
    })
  } catch (err) {
    if (err instanceof EmployeeUsernameAlreadyExistsError) {
      return reply.status(409).send(err.message)
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
