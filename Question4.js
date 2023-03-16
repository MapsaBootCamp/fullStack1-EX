// افرین که حلش کردی ولی حقیقتا من پدرم دراومد تا فهمیدم چیکار کردی از بس که متغیر عجیب داری سعی کن یه مقدار خوانا تر بنویسی
const calculateStatesCount = (citiesRelations) => {
    let statesObject = [[0]];

    for (let index = 1; index < citiesRelations.length; index++) {


        let secLayerBreakout = false;
        for (const stateCities of statesObject) {
            if (secLayerBreakout) break;
            for (const city of stateCities) {
                if (secLayerBreakout) break;
                if (citiesRelations[index][city]) {
                    stateCities.push(index);
                    secLayerBreakout = true;
                }
            }
        }
        if (!secLayerBreakout) {
            statesObject.push([index])

        }
    }

    let res = statesObject.reduce((preVal, currVal) => {
        if (!preVal.length) {
            return [...preVal, currVal];
        } else {
            for (const cityIndex of currVal) {
                let state = preVal.find(state => state.includes(cityIndex));
                if (state) {
                    state = [...state, ...currVal];
                    return preVal;
                }
            }
            return [...preVal, currVal];
        }
    }, []).length;

    return res;
}




console.log(calculateStatesCount([[0, 1, 0, 1], [1, 0, 0, 0], [0, 0, 0, 1], [1, 0, 1, 0]]));
