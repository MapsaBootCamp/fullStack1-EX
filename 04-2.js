// پرهام تو این سوال می خواستی سر منو گول بمالی ؟ تنها کاری که تو اینجا می کنی اینه که تعداد شهر های تنها رو بعلاوه 1 می کنی همین! این مثالی هم که برات گذاشتم نشون میده که غلطه
function sumCit(arr){
    sum = 0
    for (let item of arr){
        if (item == 1){
            sum += 1
        }
    }
    return sum - 1 
}

function clearCities(cityArr){
    counter = []
    for (let eachCity of cityArr){
        cityConnected = sumCit(eachCity)
        counter.push(cityConnected)
    }
    return counter    
}


const cities = [[1,1,0,0],[1,1,0,0 ],[0,0,1,0], [0,0,0,1]];
// const cities = [[1,0,0],[0,1,0],[0,0,1]];
amountOfCities = cities.length
newCityArr = clearCities(cities)
console.log(newCityArr);


isCon = 0
lenCon = 0
notCon = 0
for (let sm of newCityArr){
    if (sm == '0'){
        notCon += 1
    }
    else{
        isCon += 1
        lenCon += 1
    }
}

if ( lenCon == 0 ){
    console.log(notCon);
}
else{
    console.log(notCon + isCon/lenCon)
}




