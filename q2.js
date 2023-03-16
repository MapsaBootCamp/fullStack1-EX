
// p1 = new Promise((resolve, reject)=> resolve(50));
// توی این سوال حالتی رو که اگه یکیشون ریجکت شد باید خروجی نهایی رو کلا ریجکت کنی رو در نظر نگرفتی
p2 = 200;
p3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 2000, 'geek');
});

function isPromise(p) {
    if (typeof p === 'object' && typeof p.then === 'function') {
      return true;
    }
  
    return false;
  }
  
  const p1 = new Promise(resolve => {
    resolve(10);
  });

async function likePromiseAll(...params){
    const results =[]
    const promises = []
    
    for(item of params){
        if(isPromise(item)){
            promises.push(item)
        }else{
            results.push(results)
        }
    }
    for( promise of promises){
        result = await promise;
        results.push(result)
    }
    return results
    
}
likePromiseAll(p2,p3).then(data => console.log(data)) 

// likePromiseAll(1,23,"askdf",34){
//     return new Promise()
// }
