// // letter="aaa@bbsadf";
// console.log(letter.replace('@','*'));
// console.log(letter);
//در صورتی که نگفته بودیم استفاده نشه از تابع ایول ،کاملا درست بود

function changeSign(letter){
    switch(letter){
        case '#':
            letter='+';
            break;
        case '@':
            letter='*';
            break;
            
        case '~':
            letter='-';
            break;
        case '\\':
            letter='/';
            break;
    }
    return letter;
            
}

mystr= "(2 # 3) @ 8 \\ 2 ~ 4 # 2";
const regexParanthesis = /\(([^()]+)\)/g;

const arr =mystr.split(" ").map((letter)=> changeSign(letter))
const result = arr.join("")

const betweenParanthesis = result.match(regexParanthesis)

console.log(result);
// console.log(eval(result));
console.log(betweenParanthesis);
