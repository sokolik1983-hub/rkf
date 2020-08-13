import history from "../../utils/history";

export const getFiltersFromLS = () => {
    return JSON.parse(localStorage.getItem('globalSearchFilters'));
};

export const setFiltersToLS = filters => {
    localStorage.setItem('globalSearchFilters', JSON.stringify(filters));
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