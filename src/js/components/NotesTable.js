const createNotesTableRow = note => {

  return `
    <tr class="hover:cursor-pointer group/note">
      <th scope="row" class="group-hover/note:text-emerald-500 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
        ${note.name}
      </th>
      <td class="px-6 py-4 group-hover/note:text-emerald-500">
        ${new Date(note.createdAt).toLocaleDateString()}
      </td>
      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 group-hover/note:text-emerald-500">
        ${note.category.name}
      </td>
      <td class="px-6 py-4 group-hover/note:text-emerald-500">
        ${note.content}
      </td>
      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 group-hover/note:text-emerald-500">
        ${note.dates}
      </td>
      <td class="px-6 py-4 group-hover/note:text-emerald-500">
        ...
      </td>
    </tr>
  `;
}

const createNotesTableBody = notes => {

  return notes.reduce((html, note) => html + createNotesTableRow(note), '');
}

export default ({ notes }) => {

  return `
    <div class="relative overflow-x-auto sm:rounded-lg border border-slate-200 notes-table">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Name
            </th>
            <th scope="col" class="px-6 py-3">
              Created
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Content
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Dates
            </th>
            <th scope="col" class="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          ${createNotesTableBody(notes)}
        </tbody>
      </table>
    </div>
  `;
}