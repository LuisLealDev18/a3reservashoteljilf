export class EmployeeUsernameAlreadyExistsError extends Error {
  constructor() {
    super('Username already exists.')
  }
}
