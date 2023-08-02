import CategoriesTable from "./CategoriesTable.js";
import NotesTable from './NotesTable.js';

export default ({ notes, categories }) => {

  return `
    <div class="container p-5">
      <h2 class="text-3xl font-bold my-5">Notes</h2>
      ${NotesTable({ notes })}
      <h2 class="text-3xl font-bold my-5">Categories</h2>
      ${CategoriesTable({ categories })}
    </div>
  `;
}