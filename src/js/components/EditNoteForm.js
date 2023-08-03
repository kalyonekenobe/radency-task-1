import Storage from "../utils/classes/Storage.js";
import Category from "../models/Category.js";
import Builder from "../utils/classes/Builder.js";
import CategoriesTable from "./CategoriesTable.js";
import NotesTable from "./NotesTable.js";
import Note from "../models/Note.js";

const EditNoteForm = props => {

  let {
    categories,
    showArchivedNotes = false,
    errors = [],
    isVisible = false,
    formState = {},
  } = props;

  const children = [];

  const updateDOM = ({ isFormVisible, formState } = {}) => {

    if (errors?.length === 0) {
      const notes = Storage.fetchAllNotes();
      const notesTable = document.querySelector('.notes-table');
      Builder.render(NotesTable({ notes, showArchivedNotes }), notesTable);

      const categories = Storage.fetchAllCategories().map(category => Category.getCategoryExtendedInfo(category));
      const categoriesTable = document.querySelector('.categories-table');
      Builder.render(CategoriesTable({ categories }), categoriesTable);
    }

    const editNoteFormContainer = document.querySelector('.edit-note-form-container');
    return Builder.render(EditNoteForm({
      categories,
      errors, isVisible:
      isFormVisible,
      formState,
      showArchivedNotes
    }), editNoteFormContainer);
  };

  const listenEditNoteFormEvents = props => {
    const editNoteFormContainer = document.querySelector('.edit-note-form-container');
    const submitEditNoteFormButton = document.querySelector('.submit-edit-note-form-button');
    const closeEditNoteFormButton = document.querySelector('.close-edit-note-form-button');

    closeEditNoteFormButton?.addEventListener('click', event => {
      editNoteFormContainer?.classList.add('hidden');
      errors = [];
      updateDOM({ isFormVisible: false });
    });

    submitEditNoteFormButton?.addEventListener('click', event => {
      event.preventDefault();
      const form = document.querySelector('.edit-note-form');
      errors = [];

      try {
        formState.name = form?.name?.value;
        formState.content = form?.content?.value;
        formState.categoryId = form?.category?.value;

        if (!formState.name?.trim()) {
          errors = [...errors, 'Name cannot be empty!'];
        }

        if (!formState.content?.trim()) {
          errors = [...errors, 'Content cannot be empty!'];
        }

        if (!formState.categoryId) {
          errors = [...errors, 'Choose category!'];
        }

      } catch (error) {
        errors = [ ...errors, error];
      }

      if (errors?.length === 0) {
        formState.category = Storage.fetchAllCategories().find(category => category.id === formState.categoryId);
        const note = Note.clone(formState);

        try {
          Note.update(note);
        } catch (error) {
          alert(`Note updating error: ${error}`);
        }

        form.reset();
      }

      updateDOM({ isFormVisible: errors?.length > 0, formState });
    });

    children.forEach(child => child.listenEvents?.(child.props));
  }

  const toString = () => {

    return `
      <div class="relative z-10 edit-note-form-container ${!isVisible ? `hidden` : ``}" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form class="edit-note-form">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    ${
                      errors?.length > 0 ?
                        `
                          <div class="errors-container mb-5">
                            ${
                              errors.map(error => {
                                return `
                                  <span class="error border rounded-sm text-sm border-red-100 flex mb-0.5 text-red-500 px-2 py-0.5">
                                    ${error}
                                  </span>
                                `;
                              }).join('')
                            }  
                          </div>
                        `
                        :
                        ``
                    }
                    <h3 class="text-base font-semibold leading-6 text-gray-900 text-xl mb-5" id="modal-title">Edit note</h3>
                    <div class="mb-2">
                      <label for="name" class="text-slate-500 text-sm">Name: </label>
                      <input type="text" name="name" id="name" class="w-full border rounded-md mt-1 px-2 py-1 outline-none" value="${formState?.name ?? ''}">
                    </div>
                    <div class="mb-2">
                      <label for="content" class="text-slate-500 text-sm">Content: </label>
                      <textarea name="content" id="content" class="w-full border rounded-md mt-1 px-2 py-1 outline-none min-h-[100px]">${formState?.content ?? ''}</textarea>
                    </div>
                    <div>
                      <label for="content" class="text-slate-500 text-sm">Category: </label>
                      <select class="w-full border rounded-md mt-1 px-2 py-1 outline-none" name="category" id="category">
                        ${
                          categories.map(category => {
                            return `
                              <option value="${category.id}" ${category.id === formState?.category?.id || category.id === formState.categoryId ? `selected` : ``}>
                                ${category.name}
                              </option>
                            `;
                          }).join('')
                        }
                      </select>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" class="outline-none submit-edit-note-form-button inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto">Save</button>
                  <button type="button" class="close-edit-note-form-button mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  }

  return {
    props: props,
    children: children,
    listenEvents: listenEditNoteFormEvents,
    toString: toString,
  };
};

export default EditNoteForm;