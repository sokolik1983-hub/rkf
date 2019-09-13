import { endpointExhibitionsList } from '../../config';

const LS_KEY = 'GLOBAL_CITY';

const FILTER_KEYS = {
    cities: 'CityIds',
    breeds: 'BreedIds',
    ranks: 'RankIds',
    castes: 'CasteIds',
    types: 'TypeIds',
    clubs: 'ClubIds',
    page: 'PageNumber',
    dateFrom: 'DateFrom',
    dateTo: 'DateTo'
};

export const mapParams = (array, apiParamName) => {
    //
    if (array.length > 0) {
        let str = '';
        array.forEach(el => {
            str = str + `${apiParamName}=${el}&`;
        });
        return str;
    }
    return null;
};

export const checkLastAmpersand = str => str.charAt(str.length - 1) === '&';

export const buildUrlParams = filter => {
    let str = '';
    // Для каждого ключа (массива) фильтра создать часть строки
    Object.keys(filter).forEach(key => {
        const params = mapParams(filter[key], FILTER_KEYS[key]);
        if (params !== null) {
            str = str + params;
        }
    });
    // отрезать последний & у строки параметров
    if (checkLastAmpersand(str)) {
        return str.substring(0, str.length - 1);
    }
    return str;
};

export const buildUrl = filter => {
    const params = buildUrlParams(filter);
    return params
        ? `${endpointExhibitionsList}?${buildUrlParams(filter)}`
        : endpointExhibitionsList;
};

export const loadGlobalCity = () => {
    const globalCity = localStorage.getItem(LS_KEY);
    const city = globalCity ? JSON.parse(globalCity) : null;
    return city ? city.value : null;
};
