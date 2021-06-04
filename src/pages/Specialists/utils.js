import history from "../../utils/history";
import { endpointGetSpecialists } from "./config";
import { formatDateToString } from "../../utils/datetime";

const buildUrlParams = filter => {
    let params = '';

    Object.keys(filter).forEach(key => {
        if (filter[key]) {
            if (key === 'PageNumber') {
                if (filter[key] > 1) {
                    params = params + `${key}=${filter[key]}&`;
                }
            } else if (key === 'SearchTypeId') {
                if (filter[key] > 0) {
                    params = params + `${key}=${filter[key]}&`;
                }
            } else if (key === 'ClassificationId' || key === 'SpecializationIds' || key === 'DisciplineIds' || key === 'CityIds' || key === 'TypeIds' || key === 'PaymentFormTypeIds' || key ===  "RegionIds") {
                if (filter[key].length) {
                    params = params + filter[key].map(r => `${key}=${r}&`).join('');
                }
            } else if (key === 'StringFilter') {
                params = params + `${key}=${filter[key]}&`;
            }
            else {
                params = params + `${key}=${filter[key]}&`;
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

    return endpointGetSpecialists + params;
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

            if (key === 'CityIds' || key === 'ClassificationId' || key === 'SpecializationIds' || key === 'DisciplineIds' || key === 'TypeIds' || key === 'PaymentFormTypeIds' || key === "RegionIds") {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else if (key === 'StringFilter') {
                filtersFromUrl[key] = key === 'StringFilter' ? value : value;
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
    const targetUrl = (`/specialists${buildUrlParams(newFilters)}`);
    initial ? history.replace(targetUrl) : history.push(targetUrl);
};

export const getEmptyFilters = (alias = null) => ({
    Alias: alias,
    RegionIds: [],
    CityIds: [],
    ClubIds: null,
    ClassificationId: [],
    DisciplineIds: [],
    SpecializationIds: [],
    TypeIds: [],
    PaymentFormTypeIds: [],
    SearchTypeId: 1,
    DateFrom: formatDateToString(new Date()),
    DateTo: null,
    StringFilter: '',
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromUrl = getFiltersFromUrl();

    const filters = filtersFromUrl || emptyFilters;

    if (!filtersFromUrl) setFiltersToUrl(filters, true);

    return filters;
};