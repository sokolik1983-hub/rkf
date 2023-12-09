//federation indexes
//
//РКФ 1
//РФСС 3
//РФОС 4
//РФЛС 5
//Фауна 6
//Элита 7
//РКК 8

const getFedInfo = (fedIndex) => {
    switch (fedIndex) {
        case 1:
            return {
                iconClassName: 'rkf-logo',
                fedName: 'РКФ',
            };
        case 3:
            return {
                iconClassName: 'rfss-logo',
                fedName: 'РФСС',
            };
        case 4:
            return {
                iconClassName: 'rfos-logo',
                fedName: 'РФОС',
            };
        case 5:
            return {
                iconClassName: 'rfls-logo',
                fedName: 'РФЛС',
            };
        case 6:
            return {
                iconClassName: 'oankoo-logo',
                fedName: 'Фауна',
            };
        case 7:
            return {
                iconClassName: 'oankoo-logo',
                fedName: 'Элита',
            };
        case 8:
            return {
                iconClassName: 'oankoo-logo',
                fedName: 'РКК',
            };
        default:
            return {};
    }
};

const mainFedList = (array) => {
    let mainList = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].organization_type !== 6 && array[i].organization_type !== 7 && array[i].organization_type !== 8) {
            mainList.push(array[i]);
        }
    }
    return mainList;
};

const oankooFedList = (array) => {
    let oankooList = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i].organization_type === 6 || array[i].organization_type === 7 || array[i].organization_type === 8) {
            oankooList.push(array[i]);
        }
    }
    return oankooList;
};

export {
    getFedInfo,
    mainFedList,
    oankooFedList,
};