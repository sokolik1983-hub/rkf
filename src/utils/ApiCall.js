// SuccessCallBack
// ErrorsCallBack
const defaultOptions = {
    method: "GET",
    headers: {}
};

export default class Request {
    constructor({
                    url,
                    options = defaultOptions,
                    successAction,
                    errorAction
                }) {
        this.url = url;
        this.options = options;
        this.statusCode = null;
        this.statusText = '';
        this.json = null;
        this.text = null;
        this.successAction = successAction;
        this.errorAction = errorAction;
    }

    request = ({url = this.url, options}) => {
        fetch(url, options)
            .then(this.processResponse)
            .catch(this.processFetchErrors)
    };

    processResponse = response => {
        // get status
        this.statusText = response.responseStatus;
        this.statusCode = response.status;
        if (this.checkNoContent()) {
            const {statusCode, statusText, json, text} = this;
            this.successAction({
                statusCode, statusText, json, text
            })
        } else {
            response.text()
            // get response text and try to parse JSON
                .then(this.getResponseContent)
                // TODO Watch this moment in future
                .catch(e => console.log('processResponse', e))
        }
    };

    checkRequestErrors = () => {
        const {statusCode, statusText, json, text} = this;
        const action = (statusCode >= 200 && statusCode < 300) ? this.successAction : this.errorAction;
        action({statusCode, statusText, json, text})
    };

    processFetchErrors = error => {
        console.log('processFetchErrors', error)
    };

    checkNoContent = () => {
        return this.statusCode === 204 || this.statusCode === 205;
    };

    getResponseContent = text => {
        // If no content
        try {
            this.json = JSON.parse(text)
        } catch (error) {
            if (error.name === 'SyntaxError') {
                this.text = text;
                console.log('processResponseContent: Non JSON response', text)
            } else {
                throw error
            }
        }

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