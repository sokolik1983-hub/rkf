//import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

export const getHeaders = () => (
    {
        "Content-Type": "application/json, text/plain, */*",
    }
);


const getErrors = (error) => {
    try {
        return JSON.parse(error);
    } catch (e) {
        return {server_error: error}
    }
};

function parseJSON(response) {
    const {status} = response;
    if (status === 204 || status === 205) {
        return null;
    }
    return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
const checkStatus = async (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    const response_text = await response.text();
    error.response = getErrors(response_text);
    error.responseStatus = response.status;
    throw error;
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

export default function request({url, options}) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}
