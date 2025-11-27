export class StudentEmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}

export class StudentCpfAlreadyExistsError extends Error {
  constructor() {
    super('Cpf already exists.')
  }
}

export class StudentUsernameAlreadyExistsError extends Error {
  constructor() {
    super('Username already exists.')
  }
}
