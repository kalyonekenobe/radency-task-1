import CategoriesTable from "./CategoriesTable.js";
import NotesTable from './NotesTable.js';
import Builder from "../utils/classes/Builder.js";
import Storage from "../utils/classes/Storage.js";

const HomePage = props => {

  const { notes, categories, showArchivedNotes = false } = props;
  const notesTable = NotesTable({ notes, showArchivedNotes });
  const categoriesTable = CategoriesTable({ categories });

  const children = [
    notesTable,
    categoriesTable,
  ];

  const listenHomePageEvents = ({ notes, categories, showArchivedNotes } = {}) => {

    const createNoteButton = document.querySelector('.button.create-note');
    const toggleArchivedNotesButton = document.querySelector('.button.toggle-archived-notes');

    createNoteButton?.addEventListener('click', event => {
      alert(1);
    });

    toggleArchivedNotesButton?.addEventListener('click', event => {

      notes = Storage.fetchAllNotes();
      if (showArchivedNotes) {
        notes = notes.filter(note => !note.isArchived);
      }

      Builder.render(HomePage({ notes, categories, showArchivedNotes: !showArchivedNotes }));
    });

    children.forEach(child => child.listenEvents?.(child.props));
  };

  const toString = () => {

    return `
      <div class="container p-5">
        <h2 class="text-3xl font-bold my-5">Notes</h2>
        ${notesTable}
        <div class="flex justify-end py-2">
          ${
            showArchivedNotes ?
              `
                <a class="button me-2 toggle-archived-notes bg-white outline outline-[1px] outline-slate-300 hover:bg-slate-100 rounded-md cursor-pointer px-10 py-1 text-slate-500 flex font-semibold">
                  Hide archived notes
                </a>
              `
              :
              `
                <a class="button me-2 toggle-archived-notes bg-slate-900 hover:bg-slate-800 rounded-md cursor-pointer px-10 py-1 flex text-white font-semibold">
                  Show archived notes
                </a>
              `
          }
          <a class="button create-note bg-emerald-500 hover:bg-emerald-400 rounded-md cursor-pointer px-10 py-1 flex text-white font-semibold">
            Create note
          </a>
        </div>
        <h2 class="text-3xl font-bold my-5">Categories</h2>
        ${categoriesTable}
      </div>
    `;
  }

  return {
    props: props,
    children: children,
    listenEvents: listenHomePageEvents,
    toString: toString
  }
};

export default HomePage;