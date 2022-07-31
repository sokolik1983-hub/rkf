import history from "../../utils/history";
import { endpointGetExhibitions, endpointGetEducationals } from "./config";
import { formatDateToString } from "../../utils/datetime";

const buildUrlParams = filter => {
    let params = '';

    Object.keys(filter).forEach(key => {
        if(key !== 'filteredCities') {
            if (filter[key]) {
                if (key === 'PageNumber') {
                    if (filter[key] > 1) {
                        params = params + `${key}=${filter[key]}&`;
                    }
                } else if (key === 'CategoryId') {
                    if (filter[key] > 0) {
                        params = params + `${key}=${filter[key]}&`;
                    }
                } else if (
                    key === 'RankIds' ||
                    key === 'TypeIds' ||
                    key === 'BreedIds' ||
                    key === 'CityIds' ||
                    key === 'JudgeIds' ||
                    key === 'PaymentFormTypeIds' ||
                    key === 'RegionIds') {
                    if (filter[key].length) {
                        params = params + filter[key].map(item => `${key}=${item}&`).join('');
                    }
                } else {
                    params = params + `${key}=${filter[key]}&`;
                }
            }
        }
    });

    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, -1);
    }

    return params ? `?${params}` : '';
};

export const buildUrl = filter => {
    filter = filter || {};
    const params = buildUrlParams(filter);

    if (parseInt(filter.CategoryId) === 4) {
        return endpointGetEducationals + params;
    } else {
        return endpointGetExhibitions + params;
    }
};

export const getFiltersFromUrl = () => {
    const emptyFilters = getEmptyFilters();
    let filters = {};

    if (history.location.search) {
        const searchString = decodeURIComponent(history.location.search);
        let filtersFromUrl = {};

        searchString.replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            if (key === 'CityIds' ||
                key === 'RankIds' ||
                key === 'TypeIds' ||
                key === 'BreedIds' ||
                key === 'JudgeIds' ||
                key === 'PaymentFormTypeIds' ||
                key === 'RegionIds')
            {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else {
                filtersFromUrl[key] = key === 'PageNumber' ? +value : value;
            }
        });

        Object.keys(emptyFilters).forEach(key => {
            filters[key] = filtersFromUrl[key] || emptyFilters[key];
        });
    } else {
        filters = null;
    }
    return filters;
};

export const setFiltersToUrl = (filters, initial = false) => {
    const newFilters = getFiltersFromUrl() ? { ...getFiltersFromUrl(), ...filters } : filters;
    const targetUrl = (`/exhibitions${buildUrlParams(newFilters)}`);
    initial ? history.replace(targetUrl) : history.push(targetUrl);
};

export const getEmptyFilters = (alias = null) => ({
    Alias: alias,
    CityIds: [],
    ClubIds: null,
    RankIds: [],
    BreedIds: [],
    RegionIds: [],
    TypeIds: [],
    JudgeIds: [],
    PaymentFormTypeIds: [],
    CategoryId: 0,
    DateFrom: formatDateToString(new Date()),
    DateTo: null,
    sortType: 1,
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromUrl = getFiltersFromUrl();

    const filters = filtersFromUrl || emptyFilters;

    if (!filtersFromUrl) setFiltersToUrl(filters, true);

    return filters;
};