str1 = "abcde";

function revers(str){
    if (str.length === 1){
        return str[0];
    }
    return revers(str.slice(1,str.length))  + str[0];
}

console.log(revers(str1));