// var str1 = "(-567)";
// var str2 = "(88)";
var str3 = "(7)";
var index = 1;

function parseVal(str){
    var temp = "";
    while (str[index] !== ")"){
        temp += str[index];
        index++;
        console.log(temp + "______" +index);
    }
    console.log(index + " its index");
    console.log(Number(temp) + " its number");
    console.log(typeof Number(temp) + " its type");
    return Number(temp);
    //изменить индекс на последний символ числа
}

// parseVal(str1);
// parseVal(str2);
parseVal(str3);

// function parseVal(str){
//     var temp = "";
//     while (str[index] !== ")"){
//         temp += str[index];
//         index++;
//     }
//     return Number(temp);
// }
//
// parseVal(str);