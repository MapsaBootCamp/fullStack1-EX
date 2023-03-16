////////////////Qu.1///////////////
//ببین برای اینکه همه ساب استرینگت رو با قسمت بریده شده مقایسه کنی فقط کافیه از مساوی استفاده کنی لازم نیست که دوباره تک تک مقایسشون کنی و
//اینکه یک مشکل دیگه اینه که تو اولین باری که اولین حرف سابت رو پیدا میکنی از توی لوپ می پری بیرون خوب این اشتباهه چون ممکنه توی بار دوم اینا با هم برابر باشن 
const search = (str1 , str2) => {
    let temp;
    for(let i = 0 ; i < str1.length ; i++){
        if(str1[i] === str2[0]){
             temp = str1.slice(i) ;
             break ;
        }
    }
    if (temp.length <= str2.length){
        for(let j = 0 ; j < str2.length ; j++){
            if(temp[j] == str2[j]){
                continue ;
            }else{
                return false ;
            }
        }
    }else{
        return false ;
    }
    
    return true ;
}



////////////////Qu.2///////////////
//اینجا منطق رو فهمیدی ولی سینتکست مشکل داره تو وفتی اویت میکنی روی پرامیس اون المان تبدیل میشه به جوابش و دیگه لازم نیست کالش کنی و اینکه توی این حالت که با اویت نوشتی دیگه نیازی به چک کردن تعداد ریزالو شده ها نیست چ.ن اگه هرکدومشون ریجکت بشه می پره توی کچ فقط لازمه بعد فور یه ریترن ترو بذاری
async function promiseAll(arr){
    let tempArr = [];
    try {
        for await(let elm of arr){
             elm();
             tempArr.push(elm);  
        }
        if(tempArr.length === arr.length){
            return true ;
        }
    } catch (error) {
        return false ;
    }
}





////////////////Qu.3///////////////
//ببین طبق چیزی که من فهمیدم کدت  اتفاقات خوب زیادی توش افتاده ولی مشکل زیاد داره اینکه جایی که تو اعداد رو جدا میکنی اصلا توجه نمی کنی به اینکه اون عدد ممکنه چند رقمی باشه یا اینکه به ترتیب عملیات ها ریاضی دفت نشده و پرانتز ها اصلا وارد استک نمی شن چون تو گزینه ها نیستن
const calculate = (str) => {
    let stackOP = [];
    let stackNum = [];

    // change operators
    for(let index in str){
        switch (str[index]){
            case '#' : str[index] = '+' ;
            break ;
            case '@' : str[index] = '*' ;
            break ;
            case '~' : str[index] = '-' ;
            break ;
            case '\\' : str[index] = '/' ;
            break ;
            }
        }

    
    for(const elm of str){
        if(stackNum.length > 1 && stackOP[stackOP.length -1] != '(' && stackOP[stackOP.length -1] != ')'){
            const var1 = stackNum.pop();
            const var2 = stackNum.pop();
            let op = stackOP.pop();
            if(op == '*'){
                let tempRes = var1 * var2 ;
                stackNum.push(tempRes);
            }else if(op == '+'){
                let tempRes = var1 + var2 ;
                stackNum.push(tempRes);
            }else if(op == '-'){
                let tempRes = var1 - var2 ;
                stackNum.push(tempRes);
            }else if(op == '/'){
                let tempRes = var1 / var2 ;
                stackNum.push(tempRes);
            }
            
        }else if(stackNum.length > 1 && stackOP[stackOP.length -1] === ')'){
            //find operator
            stackOP.pop();
            let op = stackOP.pop();
            stackOP.pop();

            const var1 = stackNum.pop();
            const var2 = stackNum.pop();
            if(op == '*'){
                let tempRes = var1 * var2 ;
                stackNum.push(tempRes);
            }else if(op == '+'){
                let tempRes = var1 + var2 ;
                stackNum.push(tempRes);
            }else if(op == '-'){
                let tempRes = var1 - var2 ;
                stackNum.push(tempRes);
            }else if(op == '/'){
                let tempRes = var1 / var2 ;
                stackNum.push(tempRes);
            }

        }
        if(elm == '+' || elm == '-' || elm == '*' || elm == '/'){
            stackOP.push(elm);
        }else{
            stackNum.push(Number(elm));
        }
    }

    console.log(stackNum);
}



////////////////Qu.4///////////////

//..........




////////////////Qu.5///////////////

function F(){
    Promise.resolve('JavaScript').then((res) => console.log(res))
    //// or this way ://////
    //setTimeout(() => {
    //    console.log('JavaScript')
    //}, 0);
    console.log('Hello');
}
