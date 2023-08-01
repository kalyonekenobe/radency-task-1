import Storage from './Storage.js'
import {InvalidArgumentError, NotInstanceOfClassError} from "../errors/ClassErrors.js";
import Category from "./Category.js";
import {DATE_REGEX} from "../regex-strings.js";

export default class Note {

  #id
  #content
  #category
  #dates
  #isArchived
  #createdAt

  constructor(content, category) {
    this.#id = crypto.randomUUID();
    this.#content = content;
    this.#category = category;
    this.#createdAt = Date.now();
    this.#isArchived = false;
    this.#dates = content.matchAll(DATE_REGEX);
  }

  get id() {
    return this.#id;
  }

  #setId(id) {

    if (!id?.trim()) {
      throw new InvalidArgumentError('Note id cannot be empty!');
    }

    this.#id = id;
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

  get dates() {
    return this.#dates;
  }

  #setDates(dates) {

    if (!dates || Array.isArray(dates)) {
      throw new InvalidArgumentError('Note "dates" property cannot be undefined and must be an array!');
    }

    this.#dates = dates;
  }

  get isArchived() {
    return this.#isArchived;
  }

  set isArchived(value) {

    if (value === undefined || typeof value !== 'boolean') {
      throw new InvalidArgumentError('Provided "isArchived" property has invalid value!');
    }

    this.#isArchived = value;
  }

  get createdAt() {
    return this.#createdAt;
  }

  #setCreatedAt(createdAt) {

    if (!createdAt || Date.isPrototypeOf(createdAt)) {
      throw new InvalidArgumentError('Note "createdAt" property cannot be undefined and must be an array!');
    }

    this.#createdAt = createdAt;
  }

  static create(content, category) {
    const noteInStorage = Storage.createNote(new Note(content, category));

    return Note.clone(noteInStorage);
  }

  static update(note) {
    const noteInStorage = Storage.updateNote(note);

    return Note.clone(noteInStorage);
  }

  static remove(note) {
    const noteInStorage = Storage.removeNote(note);

    return Note.clone(noteInStorage);
  }

  static validate(note) {

    if (!(note instanceof Note)) {
      throw new NotInstanceOfClassError('The object is not an instance of Note!');
    }

    if (!note.content?.trim() || !note.category || !(note.category instanceof Category)) {
      throw new InvalidArgumentError('Some of the required fields (content, category) have invalid values!');
    }
  }

  static clone(note) {

    if (!(note instanceof Note)) {
      throw new NotInstanceOfClassError('The object is not an instance of Note!');
    }

    const cloneNote = new Note(note.content, note.category);
    cloneNote.#setId(note.id);
    cloneNote.#setCreatedAt(note.createdAt);
    cloneNote.#setDates(note.dates);
    cloneNote.isArchived = note.isArchived;

    return cloneNote;
  }
}