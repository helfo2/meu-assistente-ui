const sortedIndex = (array, elem, prop) => {
  let low = 0;
  let high = array.length;

  while (low < high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (array[mid][prop] < elem[prop]) low = mid + 1;
    else high = mid;
  }
  return low;
};

const insertSorted = (arr, elem, prop) =>
  arr.splice(sortedIndex(arr, elem, prop), 0, elem);

export default insertSorted;
