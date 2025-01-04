function mergeSorted(arr1: Array<number>, arr2: Array<number>) {
  if (arr1.length === 0 || arr2.length === 0) {
    return arr1.concat(arr2);
  }
  let i = 0,
    j = 0;
  let mergedArr: Array<number> = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
      if (i >= arr1.length) {
        mergedArr = mergedArr.concat(arr2.slice(j));
      }
    } else {
      mergedArr.push(arr2[j]);
      j++;
      if (j >= arr2.length) {
        mergedArr = mergedArr.concat(arr1.slice(i));
      }
    }
  }

  return mergedArr;
}

let arr: number[] = Array.from({ length: Math.floor(Math.random() * 20) }, () =>
  Math.floor(Math.random() * 100)
); // массив из случайных чисел

function sort(arr: Array<number>) {
  let iteration = 0;
  let len = 1;
  let resultArr: Array<number> = [];
  while (iteration < 10) {
    for (let j = 0; j < arr.length; j++) {
      let arrFirst = arr.slice(j, j + len);
      let arrSecond = arr.slice(j + len, j + 2 * len);
    }
  }
}

/**
let a1: number[] = Array.from({ length: Math.floor(Math.random() * 20) }, () =>
  Math.floor(Math.random() * 100)
); // массив из случайных чисел
let a2: number[] = Array.from({ length: Math.floor(Math.random() * 20) }, () =>
  Math.floor(Math.random() * 100)
); // массив из случайных чисел

a2 = [2];
a1 = [1];
a1.sort((a, b) => a - b); // сортировка массива a2
a2.sort((a, b) => a - b); // сортировка массива a2

console.log("a1:", a1);
console.log("a2:", a2);

const start = performance.now();
let result = mergeSorted(a1, a2);
const end = performance.now();
console.log(`Execution time: ${(end - start).toFixed(3)} ms`);
console.log(result);
 */
