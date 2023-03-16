//  توی این سوال اصلا نحوه استفادت از پرامیس ها اشتباهه برای اینکه بتونی این مدلی استفاده کنی باید از پراپرتی استیت یا مثلا زیرالت استفاده می کردی
const myPromiseChecker = (myArr)=> {
    for (let item of myArr){
        if (item == 'Resolve'){
            continue
        }
        else if(item == 'Reject'){
            return 0
        }
    }
    return 1
}


const p1 = Promise.resolve(3);
const p2 = 1337;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

myArr = [p1, p2, p3]
const promiseChecker = myPromiseChecker([p1,p2,p3])
if (promiseChecker == 1){
    for (let item of myArr){

        item.then((val) => {
            console.log(val)
        })
    }
}else{
    console.log('something went wrong')
}
