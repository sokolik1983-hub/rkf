import axios from "axios";
import ls from "local-storage";
import {LOGIN_URL} from "../appConfig";
import history from "./history";
import {store} from "../app";
import {LOGOUT} from "../pages/Login/actiontypes";


export const getHeaders = (isMultipart = false) => {
    const apiKey = localStorage.getItem('apikey');
    const headers = {};

    headers["Accept"] = "application/json";
    headers["Cache-Control"] = "no-cache";
    headers["Content-Type"] = isMultipart ?
        "multipart/form-data"
        :
        "application/json, text/plain, */*";

    if(apiKey) headers["Authorization"] = "Bearer " + apiKey;

    return headers;
};

export const Request = async (options, onSuccess, onError) => {
    const userType = ls.get('user_info') ? ls.get('user_info').user_type : '';
    const personalAccess = ls.get('personal_office_access');

    const axiosConfig = {
        ...options,
        headers: getHeaders(options.isMultipart),
    };

    if(personalAccess === null && userType === 4) {
        const response = await axios({
            url: '/api/nurseries/nursery/check_office_access',
            headers: getHeaders(options.isMultipart)
        });

        localStorage.setItem('personal_office_access', JSON.stringify(response.data.result));
    }

    return (async() => {
        try {
            const response = await axios(axiosConfig);

            onSuccess(response.data.result);
        } catch (error) {
            if (onError) {
                onError(error);
            }

            if(error.response && error.response.status === 403 && userType === 4) {
                store.dispatch({type: LOGOUT});
                history.replace(LOGIN_URL);
            }
        }
    })();
};

export const PromiseRequest = (data) => new Promise((resolve, reject) => Request(data, resolve, reject));

//Когда перепишем всё на "Request" удалить всё, что ниже
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
                console.error('request.parseJSON: ', e);
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
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}