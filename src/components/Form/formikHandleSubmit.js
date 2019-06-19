import {isDevEnv} from "utils/index";
import {SERVER} from "appConfig";
import {getHeaders} from "utils/request";

const isDev = isDevEnv();

const defaultOptions = isDev ? {
        method: "POST",
        headers: getHeaders(),
        mode: "cors"
    }
    :
    {
        method: "POST",
        headers: getHeaders(),
    };


export async function formikHandleSubmit({
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
        console.log('moving on', formik);
        const requestUrl = isDev ? `${SERVER}${url}` : url;
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
            //TODO Handle this in future
            //formik.setTouched(touched);
            formik.setErrors(json);
            formik.setSubmitting(false);
        }
        return {json, status, text,}

    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error("formikHandleSubmit JSON.parse(text): ", error, text);
            alert('formikHandleSubmit JSON.parse(text): \n see response text in console');
        } else {
            console.error("formikHandleSubmit Unknown Error: ", error);
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