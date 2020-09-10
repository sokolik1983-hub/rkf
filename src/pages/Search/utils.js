import history from "../../utils/history";
import {endpointGetSearchResults} from "./config";


export const buildUrlParams = filters => {
    let params = '';

    Object.keys(filters).forEach(key => {
        if (filters[key]) {
            if (key === 'federation_ids' || key === 'city_ids' || key === 'breed_ids' || key === 'rank_ids') {
                if (filters[key].length) {
                    params += filters[key].map(id => `${key}=${id}&`).join('');
                }
            } else {
                params += `${key}=${filters[key]}&`;
            }
        }
    });

    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, -1);
    }

    return params ? `?${params}` : '';
};

export const buildSearchUrl = (filters, start_element, need_count, need_filter) => {
    return `${endpointGetSearchResults}${buildUrlParams({...filters, start_element, need_count, need_filter})}`;
};

export const getEmptyFilters = () => ({
    string_filter: '',
    search_type: 8,
    federation_ids: [],
    breed_ids: [],
    city_ids: [],
    rank_ids: [],
    date_from: '',
    date_to: '',
    price_from: '',
    price_to: '',
    activated: false,
    active_member: false
});

export const getFiltersFromUrl = () => {
    let filters = {...getEmptyFilters()};

    if (history.location.search) {
        let filtersFromUrl = {};

        decodeURIComponent(history.location.search).replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            if (key === 'federation_ids' || key === 'city_ids' || key === 'breed_ids' || key === 'rank_ids') {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else if(key === 'activated' || key === 'active_member') {
                filtersFromUrl[key] = value === 'true';
            } else {
                filtersFromUrl[key] = key === 'search_type' ? +value : value;
            }
        });

        Object.keys(filters).forEach(key => {
            if(filtersFromUrl[key] !== undefined) {
                filters[key] = filtersFromUrl[key];
            }
        });
    }

    return filters;
};

export const setFiltersToUrl = filters => {
    const newFilters = Object.keys(filters).length > 2 ? {...filters} : {...getFiltersFromUrl(), ...filters};

    history.push(`/search${buildUrlParams(newFilters)}`);
};