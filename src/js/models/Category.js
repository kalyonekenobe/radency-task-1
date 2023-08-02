import {InvalidArgumentError, NotInstanceOfClassError} from "../errors/class-errors.js";
import Storage from "../utils/classes/Storage.js";

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

  #setId(id) {

    if (!id?.trim()) {
      throw new InvalidArgumentError('Category id cannot be empty!');
    }

    this.#id = id;
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

    return Category.clone(categoryInStorage);
  }

  static update(category) {
    const categoryInStorage = Storage.updateCategory(category);

    return Category.clone(categoryInStorage);
  }

  static remove(category) {
    const categoryInStorage = Storage.removeCategory(category);

    return Category.clone(categoryInStorage);
  }

  static getByName(name) {
    const categoryInStorage = Storage.findCategoryByName(name);

    return Category.clone(categoryInStorage);
  }

  static validate(category) {

    if (!(category instanceof Category)) {
      throw new NotInstanceOfClassError('The object is not an instance of Category!');
    }

    if (!category.name?.trim()) {
      throw new InvalidArgumentError('Some of the required fields (name) have invalid values!');
    }
  }

  static clone(category) {

    if (!(category instanceof Category)) {
      throw new NotInstanceOfClassError('The object is not an instance of Category!');
    }

    const cloneCategory = new Category(category.name);
    cloneCategory.#setId(category.id);

    return cloneCategory;
  }
}