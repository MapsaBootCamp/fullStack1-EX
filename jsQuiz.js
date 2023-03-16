// Mohsen Razavi JS Exam 1401/12/05

// Question 1
//اینجا تقلب کردی ببین ما که نگفتیم اون ساب استرینگی که می خوایم حتما با فاصله جدا شده شاید اصلا توش فاصله داشت یا شاید ما اصلا تو استرینگ اصلی فاصله نذاشتیم.
const findTheWord = (str, word) => {
  const words = str.split(" ");
  let checkWord = false;
  for (let elm of words) {
    if (elm === word) {
      checkWord = true;
    }
  }
  console.log(checkWord);
};

// findTheWord("Hello world", "world");

//===============================================
// Question 2

const promise_1 = Promise.resolve(3);
const promise_2 = fetch("https://jsonplaceholder.typicode.com/posts")
  .then((res) => res.json())
  .then((data) => data[0].id);
const promise_3 = new Promise((resolve, reject) => {
  const result = ["a", "b", "c"];
  resolve(result);
  reject((err) => console.log(err.message));
});

// Promise.all([promise_1, promise_2, promise_3]).then((res) => console.log(res));
//===============================================
// Question 2
//ببین اینجا هم اتفاقی که می افته اینه که ما می خوایم یه پرامیس داشته باشیم که اگر همه ریزالو شدن، ریزالو بشه و در غیر اینصورت یعنی حتی اگه یکیشون ریجکت شد اینم ریجکت بشه
const names = ["Akbar", "Asghar", "Shahrooz"];

const show = (name) => new Promise((resolve) => resolve(name));

const showAllNames = async () => {
  try {
    for (name of names) {
      const nameInfo = await show(name);
      console.log(`his name is ${nameInfo}`);
    }
    console.log("All names shown");
  } catch (error) {
    console.log(error);
  }
};

showAllNames();

//===============================================
// Question 3
const mathAnswer = (str) => {
  const reg = str.match(/\(([^()]+)\)/g).toString();
  console.log(reg);
};

// mathAnswer("(2*3)+4");

//===============================================
// Question 4

//===============================================
// Question 5
const whatIsDefer = async () => {
  const res = Promise.resolve("Javascript").then((result) =>
    console.log(result)
  );
  console.log("hello");
};

// whatIsDefer();
