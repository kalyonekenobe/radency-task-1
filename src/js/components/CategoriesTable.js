const createCategoriesTableRow = category => {

  return `
    <tr class="hover:cursor-pointer group/category">
      <th scope="row" class="group-hover/category:text-emerald-500 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
        ${category.name}
      </th>
      <td class="px-6 py-4 group-hover/category:text-emerald-500">
        ${category.activeNotes?.length}
      </td>
      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800 group-hover/category:text-emerald-500">
        ${category.archivedNotes?.length}
      </td>
    </tr>
  `;
};

const createCategoriesTableBody = categories => {

  return categories.reduce((html, category) => html + createCategoriesTableRow(category), '')
};

const CategoriesTable = props => {

  const { categories } = props;
  const children = [];

  const listenCategoriesTableEvents = () => {

    children.forEach(child => child.listenEvents?.(child.props));
  };

  const toString = () => {

    return `
      <div class="relative overflow-x-auto sm:rounded-lg border border-slate-200 categories-table">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Note Category
              </th>
              <th scope="col" class="px-6 py-3">
                Active
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Archived
              </th>
            </tr>
          </thead>
          <tbody>
            ${createCategoriesTableBody(categories)}
          </tbody>
        </table>
      </div>
    `;
  };

  return {
    props: props,
    children: children,
    listenEvents: listenCategoriesTableEvents,
    toString: toString,
  };
};

export default CategoriesTable;