import {InvalidArgumentError, NotInstanceOfClassError} from "../errors/ClassErrors";
import Storage from "./Storage";

export default class Category {

  #id
  #name

  constructor(name) {
    this.#id = crypto.randomUUID();
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  set name(value) {

    if (!value?.trim()) {
      throw new InvalidArgumentError('Category name cannot be empty!');
    }

    this.#name = value;
  }

  static create(name) {
    const categoryInStorage = Storage.createCategory(new Category(name));

    return structuredClone(categoryInStorage);
  }

  static update(category) {
    const categoryInStorage = Storage.updateCategory(category);

    return structuredClone(categoryInStorage);
  }

  static remove(category) {
    const categoryInStorage = Storage.removeCategory(category);

    return structuredClone(categoryInStorage);
  }

  static validate(category) {

    if (!(category instanceof Category)) {
      throw new NotInstanceOfClassError('The object is not an instance of Category!');
    }

    if (!category.name?.trim()) {
      throw new InvalidArgumentError('Some of the required fields (name) have invalid values!');
    }
  }
}