import Note from "../models/Note.js";
import Builder from "../utils/classes/Builder.js";
import CategoriesTable from "./CategoriesTable.js";
import Storage from "../utils/classes/Storage.js";
import Category from "../models/Category.js";
import EditNoteForm from "./EditNoteForm.js";

const createNotesTableRow = note => {

  return `
    <tr class="hover:cursor-pointer group group/note ${note.isArchived ? `archived` : ``} vertical-center">
      <th scope="row" class="group-hover/note:text-emerald-500 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 group-[.archived]:bg-emerald-100">
        ${note.name}
        ${
          note.isArchived ?
            `
              <span class="bg-emerald-500 rounded-md ms-1 px-1 py-0.5 text-white text-xs content-box">
                Archived
              </span>
            `
            :
            ``
        }
        
      </th>
      <td class="px-6 py-4 group-hover/note:text-emerald-500 group-[.archived]:bg-emerald-50">
        ${
          new Date(Number.parseInt(note.createdAt)).toLocaleDateString('en', { 
            month: "long", 
            day: "2-digit", 
            year: "numeric" 
          })
        }
      </td>
      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 group-hover/note:text-emerald-500 group-[.archived]:bg-emerald-100">
        ${note.category.name}
      </td>
      <td class="px-6 py-4 group-hover/note:text-emerald-500 group-[.archived]:bg-emerald-50">
        ${note.content}
      </td>
      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 group-hover/note:text-emerald-500 group-[.archived]:bg-emerald-100">
        ${note.dates.length > 0 ? note.dates.join(', ') : '—'}
      </td>
      <td class="px-6 py-4 group-[.archived]:bg-emerald-50">
        <div class="flex w-full h-full justify-around align-stretch">
          <a class="button hover:text-yellow-500 edit-note" data-note-id="${note.id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </a>
          ${
            note.isArchived ?
              `
                <a class="button hover:text-indigo-500 unarchive-note" data-note-id="${note.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </a>
              `
              :
              `
                <a class="button hover:text-indigo-500 archive-note" data-note-id="${note.id}">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </a>
              `
          }
          <a class="button hover:text-red-500 remove-note" data-note-id="${note.id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </a>
        </div>
      </td>
    </tr>
  `;
};

const createNotesTableBody = (notes, showArchivedNotes = false) => {

  let notesInTable = [...notes];

  if (showArchivedNotes) {
    notesInTable = notesInTable.sort((noteA, noteB) => noteB.isArchived - noteA.isArchived);
  }

  return notesInTable.reduce((html, note) => {

    if (showArchivedNotes || !showArchivedNotes && !note.isArchived) {
      html += createNotesTableRow(note);
    }

    return html;
  }, '');
};

const NotesTable = props => {

  const { notes, showArchivedNotes = false } = props;
  const children = [];

  const updateDOM = ({ showEditNoteForm = false, editNoteFormState = {} } = {}) => {
    const notes = Storage.fetchAllNotes();
    const notesTable = document.querySelector('.notes-table');
    Builder.render(NotesTable({ notes, showArchivedNotes }), notesTable);

    const categories = Storage.fetchAllCategories().map(category => Category.getCategoryExtendedInfo(category));
    const categoriesTable = document.querySelector('.categories-table');
    Builder.render(CategoriesTable({ categories }), categoriesTable);

    if (showEditNoteForm) {
      const editNoteFormContainer = document.querySelector('.edit-note-form-container');
      Builder.render(EditNoteForm({
        ...props,
        categories,
        formState: editNoteFormState,
        isVisible: showEditNoteForm,
        showArchivedNotes
      }), editNoteFormContainer);
    }
  };

  const listenNotesTableEvents = props => {

    let { notes } = props;
    const archiveNoteButtons = document.querySelectorAll('.button.archive-note');
    const editNoteButtons = document.querySelectorAll('.button.edit-note');
    const unarchiveNoteButtons = document.querySelectorAll('.button.unarchive-note');
    const removeNoteButtons = document.querySelectorAll('.button.remove-note');

    archiveNoteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const { noteId } = button.dataset;
        const note = notes.find(note => note.id === noteId);

        note.isArchived = true;

        try {
          Note.update(note);
        } catch (error) {
          alert(`Note archiving error: ${error}`);
        }

        updateDOM();
      });
    });

    unarchiveNoteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const { noteId } = button.dataset;
        const note = notes.find(note => note.id === noteId);

        note.isArchived = false;

        try {
          Note.update(note);
        } catch (error) {
          alert(`Note unarchiving error: ${error}`);
        }

        updateDOM();
      });
    });

    removeNoteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const { noteId } = button.dataset;
        const note = notes.find(note => note.id === noteId);

        try {
          Note.remove(note);
        } catch (error) {
          alert(`Note removal error: ${error}`);
        }

        updateDOM();
      });
    });

    editNoteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const {noteId} = button.dataset;
        const note = notes.find(note => note.id === noteId);

        updateDOM({ showEditNoteForm: true, editNoteFormState: note });
      });
    });

    children.forEach(child => child.listenEvents?.(child.props));
  };

  const toString = () => {

    return `
      <div class="relative overflow-x-auto sm:rounded-lg border border-slate-200 notes-table">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800 w-[250px]">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Created
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Category
              </th>
              <th scope="col" class="px-6 py-3 w-[500px]">
                Content
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800 w-[200px]">
                Dates
              </th>
              <th scope="col" class="px-6 py-3 w-[150px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            ${createNotesTableBody(notes, showArchivedNotes)}
          </tbody>
        </table>
      </div>
    `;
  };

  return {
    props: props,
    children: children,
    listenEvents: listenNotesTableEvents,
    toString: toString,
  };
};

export default NotesTable;