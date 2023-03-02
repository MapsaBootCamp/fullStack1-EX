////////////////Qu.1///////////////

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
