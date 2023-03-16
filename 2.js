// باید این قسمت رو هم که اگه یکیشون ریجکت میشد چه اتفاقی می فتاد پیاده سازی می کردی
const promise1 = new Promise((resolve, reject) => {
  resolve(true);
});

const promise2 = new Promise((resolve, reject) => {
  resolve(true);
});

values = [promise1, promise2];

Promise.all(values).then((res) => {
  // console.log(res);
});

function promiseAll(promises) {
  let result = [];
  let temp;

  promises.forEach(async (promise, index) => {
    temp = await promise;
    result.push(temp);
    console.log(temp);
    console.log(result);
  });

  return result;
}

console.log(promiseAll(values));
