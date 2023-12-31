import {isDevEnv} from "./index";
import {SERVER} from 'appConfig'
import {getHeaders} from 'utils/request'

const defaultOptions = {
    headers: getHeaders()
};

export default class HttpRequest {
    /**
     * Initiate an object to run get, post, update, delete fetch
     * when request is finished it watch response status and run success or error callback
     * with {status, responseStatus, json, text} object as param
     * @param  {String} url            Request URL
     * @param  {Object} options        fetch options
     * @param  {String} successAction  Success callback run if request completed and response status is less then 300
     * @param  {String} errorAction    Error callback run if request completed and response status is more then 300
     */
    constructor({
                    url,
                    options = defaultOptions,
                    successAction,
                    errorAction,
                    setErrors,
                }) {
        this.url = isDevEnv() ? SERVER + url : url;
        this.options = options;
        this.status = null;
        this.responseStatus = '';
        this.json = null;
        this.text = null;
        this.successAction = successAction;
        this.errorAction = errorAction;
    }

    request = async ({url = this.url, options}) => {
        const requestOptions = isDevEnv() ?
            {
                ...options,
                mode: "cors"
            }
            :
            options;
        try {

            const response = await fetch(url, requestOptions)
            const {responseStatus, status} = response;
            this.responseStatus = responseStatus;
            this.status = status;
            const content = await response.text();
            this.getResponseContent(content);
            this.checkRequestErrors()
        } catch (e) {
            console.error('RequestError: ', e)
        }
    };


    checkRequestErrors = () => {
        const {status, responseStatus, json, text} = this;
        // call success or error action based on response status
        const action = (status >= 200 && status < 300) ? this.successAction : this.errorAction;
        action({status, responseStatus, json, text})
    };


    getResponseContent = text => {
        // If no content
        try {
            this.json = JSON.parse(text)
        } catch (error) {
            if (error.name === 'SyntaxError') {
                this.text = text;
                console.error('Non JSON response: ', text)
            } else {
                throw error
            }
        }
        // no got response content so run check errors based on response status
        this.checkRequestErrors()
    };

    getRequestBody = data => {
        return JSON.stringify(data)
    };

    get = (data) => {
        const options = {...this.options};
        options.method = "GET";
        this.request({options})
    };

    post = (data) => {
        const options = {...this.options};
        options.method = "POST";
        options.body = this.getRequestBody(data);
        this.request({options})
    };

    update = (data) => {
        const options = {...this.options};
        options.method = "UPDATE";
        options.body = this.getRequestBody(data);
        this.request({options})
    };

    delete = () => {
        const options = {...this.options};
        options.method = "DELETE";
        this.request({options})
    }
}
