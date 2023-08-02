import Builder from "../utils/classes/Builder.js";
import Storage from "../utils/classes/Storage.js";
import HomePage from "../components/HomePage.js";

export const index = () => {

  const notes = Storage.fetchAllNotes();
  const categories = Storage.fetchAllCategories().map(category => {
    const categoryNotes = Storage.fetchCategoryNotes(category);
    category.notes = categoryNotes;
    category.archivedNotes = categoryNotes.filter(note => note.isArchived);
    category.activeNotes = categoryNotes.filter(note => !note.isArchived);

    return category;
  });

  const homePage = HomePage({ notes, categories });

  Builder.render(homePage);
}

export const notFound = () => {
  Builder.render(`<h1>Page not found!</h1>`)
}