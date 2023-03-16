//این سوالت رو خوب حل کردی ولی ادم سرش درد میگیره می خواد کدت رو بخونه خدا وکیلی فکر منم بکن که می خوام کدت رو بخونم تمیز تر کد بزن :)
let n = 3;
let a = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
let mark = [];
let k = 1;

function DFS(v){
    mark[v] = k;
    for (let i = 0; i < n; i ++){
        if (a[v - 1][i] == 1 && !mark[i + 1])
            DFS(i + 1);
    }
}


for (let i = 1; i <= n; i ++){
    mark[i] = 0;
}
for (let i = 1; i <= n; i ++){
    if (!mark[i]){
        DFS(i);
        k ++;
    }
}
console.log(k - 1);
