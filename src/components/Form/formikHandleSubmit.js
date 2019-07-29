import {isDevEnv} from "utils/index";
import {SERVER} from "appConfig";
import {getHeaders} from "utils/request";
import axios from 'axios'

const isDev = isDevEnv();

const defaultOptions = (isMultipart) => isDev ? {
        headers: getHeaders(isMultipart),
        mode: "cors"
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
                                             isMultipart,
                                             isUpdate,
                                             url, // POST Url
                                             options,
                                             data, // Form data
                                             successAction, // called with response JSON
                                             formik,
                                             storageVariableName
                                         }) {
    let text; // define text to be available in catch
    // Block Form
    //formik.setSubmitting(true);
    const requestOptions = {...defaultOptions(isMultipart), ...options};
    requestOptions.method = isUpdate ? "PUT" : "POST";
    const body = isMultipart ? getFormData(data) : JSON.stringify(data);


    const requestUrl = isDev ? `${SERVER}${url}` : url;
    try {
        const response = await axios.post(requestUrl, body, requestOptions);
        const {status, data} = response;
        if (status >= 200 && status < 300) {
            successAction(data.result);
            // clear stored formData
            localStorage.removeItem(storageVariableName);
            formik.setSubmitting(false);
        } else {
            const touched = {};
            Object.keys(data.errors).forEach(key => touched[key] = true);
            //TODO Handle this in future
            //formik.setTouched(touched);
            formik.setErrors(data.errors);
            formik.setSubmitting(false);
        }
        return {response}

    } catch (error) {
        formik.setSubmitting(false);
        if (error.name === "SyntaxError") {
            console.error("formikHandleSubmit JSON.parse(text): ", error, text);
            alert('formikHandleSubmit JSON.parse(text): \n see response text in console');

        } else if (error.name === "TypeError" && error.message === "Failed to fetch") {
            alert('Ошибка соединения\n Internet connection error');
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