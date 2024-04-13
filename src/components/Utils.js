export function doSorting(tableData, sortKey, receivedOrder) {
    if (!sortKey) return tableData;

    const afterSorting = tableData.sort((first, second) => {
      return first[sortKey] > second[sortKey] ? 1 : -1;
    });

    if (receivedOrder) {
      return afterSorting.reverse();
    }

    return afterSorting;
}