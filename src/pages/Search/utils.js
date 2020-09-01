import history from "../../utils/history";
import {endpointGetSearchResults} from "./config";

const buildUrlParams = ({string_filter, search_type, start_element}) => {
    let urlParams = '';

    if(string_filter) urlParams += `string_filter=${string_filter}&`;
    if(search_type) urlParams += `search_type=${search_type}&`;
    if(start_element) urlParams += `start_element=${start_element}`;

    if (urlParams.charAt(urlParams.length - 1) === '&') {
        urlParams = urlParams.slice(0, -1);
    }

    return urlParams;
}

export const buildSearchUrl = (string_filter, search_type, start_element, need_count) => {
    return `${endpointGetSearchResults}?${buildUrlParams({string_filter, search_type, start_element})}&need_count=${need_count}`;
};

export const getFiltersFromUrl = () => {
    let filtersFromUrl = {};

    if (history.location.search) {
        decodeURIComponent(history.location.search).replace('?', '').split('&').forEach(param => {
            const key = param.split('=')[0];
            const value = param.split('=')[1];

            filtersFromUrl[key] = key !== 'string_filter' ? +value : value;
        });
    }

    return filtersFromUrl;
};

export const setFiltersToUrl = filters => history.push(`/search?${buildUrlParams({...filters})}`);