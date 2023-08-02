import CategoriesTable from "./CategoriesTable.js";
import NotesTable from './NotesTable.js';

export default ({ notes, categories }) => {

  return `
    <div class="container p-5">
      <h2 class="text-3xl font-bold my-5">Notes</h2>
      ${NotesTable({ notes })}
      <div class="flex justify-end py-2">
        <a class="button create-note bg-emerald-500 hover:bg-emerald-400 rounded-md cursor-pointer px-10 py-1 flex text-white font-semibold">
          Create note
        </a>
      </div>
      <h2 class="text-3xl font-bold my-5">Categories</h2>
      ${CategoriesTable({ categories })}
    </div>
  `;
}