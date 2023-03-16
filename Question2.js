// // //دادی then ریجکت رو ولی تو یه جوری هردو رو به  catch  ریزالو رو میگیره و  then  رسول جان منطق کلی رو درست گرفتی ولی سینتکست خیلی مشکل داره اول اینکه 
// // //else چون توی شرطش ایسینکرونس داره ریزالو نمیشه و برای همین همیشه ما می افتیم تو اون  if بعد در قسمت بعدی اون 
const bromiseAll = (promises) => {
    try {
        for (let promise of promises) {
            promise.catch((err) => { throw new Error(err) })
        }
        return new Promise((res, rej) => {
            if (promises.reduce((preVal, currVal) => {
                if (!preVal) return false;
                currVal.then(res=> {return true;},rej=>{return false;})
                // if (currVal.then){
                //     return false;
                // }
            }, true)) {
                res("All Done")
            }
            else{
                rej("Error in one")
            }
        });
    } catch (err) {
        return Promise.reject(err.message);
    }
}

const promiseList = [
    new Promise((res, rej) => {
        let s = 1;
        if (s === 1) {
            res("success")
        } else {
            rej("failed")
        }
    }),
    new Promise((res, rej) => {
        let s = 1;
        if (s === 1) {
            res("success")
        } else {
            rej("failed")
        }
    }),
]

bromiseAll(promiseList).then((res) => console.log(res),(rej)=> console.log(rej));




// funcTwo = function (activate) {
//     return new Promise(function (resolve, reject) {
//         var tmpFuncTwo;
//         if (activate === true) {
//             tmpFuncTwo = "I'm successful"
//             resolve(tmpFuncTwo)
//         } else if (activate === false) {
//             tmpFuncTwo = "I'm a failure.";
//             reject(tmpFuncTwo)
//         } else {
//             tmpFuncTwo = "Oh this is not good."
//             throw new Error(tmpFuncTwo);
//         }
//     });
// }
