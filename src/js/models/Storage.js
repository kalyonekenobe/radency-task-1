import Note from './Note.js';
import Category from "./Category.js";
import {InvalidArgumentError, NotInstanceOfClassError} from "../errors/ClassErrors.js";
import {StorageItemAlreadyExistsError, StorageItemNotFoundError} from "../errors/StorageErrors.js";

export default class Storage {

  static #notes = []
  static #categories = []

  static init() {
    const taskCategory = Category.create('Task');
    const randomThoughtCategory = Category.create('Random Thought');
    const ideaCategory = Category.create('Idea');

    Note.create('The content for the first note', taskCategory);
    Note.create('The content for the second note', taskCategory);
    Note.create('The content for the third note', randomThoughtCategory);
    Note.create('The content for the fourth note', ideaCategory);
    Note.create('The content for the fifth note', taskCategory);
    Note.create('The content for the sixth note', ideaCategory);
    Note.create('The content for the seventh note', randomThoughtCategory);
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
    noteInStorage = {
      ...noteInStorage,
      content: note.content,
      category: note.category,
    }

    return noteInStorage;
  }

  static removeNote(note) {

    if (!(note instanceof Note)) {
      throw new NotInstanceOfClassError('The object is not an instance of Note!');
    }

    let noteInStorage = Storage.findNote(note);
    Storage.notes.filter(noteItem => noteItem.id !== noteInStorage.id);

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
    categoryInStorage = {
      ...categoryInStorage,
      name: category.name,
    }

    return categoryInStorage;
  }

  static removeCategory(category) {

    if (!(category instanceof Category)) {
      throw new NotInstanceOfClassError('The object is not an instance of Category!');
    }

    let categoryInStorage = Storage.findCategory(category);
    Storage.categories.filter(categoryItem => categoryItem.id !== categoryInStorage.id);

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
}