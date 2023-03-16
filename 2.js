//ببین اتفاقی که ما اینجا دنبالش بودیم این بودش که اگه یکی از این پرامیس ها هم ریجکت شد کلا پرامیس کلی ریجکت بشه ولی برای تو یکی از پرامیس ها هم ریزالو بشه ، ریزالو میشه و اوکی میده.
// و نکته دیگه هم اینکه مثل اینکه تو نمی تونی پرامیس ها رو پاس بدی جای دیگه روشون دن بزنی باید همونجا روشون بزنی و بعدا روشون ویت کنی
stat = 0;

function P([...promises]){
    for (let i = 0; i < promises.length; i ++){
        promises[i].then(() => stat += 1)
                    .catch(console.log("Error"));
    }
    console.log(stat);
}

promise1 = new Promise((resolve, reject) => {
    resolve(5);
})
promise2 = new Promise((resolve, reject) => {
    resolve(5);
})
promise3 = new Promise((resolve, reject) => {
    resolve(5);
})

_P = [promise1, promise2, promise3];
P(_P);

promiseall = new Promise((resolve, reject) => {
    if (stat) resolve("OK");
    else reject("Not Ok")
})

promiseall.then(val => console.log(val))
