import history from "../../utils/history";

export const buildUrlParams = filters => {
    let params = '';

    Object.keys(filters).forEach(key => {
        if(key !== 'filtered_cities') {
            if (filters[key] || key === 'activated' || key === 'active_rkf_user') {
                if (key === 'federation_ids' || key === 'city_ids' || key === 'breed_ids' || key === 'region_ids') {
                    if (filters[key].length) {
                        params += filters[key].map(id => `${key}=${id}&`).join('');
                    }
                } else {
                    params += `${key}=${filters[key]}&`;
                }
            }
        }
    });

    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, -1);
    }
    return params ? `?${params}` : '';
};

export const getEmptyFilters = () => ({
    region_ids: [],
    organization_type: 3,
    string_filter: '',
    federation_ids: [],
    city_ids: [],
    breed_ids: [],
    active_rkf_user: false,
    activated: true,
    active_member: false,
    not_activated: false,
    is_popular: false,
});

export const getFiltersFromUrl = () => {
    const emptyFilters = getEmptyFilters();
    let filters = {};

    if (history.location.search) {
        let filtersFromUrl = {};

        decodeURIComponent(history.location.search).replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            if (key === 'federation_ids' || key === 'city_ids' || key === 'breed_ids' || key === 'region_ids') {
                filtersFromUrl[key] = filtersFromUrl[key] ? [...filtersFromUrl[key], +value] : [+value];
            } else if(key === 'activated' || key === 'active_member' || key === 'not_activated' || key === 'active_rkf_user') {
                filtersFromUrl[key] = value === 'true';
            } else {
                filtersFromUrl[key] = key === 'organization_type' ? +value : value;
            }
        });

        Object.keys(emptyFilters).forEach(key => {
            filters[key] = filtersFromUrl[key] !== undefined ? filtersFromUrl[key] : emptyFilters[key];
        });

    } else {
        setFiltersToUrl({...emptyFilters});
        filters = {...emptyFilters};
    }

    return filters;
};

export const setFiltersToUrl = filters => {
    console.log('filtered5555', filters.filtered_cities);
    console.log('filter6666', filters.city_ids);

    const newArr = [];

    if(filters.filtered_cities) {
        filters.filtered_cities.forEach(item => {
            filters.city_ids.forEach(elem => {
                if(item === elem) {
                    newArr.push(item);
                }
            })
        });
        filters.city_ids = newArr;
    }


    console.log('filters777777777', filters);

    const newFilters = Object.keys(filters).length > 2 ? {...filters} : {...getFiltersFromUrl(), ...filters};

    history.push(`/organizations${buildUrlParams(newFilters)}`);
};