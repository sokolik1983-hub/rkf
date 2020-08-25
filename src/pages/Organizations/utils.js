import history from "../../utils/history";

export const buildUrlParams = filter => {
    let params = '';

    Object.keys(filter).forEach(key => {
        if (filter[key]) {
            if (key === 'federation_ids' || key === 'city_ids' || key === 'breed_ids') {
                if (filter[key].length) {
                    params += filter[key].map(id => `${key}=${id}&`).join('');
                }
            } else {
                params += `${key}=${filter[key]}&`;
            }
        }
    });

    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, -1);
    }

    return params ? `?${params}` : '';
};

export const getEmptyFilters = () => ({
    organization_type: 3,
    string_filter: "",
    federation_ids: [],
    city_ids: [],
    breed_ids: [],
    activated: true,
    active_member: false
});

export const getFiltersFromUrl = () => {
    const emptyFilters = getEmptyFilters();
    let filters = {};

    if (history.location.search) {
        let filtersFromUrl = {};

        decodeURIComponent(history.location.search).replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            if (key === 'federation_ids' || key === 'city_ids' || key === 'breed_ids') {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else {
                filtersFromUrl[key] = key === 'organization_type' ? +value : value;
            }
        });

        Object.keys(emptyFilters).forEach(key => {
            filters[key] = filtersFromUrl[key] || emptyFilters[key];
        });
    } else {
        filters = {...emptyFilters};
    }

    return filters;
};

export const setFiltersToUrl = filters => history.push(`/organizations${buildUrlParams({...filters})}`);