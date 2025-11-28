import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { registerEmployee } from './controllers/register-employee'

export function appRoutes(app: FastifyInstance) {
  app.post('/students', register)
  app.post('/employee', registerEmployee)
}
