import history from "../../utils/history";
import {endpointGetSearchResults} from "./config";


export const buildUrlParams = filters => {
    let params = '';

    Object.keys(filters).forEach(key => {
        if (filters[key]) {
            if (
                key === 'federation_ids' ||
                key === 'region_ids' ||
                key === 'city_ids' ||
                key === 'breed_group_ids' ||
                key === 'breed_ids' ||
                key === 'rank_ids' ||
                key === 'specialist_discipline_ids' ||
                key === 'specialist_specialization_ids' ||
                key === 'contest_ids'
            ) {
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
    breed_group_ids: [],
    breed_ids: [],
    region_ids: [],
    city_ids: [],
    rank_ids: [],
    rank_id: [],
    specialist_specialization_ids: [],
    contest_ids: [],
    specialist_classification_id: 0,
    specialist_discipline_ids: [],
    date_from: '',
    date_to: '',
    price_from: '',
    price_to: '',
    activated: false,
    active_member: false,
    sortType: 1,
});

export const getFiltersFromUrl = () => {
    let filters = {...getEmptyFilters()};

    if (history.location.search) {
        let filtersFromUrl = {};

        decodeURIComponent(history.location.search).replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            if (
                key === 'federation_ids' ||
                key === 'region_ids' ||
                key === 'city_ids' ||
                key === 'breed_group_ids' ||
                key === 'breed_ids' ||
                key === 'rank_ids' ||
                key === 'specialist_discipline_ids' ||
                key === 'specialist_specialization_ids' ||
                key === 'contest_ids'
            ) {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else if(key === 'activated' || key === 'active_member') {
                filtersFromUrl[key] = value === 'true';
            } else if(key === 'search_type' || key === 'specialist_classification_id' || key === 'sortType') {
                filtersFromUrl[key] = +value;
            } else if(key === 'rank_id') {
                filtersFromUrl[key] = JSON.parse('[' + value + ']');
            } else {
                filtersFromUrl[key] = value;
            }
        });

        Object.keys(filters).forEach(key => {
            if(filtersFromUrl[key] !== undefined) {
                filters[key] = filtersFromUrl[key];
            }
        });
    }
    console.log('filters', filters)

    return filters;
};

export const setFiltersToUrl = filters => {
    const newFilters = Object.keys(filters).length > 2 ? {...filters} : {...getFiltersFromUrl(), ...filters};

    history.push(`/search${buildUrlParams(newFilters)}`);
};