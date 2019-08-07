import {isDevEnv} from "utils/index";
import {SERVER} from "appConfig";
import {getHeaders} from "utils/request";
import axios from 'axios'

const isDev = isDevEnv();

const defaultOptions = (isMultipart) => isDev ? {
        headers: getHeaders(isMultipart),
    }
    :
    {
        headers: getHeaders(isMultipart),
    };

const getFormData = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key],));
    return formData;
};


export async function formikHandleSubmit({
                                             isMultipart = false,
                                             isUpdate,
                                             url, // POST Url
                                             data, // Form data
                                             successAction, // called with response JSON
                                             formik,
                                             storageVariableName
                                         }) {
    // Configure request
    const config = {
        url: isDev ? `${SERVER}${url}` : url,
        method: isUpdate ? "PUT" : "POST",
        data: isMultipart ? getFormData(data) : JSON.stringify(data),
        headers: getHeaders(isMultipart),
    };

    if (isDev) {
        config.crossDomain = true
    }

    try {
        // Perform request
        const response = await axios(config);
        const {data} = response;

        successAction(data.result);
        // clear stored formData (request success we don't need it anymore)
        localStorage.removeItem(storageVariableName);
        formik.setSubmitting(false);
        return {response}

    } catch (error) {
        formik.setSubmitting(false);
        if (error.isAxiosError) {
            const {data} = error.response;
            const touched = {};
            Object.keys(data.errors).forEach(key => touched[key] = true);
            //TODO Handle this in future
            //formik.setTouched(touched);
            formik.setErrors(data.errors);
            formik.setSubmitting(false);
            return {response: error.response}
        } else {
            throw error
        }
    }
}

export async function formikHandleSubmit2({
                                              url, // POST Url
                                              options = defaultOptions,
                                              data, // Form data
                                              successAction, // called with response JSON
                                              formik,
                                              storageVariableName
                                          }) {
    let text; // define text to be avalible in catch
    // Block Form
    //formik.setSubmitting(true);
    try {
        console.log('moving on');
        const requestUrl = isDevEnv() ? `${SERVER}${url}` : url;
        const response = await fetch(requestUrl, {
            ...options,
            body: data && JSON.stringify(data) // no data if method isn't POST
        });
        const {status} = response;

        text = await response.text();

        const json = JSON.parse(text);
        if (status >= 200 && status < 300) {
            successAction(json);
            // clear stored formData
            localStorage.removeItem(storageVariableName);
            formik.setSubmitting(false);
        } else {
            const touched = {};
            Object.keys(json).forEach(key => touched[key] = true);
            formik.setTouched(touched);
            formik.setErrors(json);
            formik.setSubmitting(false);
        }
        return {json, status, text,}

    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error("FormSaveAsync JSON.parse(text): ", error, text);
            alert('FormSaveAsync JSON.parse(text): \n see response text in console');
        } else {
            console.error("FormSaveAsync Unknown Error: ", error);
        }
    }
}