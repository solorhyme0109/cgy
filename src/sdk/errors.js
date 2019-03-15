export class TypeError extends Error {
  constructor(message) {
    super()
    this.message = `Type Error: ${message}.`
  }
}

export class NotExistError extends Error {
  constructor(message) {
    super()
    this.message = `Not Exist Error: ${message}.`
  }
}

export class CallWithIllegalParamsError extends Error {
  constructor(message) {
    super()
    this.message = `Params Illegal Error: ${message}.`
  }
}
