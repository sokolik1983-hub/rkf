import { endpointGetExhibitions } from "./config";
import { formatDateToString } from "../../utils/datetime";

export const buildUrl = filter => {
    let params = '';
    Object.keys(filter).forEach(key => {
        if (filter.ExhibitionName) {
            delete filter.DateFrom;
            delete filter.DateTo;
        }

        if (filter[key]) {
            if (key === 'CityIds') {
                let str = '';
                filter[key].forEach(el => {
                    str = str + `${key}=${el}&`;
                });
                params = params + str;
            } else if (key === 'PageNumber') {
                if (filter[key] > 1) {
                    params = params + `${key}=${filter[key]}&`;
                }
            } else if (key === 'RankIds' || key === 'BreedIds') {
                if (filter[key].length) {
                    params = params + filter[key].map(r => `${key}=${r}&`).join('');
                }
            } else {
                params = params + `${key}=${filter[key]}&`;
            }
        }
    });

    if (params.charAt(params.length - 1) === '&') {
        params = params.slice(0, -1);
    }

    params ? window.history.pushState(null, '', `//${window.location.host}${window.location.pathname}?${params}`)
           : window.history.pushState(null, '', `//${window.location.host}${window.location.pathname}`);

    return params ? `${endpointGetExhibitions}?${params}` : endpointGetExhibitions;
};

export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('FiltersValues'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('FiltersValues', JSON.stringify(filters));
};

export const getEmptyFilters = () => ({
    CityIds: [],
    ClubIds: null,
    RankIds: [],
    BreedIds: [],
    ExhibitionName: '',
    DateFrom: formatDateToString(new Date()),
    DateTo: null,
    PageNumber: 1
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromLS = getFiltersFromLS();

    if (filtersFromLS) {
        const dateToday = +new Date(emptyFilters.DateFrom);
        const dateFrom = filtersFromLS.DateFrom ?
            +new Date(filtersFromLS.DateFrom) > dateToday ?
                filtersFromLS.DateFrom :
                emptyFilters.DateFrom :
            emptyFilters.DateFrom;
        const dateTo = filtersFromLS.DateTo ?
            +new Date(filtersFromLS.DateTo) >= +new Date(dateFrom) ?
                filtersFromLS.DateTo :
                null :
            null;
        filtersFromLS.DateFrom = dateFrom;
        filtersFromLS.DateTo = dateTo ? dateTo : null;
    }

    const urlParams = new URLSearchParams(window.location.search);

    let filters = filtersFromLS ? filtersFromLS : emptyFilters;
    Object.keys(filters).forEach(k => {
        // look here after fixing array params elsewhere
        let x = urlParams.get(k);
        if (x) {
            if (!isNaN(x)) {
                x = Number(x);
            }
            console.log('if',k);
            if (filters[k] && filters[k].push) {
                filters[k].push(x);
            } else {
                filters[k] = x;
            }
        };
    });
    return filters;
};

export const getClubId = () => {
    return JSON.parse(localStorage.getItem('profile_id'));
};
