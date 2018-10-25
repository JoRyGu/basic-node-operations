function quickSort(collection) {
  let pivot = collection[collection.length - 1];
  let left = [];
  let right = [];
  let sortedArr = [];

  if(collection.length <= 1) {
    return collection;
  }

  for(let i = 0; i < collection.length - 1; i++) {
    if(collection[i] <= pivot) {
      left.push(collection[i]);
    } else {
      right.push(collection[i]);
    }
  }

  return sortedArr.concat(quickSort(left), pivot, quickSort(right));
}

exports.quickSort = quickSort;