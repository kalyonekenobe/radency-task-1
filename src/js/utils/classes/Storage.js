import Note from '../../models/Note.js';
import Category from "../../models/Category.js";
import {InvalidArgumentError, NotInstanceOfClassError} from "../../errors/class-errors.js";
import {StorageItemAlreadyExistsError, StorageItemNotFoundError} from "../../errors/storage-errors.js";
import {DATE_REGEX} from "../regex-strings.js";

export default class Storage {

  static #notes = []
  static #categories = []

  static init() {
    const taskCategory = Category.create('Task');
    const randomThoughtCategory = Category.create('Random Thought');
    const ideaCategory = Category.create('Idea');

    Note.create('First note', 'The content for the first note', taskCategory);
    let note2 = Note.create('Second note', 'The content for the second note', taskCategory);
    let note3 = Note.create('Third note', 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021', randomThoughtCategory);
    Note.create('Fourth note', 'The content for the fourth note', ideaCategory);
    Note.create('Fifth note', 'The content for the fifth note', taskCategory);
    Note.create('Sixth note', 'The content for the sixth note', ideaCategory);
    Note.create('Seventh note', 'The content for the seventh note', randomThoughtCategory);

    note2.isArchived = true;
    note3.isArchived = true;

    Note.update(note2);
    Note.update(note3);
  }

  static get notes() {
    return Storage.#notes;
  }

  static get categories() {
    return Storage.#categories;
  }

  static createNote(note) {

    try {
      Note.validate(note);
      let noteInStorage = Storage.findNote(note);

      if (noteInStorage) {
        throw new StorageItemAlreadyExistsError('This note already exists in the storage!');
      }
    } catch (error) {
      if (error instanceof StorageItemNotFoundError) {
        this.notes.push(note);
      } else {
        throw error;
      }
    }

    return note;
  }

  static updateNote(note) {
    Note.validate(note);
    let noteInStorage = Storage.findNote(note);

    if (noteInStorage) {
      noteInStorage = Note.clone(note);
      Storage.#notes = Storage.notes.map(storageNote => storageNote.id === noteInStorage.id ? noteInStorage : storageNote);
    }

    return noteInStorage;
  }

  static removeNote(note) {

    if (!(note instanceof Note)) {
      throw new NotInstanceOfClassError('The object is not an instance of Note!');
    }

    let noteInStorage = Storage.findNote(note);
    Storage.#notes = Storage.notes.filter(noteItem => noteItem.id !== noteInStorage.id);

    return noteInStorage;
  }

  static findNote(note) {

    if (!(note instanceof Note)) {
      throw new NotInstanceOfClassError('The object is not an instance of Note!');
    }

    let noteInStorage = Storage.notes.find(noteItem => noteItem.id === note.id);

    if (!noteInStorage) {
      throw new StorageItemNotFoundError('The note with such id was not found in the storage!');
    }

    return noteInStorage;
  }

  static fetchAllNotes() {
    return [...Storage.notes];
  }

  static createCategory(category) {

    try {
      Category.validate(category);
      let categoryInStorage = Storage.findCategory(category);

      if (categoryInStorage) {
        throw new StorageItemAlreadyExistsError('This category already exists in the storage!');
      }
    } catch (error) {
      if (error instanceof StorageItemNotFoundError) {
        this.categories.push(category);
      } else {
        throw error;
      }
    }

    return category;
  }

  static updateCategory(category) {
    Category.validate(category);
    let categoryInStorage = Storage.findCategory(category);

    if (categoryInStorage) {
      categoryInStorage = Category.clone(category);
      Storage.#categories = Storage.notes.map(storageCategory => storageCategory.id === categoryInStorage.id ? categoryInStorage : storageCategory);
    }

    return categoryInStorage;
  }

  static removeCategory(category) {

    if (!(category instanceof Category)) {
      throw new NotInstanceOfClassError('The object is not an instance of Category!');
    }

    let categoryInStorage = Storage.findCategory(category);
    Storage.#categories = Storage.categories.filter(categoryItem => categoryItem.id !== categoryInStorage.id);

    return categoryInStorage;
  }

  static findCategory(category) {

    if (!(category instanceof Category)) {
      throw new NotInstanceOfClassError('The object is not an instance of Category!');
    }

    let categoryInStorage = Storage.categories.find(categoryItem => categoryItem.id === category.id);

    if (!categoryInStorage) {
      throw new StorageItemNotFoundError('The category with such id was not found in the storage!');
    }

    return categoryInStorage;
  }

  static findCategoryByName(name) {

    if (!name?.trim()) {
      throw new InvalidArgumentError('Category name cannot be empty!');
    }

    let categoryInStorage = Storage.categories.find(categoryItem => categoryItem.name === name);

    if (!categoryInStorage) {
      throw new StorageItemNotFoundError('The category with such name was not found in the storage!');
    }

    return categoryInStorage;
  }

  static fetchAllCategories() {
    return [...Storage.categories];
  }

  static fetchCategoryNotes(category) {
    return Storage.notes.filter(note => note.category.id === category.id);
  }
}