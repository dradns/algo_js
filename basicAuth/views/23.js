// function countdown(num){
//     console.log(num);
//     if (num === 0){
//         return;
//     }else{
//         countdown(num - 1);
//     }
// };
//
// countdown(15);

function factorial(num){
    console.log(num);
    if (num === 0 || num === 1){
        return 1;
    }
    return num * factorial(num - 1);
};

console.log(factorial(4));