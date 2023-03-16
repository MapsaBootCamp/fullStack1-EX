//حالت خاص حل کردی کی گفته که ما استرینگمون رو حتما با فاصله جدا می کنیم از هم
const myString = 'Hello this is my first exam'
const findObj = 'first'



let myStringArr = myString.split(' ')
console.log(myStringArr)

for (let item of myStringArr){
    if (findObj === item){
        console.log(`this is my item: ${item}`)
    }else{
        console.log('could not find an object');
    }
}

