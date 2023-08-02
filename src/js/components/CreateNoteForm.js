import Storage from "../utils/classes/Storage.js";
import Category from "../models/Category.js";
import Builder from "../utils/classes/Builder.js";
import CategoriesTable from "./CategoriesTable.js";
import NotesTable from "./NotesTable.js";
import Note from "../models/Note.js";

const CreateNoteForm = props => {

  let {
    categories,
    showArchivedNotes = false,
    errors = [],
    isVisible = false,
    formState = {}
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

    const createNoteFormContainer = document.querySelector('.create-note-form-container');
    return Builder.render(CreateNoteForm({ categories, errors, isVisible: isFormVisible, formState }), createNoteFormContainer);
  };

  const listenCreateNoteFormEvents = props => {
    const createNoteFormContainer = document.querySelector('.create-note-form-container');
    const createNoteButton = document.querySelector('.button.create-note');
    const submitCreateNoteFormButton = document.querySelector('.submit-create-note-form-button');
    const closeCreateNoteFormButton = document.querySelector('.close-create-note-form-button');

    closeCreateNoteFormButton?.addEventListener('click', event => {
      createNoteFormContainer?.classList.add('hidden');
      errors = [];
      updateDOM({ isFormVisible: false });
    });

    createNoteButton?.addEventListener('click', event => {
      createNoteFormContainer?.classList.remove('hidden');
      updateDOM({ isFormVisible: true });
    });

    submitCreateNoteFormButton?.addEventListener('click', event => {
      event.preventDefault();
      const form = document.querySelector('.create-note-form');
      const { name, content, categoryId } = {
        name: form?.name?.value,
        content: form?.content?.value,
        categoryId: form?.category?.value
      };

      errors = [];

      if (!name?.trim()) {
        errors = [...errors, 'Name cannot be empty!'];
      }

      if (!content?.trim()) {
        errors = [...errors, 'Content cannot be empty!'];
      }

      if (!categoryId) {
        errors = [...errors, 'Choose category!'];
      }

      if (errors?.length === 0) {
        const category = Storage.fetchAllCategories().find(category => category.id === categoryId);
        Note.create(name, content, category);
        form.reset();
      }

      updateDOM({ isFormVisible: errors?.length > 0, formState: { name, content, categoryId } });
    });

    children.forEach(child => child.listenEvents?.(child.props));
  }

  const toString = () => {

    return `
      <div class="relative z-10 create-note-form-container ${!isVisible ? `hidden` : ``}" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form class="create-note-form">
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
                    <h3 class="text-base font-semibold leading-6 text-gray-900 text-xl mb-5" id="modal-title">Create note</h3>
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
                              <option value="${category.id}" ${category.id === formState?.categoryId ? `selected` : ``}>
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
                  <button type="button" class="outline-none submit-create-note-form-button inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 sm:ml-3 sm:w-auto">Create</button>
                  <button type="button" class="close-create-note-form-button mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
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
    listenEvents: listenCreateNoteFormEvents,
    toString: toString,
  };
};

export default CreateNoteForm;