import { sort, arraysEqual } from "./merge.js";

let arr: number[] = Array.from({ length: 100000 }, () =>
  Math.floor(Math.random() * 100)
); // массив из случайных чисел

console.warn(`Array length ${arr.length}`);
let start = performance.now();
let res1 = arr.sort((a, b) => a - b);
let end = performance.now();
console.log(`Prototype sort Execution time: ${(end - start).toFixed(3)} ms`);

start = performance.now();
let res2 = sort(arr);
end = performance.now();
console.log(`Fon Neiman sort Execution time: ${(end - start).toFixed(3)} ms`);

console.log(
  arraysEqual(res1, res2) ? "Arrays are equal" : "Arrays are not equal"
);
