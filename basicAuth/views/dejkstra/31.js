import MinPriorityQueue from "./minQueue.js"

let queue = new MinPriorityQueue;
queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.size());
console.log(queue.pop());
console.log(queue.size());
