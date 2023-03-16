// const arr1 = ["a", "b", "c", "d"];
// const arr2 = ["a", "b", "c"];
//توی این سوال ما قرار نیست که یکسری کاراکتر جدا از هم به شما بدیم که اینطوری حلش کردی که قسمتی از حل سوال پیدا کردن راه حل برای این مشکله که پترن چندین حرفه و خوب مشکلی که اینکار درست می کنه اینه که الان تو فقط چک می کنی اون حرف داخل اون استرینگ هستش دیگه اینکه کنار هم باشن یا ترتبشون درست باشه رو اصلا چک نمی کنی
// const searchFind = function (arr1, arr2) {
//   let obj = {};

//   for (let i = 0; i < arr1.length; i++) {
//     if (!obj[arr1[i]]) {
//       obj[arr1[i]] = true;
//     }
//   }

//   for (let j = 0; j < arr2.length; j++) {
//     if (obj[arr2[j]]) {
//       return true;
//     }
//   }

//   return false;
// };

// console.log(searchFind(arr1, arr2));

///////////2
//پس اینکه اگه همشون ریزالو شدن جواب رو درست بده اگه حتی یکی هم ریجکت شد جواب رو غلط چی شد ؟ این که همه رو جدا انجام میده
// const all = [Promise.resolve("abc"), Promise.reject("error")];

// const allPromise = function (all) {
//   for (let prom of all) {
//     prom.then((res) => console.log(res)).catch((err) => console.error(err));
//   }
// };
// allPromise(all);

////////////4
//اخه این کجاش درسته مومن اینهمه بحث کردی با من کد تو فقط اون تعداد شهر هایی که با هم وصلن رو ممکنه نشون بدم اونم تازه اونهایی که اسمشون تنها یک عدد با هم فاصله داشته باشد یعنی اگه سه به یک وصل باشه ولی به دو هیجکدومشون وصل نباشن نمی فهمه 

// const ceties = [[1, 1, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0][(0, 0, 0, 1)]];

// findProvince = (cities) => {
//   //   let obj = {};
//   let countor = 0;

//   for (let i = 0; i < ceties.length - 1; i++) {
//     for (let j = 0; j < i; j++) {
//       if (cities[i][j] === cities[i][j + 1]) {
//         if (ceties[i + 1][j] === cities[i + 1][j + 1]) countor++;
//       } else {
//       }
//     }
//   }
//   countor += 1;
//   console.log(countor);
// };
// findProvince(ceties);
////////////5
// makeDefer = (name, lastName) => {
//   console.log(name);
//   setTimeout(() => console.log("SALAM"), 0);
//   console.log(lastName);
// };
// makeDefer("AmirReza", "Mosayeby");
