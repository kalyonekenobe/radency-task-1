import Storage from './Storage'
import {InvalidArgumentError, NotInstanceOfClassError} from "../errors/ClassErrors";
import Category from "./Category";

export default class Note {

  #id
  #content
  #category
  #createdAt

  constructor(content, category) {
    this.#id = crypto.randomUUID();
    this.#content = content;
    this.#category = category;
    this.#createdAt = Date.now();
  }

  get id() {
    return this.#id;
  }

  get content() {
    return this.#content;
  }

  set content(value) {

    if (!value?.trim()) {
      throw new InvalidArgumentError('The content of the note cannot be empty!');
    }

    this.#content = value;
  }

  get category() {
    return this.#category;
  }

  set category(value) {

    if (!value) {
      throw new InvalidArgumentError('Provided category cannot be undefined value!');
    }

    if (!(value instanceof Category)) {
      throw new NotInstanceOfClassError('Provided object is not an instance of Category!');
    }

    this.#category = value;
  }

  get createdAt() {
    return this.#createdAt;
  }

  static create(content, category) {
    const noteInStorage = Storage.createNote(new Note(content, category));

    return structuredClone(noteInStorage);
  }

  static update(note) {
    const noteInStorage = Storage.updateNote(note);

    return structuredClone(noteInStorage);
  }

  static remove(note) {
    const noteInStorage = Storage.removeNote(note);

    return structuredClone(noteInStorage);
  }

  static validate(note) {

    if (!(note instanceof Note)) {
      throw new NotInstanceOfClassError('The object is not an instance of Note!');
    }

    if (!note.content?.trim() || !note.category || !(note.category instanceof Category)) {
      throw new InvalidArgumentError('Some of the required fields (content, category) have invalid values!');
    }
  }
}