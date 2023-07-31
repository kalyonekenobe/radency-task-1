export class NotInstanceOfClassError extends Error {

  static #defaultMessage = 'The object is not an instance of this class!';

  constructor(message) {
    super();
    this.message = message ? message : NotInstanceOfClassError.#defaultMessage;
  }
}

export class InvalidArgumentError extends Error {

  static #defaultMessage = 'Provided argument is invalid!';

  constructor(message) {
    super();
    this.message = message ? message : InvalidArgumentError.#defaultMessage;
  }
}