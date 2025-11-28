import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { registerEmployee } from './controllers/register-employee'
import { authenticate } from './controllers/authenticate'

export function appRoutes(app: FastifyInstance) {
  app.post('/students', register)
  app.post('/employee', registerEmployee)
  app.post('/students/sessions', authenticate)
}
