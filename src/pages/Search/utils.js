import history from "../../utils/history";
import {endpointGetSearchResults} from "./config";

export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('globalSearchFilters'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('globalSearchFilters', JSON.stringify(filters));
};

export const buildSearchUrl = (string_filter, search_type, start_element) => {
    let urlParams = '';

    if(string_filter) urlParams += `string_filter=${string_filter}&`;
    if(search_type) urlParams += `search_type=${search_type}&`;
    urlParams += `start_element=${start_element}`;

    return `${endpointGetSearchResults}?${urlParams}`;
};

const getSearchFilter = () => {
    let searchString = ''

    if (history.location.search) {
        searchString = decodeURIComponent(history.location.search).replace('?s=', '');
    }

    return searchString;
};

export const getEmptyFilters = () => ({
    string_filter: getSearchFilter() || '',
    search_type: null,
    start_element: 1
});

export const getInitialFilters = () => {
    const emptyFilters = getEmptyFilters();
    const filtersFromLS = getFiltersFromLS();

    return filtersFromLS ? {...filtersFromLS, string_filter: getSearchFilter() || ''} : emptyFilters;
};