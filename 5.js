//رو درست پیاده سازی نکردی چرا ؟؟ async  اینجا 
async function defer(callback) {
  callback();
  console.log("hello");
}

function f() {
  callback = console.log("javascript");
  defer(callback);
  console.log("hello");
}
