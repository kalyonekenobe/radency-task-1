export class StorageItemNotFoundError extends Error {

  static #defaultMessage = 'The object was not found in the storage!';

  constructor(message) {
    super();
    this.message = message ? message : StorageItemNotFoundError.#defaultMessage;
  }
}

export class StorageItemAlreadyExistsError extends Error {

  static #defaultMessage = 'The object is already exists in the storage!';

  constructor(message) {
    super();
    this.message = message ? message : StorageItemAlreadyExistsError.#defaultMessage;
  }
}