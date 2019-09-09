const LS_KEY = 'GLOBAL_CITY';

export const mapParams = (array, apiParamName) => {
    let str = '';
    array.forEach(el => {
        str = str + apiParamName + '=' + el + '&';
    });
    return str;
};
export const buildUri = filter => {
    let str = '';

    Object.keys(filter).forEach(key => {
        str = str + mapParams(filter[key], 'CityIds');
    });

    return str;
};

export const loadGlobalCity = () => {
    const globalCity = localStorage.getItem(LS_KEY);
    const city = globalCity ? JSON.parse(globalCity) : null;
    return city ? city.value : null;
};