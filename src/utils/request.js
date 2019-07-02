//import 'whatwg-fetch';
import {isDevEnv} from "./index";
import {SERVER} from "appConfig";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

export const getHeaders = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json, text/plain, */*");
    const apiKey = localStorage.getItem('apikey')
    if (apiKey) {
        headers.append("Authorization", "Bearer " + apiKey);
    }
    return headers
}


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
    try {
        return response.json();
    } catch (error) {
        if (error.name === "SyntaxError") {
            try {
                const text = response.text();
                console.error('request.parseJSON response.text(): ', text);
                return {text: text};
            } catch (e) {
                console.error('request.parseJSON: ', e)
                throw e
            }

        }
        throw error;
    }

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
    const requestOptions = isDevEnv() ?
        {
            ...options,
            mode: "cors"
        }
        :
        options;
    const requestUrl = isDevEnv() ? SERVER + url : url;
    return fetch(requestUrl, requestOptions)
        .then(checkStatus)
        .then(parseJSON);
}
