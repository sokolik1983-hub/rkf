import history from "../../utils/history";
import {endpointGetSearchResults} from "./config";

export const buildSearchUrl = (string_filter, search_type, start_element) => {
    let urlParams = '';

    if(string_filter) urlParams += `string_filter=${string_filter}&`;
    if(search_type) urlParams += `search_type=${search_type}&`;
    urlParams += `start_element=${start_element}`;

    return `${endpointGetSearchResults}?${urlParams}`;
};

const getSearchFilter = () => {
    let searchString = ''

    console.log('getSearchFilter history.location', history.location);

    if (history.location.search) {
        searchString = decodeURIComponent(history.location.search).replace('?s=', '');
    }

    return searchString;
};

export const getInitialFilters = () => ({
    string_filter: getSearchFilter(),
    search_type: 8,
    start_element: 1
});