function fibonacci(position){
    if (position < 0)
        console.log("poshel nahui");
    if (position === 0)
        return 0;
    if (position === 1)
        return 1;
    return fibonacci(position - 1 )+ fibonacci(position - 2);
}

console.log(fibonacci(0));
console.log(fibonacci(1));
console.log(fibonacci(2));
console.log(fibonacci(3));
console.log(fibonacci(5));
console.log(fibonacci(6));
