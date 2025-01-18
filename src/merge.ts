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

function sort(arr: Array<number>): Array<number> {
  let iteration = 0;
  let ordinaryArraysAmount = arr.length; // in the beginning
  let ordinaryArrayLength = 1;
  let tailArrayLength = 0;
  while (iteration++ < Math.log2(arr.length)) {
    // case 1: even and without a tail
    if (ordinaryArraysAmount % 2 === 0 && tailArrayLength === 0) {
      arr = sortEvenWithoutTail(arr, ordinaryArraysAmount, ordinaryArrayLength);
      ordinaryArraysAmount = Math.floor(ordinaryArraysAmount / 2);
      tailArrayLength = 0;
      ordinaryArrayLength *= 2;
      continue;
    }

    // case 2: odd and without a tail
    if (ordinaryArraysAmount % 2 === 1 && tailArrayLength === 0) {
      arr = sortOddWithoutTail(arr, ordinaryArraysAmount, ordinaryArrayLength);
      ordinaryArraysAmount = Math.floor(ordinaryArraysAmount / 2);
      tailArrayLength = ordinaryArrayLength;
      ordinaryArrayLength *= 2;
      continue;
    }

    // case 3: even and with a tail
    if (ordinaryArraysAmount % 2 === 0 && tailArrayLength !== 0) {
      arr = sortEvenWithTail(
        arr,
        ordinaryArraysAmount,
        ordinaryArrayLength,
        tailArrayLength
      );
      ordinaryArraysAmount = Math.floor(ordinaryArraysAmount / 2);
      ordinaryArrayLength *= 2;
      continue;
    }

    // case 4: odd and with a tail
    if (ordinaryArraysAmount % 2 === 1 && tailArrayLength !== 0) {
      arr = sortOddWithTail(
        arr,
        ordinaryArraysAmount,
        ordinaryArrayLength,
        tailArrayLength
      );
      ordinaryArraysAmount = Math.floor(ordinaryArraysAmount / 2);
      tailArrayLength = tailArrayLength + ordinaryArrayLength;
      ordinaryArrayLength *= 2;
      continue;
    }
  }

  return arr;
}

function sortEvenWithoutTail(
  arr: number[],
  ordinaryArraysAmount: number,
  ordinaryArrayLength: number
): number[] {
  let resultArr: Array<number> = [];
  for (
    let indexPoint = 0;
    indexPoint < ordinaryArraysAmount * ordinaryArrayLength;
    indexPoint += 2 * ordinaryArrayLength
  ) {
    let arrFirst = arr.slice(indexPoint, indexPoint + ordinaryArrayLength);
    let arrSecond = arr.slice(
      indexPoint + ordinaryArrayLength,
      indexPoint + 2 * ordinaryArrayLength
    );
    let mergedArray = mergeSorted(arrFirst, arrSecond);
    resultArr = resultArr.concat(mergedArray);
  }

  return resultArr;
}

function sortOddWithoutTail(
  arr: number[],
  ordinaryArraysAmount: number,
  ordinaryArrayLength: number
): number[] {
  let resultArr: Array<number> = [];
  for (
    let indexPoint = 0;
    indexPoint < (ordinaryArraysAmount - 1) * ordinaryArrayLength;
    indexPoint += 2 * ordinaryArrayLength
  ) {
    let arrFirst = arr.slice(indexPoint, indexPoint + ordinaryArrayLength);
    let arrSecond = arr.slice(
      indexPoint + ordinaryArrayLength,
      indexPoint + 2 * ordinaryArrayLength
    );
    let mergedArray = mergeSorted(arrFirst, arrSecond);
    resultArr = resultArr.concat(mergedArray);
  }

  resultArr = resultArr.concat(arr.slice(-ordinaryArrayLength));

  return resultArr;
}

function sortEvenWithTail(
  arr: number[],
  ordinaryArraysAmount: number,
  ordinaryArrayLength: number,
  tailArrayLength: number
): number[] {
  let resultArr: Array<number> = sortEvenWithoutTail(
    arr,
    ordinaryArraysAmount,
    ordinaryArrayLength
  );

  resultArr = resultArr.concat(arr.slice(-tailArrayLength));

  return resultArr;
}

function sortOddWithTail(
  arr: number[],
  ordinaryArraysAmount: number,
  ordinaryArrayLength: number,
  tailArrayLength: number
): number[] {
  let resultArr: Array<number> = sortEvenWithoutTail(
    arr,
    ordinaryArraysAmount - 1,
    ordinaryArrayLength
  );

  let lastPair = mergeSorted(
    arr.slice(-tailArrayLength - ordinaryArrayLength, -tailArrayLength),
    arr.slice(-tailArrayLength)
  );
  resultArr = resultArr.concat(lastPair);
  return resultArr;
}

let arr: number[] = Array.from({ length: 100000 }, () =>
  Math.floor(Math.random() * 100)
); // массив из случайных чисел

console.warn(`Array length ${arr.length}`);
let start = performance.now();
let res = arr.sort();
let end = performance.now();
console.log(`Prototype sort Execution time: ${(end - start).toFixed(3)} ms`);

start = performance.now();
res = sort(arr);
end = performance.now();
console.log(`Fon Neiman sort Execution time: ${(end - start).toFixed(3)} ms`);

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
