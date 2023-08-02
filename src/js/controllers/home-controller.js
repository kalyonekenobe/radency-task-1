import Builder from "../utils/classes/Builder.js";
import Storage from "../utils/classes/Storage.js";
import HomePage from "../components/HomePage.js";
import Category from "../models/Category.js";

export const index = () => {

  const notes = Storage.fetchAllNotes();
  const categories = Storage.fetchAllCategories().map(category => Category.getCategoryExtendedInfo(category));

  const homePage = HomePage({ notes, categories });

  Builder.render(homePage);
}

export const notFound = () => {
  Builder.render(`<h1>Page not found!</h1>`)
}