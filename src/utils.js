export const bubbleSort = (arr) => {
  console.log('inside bubble sort');
  let swaps = [];
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr.length - j - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swaps.push([i, i + 1]);
      }
    }
  }
  console.log(arr);
  return [arr, swaps];
};
