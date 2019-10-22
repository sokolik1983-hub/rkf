import React, {useCallback} from 'react';
import {array, element, func, object, oneOf, oneOfType, string} from 'prop-types';
import axios from "axios";
import classnames from 'classnames'
import {Formik} from 'formik';
import {getHeaders} from "../../utils/request";
import {HTTP} from "appConfig";
import {Request} from '../../utils/request';

const getFormData = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key],));
    return formData;
};

/**
 * Functional component encapsulate Formik functionality and form submit request.
 * @param {string} method POST if create, PUT/UPDATE if Update
 * @param {string}  action an Url for request
 * @param {string} format "multipart/form-data" or undefined for JSON request
 * @param {function} transformValues takes values and return let's say {...values, some_additional_value}
 * @param {object} validationSchema yup validation schema
 * @param {object} initialValues initial form state
 * @param {function} onSuccess takes response data as argument performed when form successfully submitted
 * @param {string} className
 * @param {any} children
 */
function Form({
                  method,
                  action,
                  format,
                  transformValues,
                  validationSchema,
                  initialValues,
                  onSuccess,
                  className,
                  children,
                  bindSubmitForm
              }) {
    const isMultipartData = format === "multipart/form-data";
    const formatData = useCallback((values) => {
        const data = transformValues(values);
        return isMultipartData ?
            getFormData(data)
            :
            JSON.stringify(data);
    });

    const onSubmit = (values, actions) => {
        const onRequestSuccess = (data) => {
            onSuccess(data);
            if (bindSubmitForm) bindSubmitForm.getErrors({});
            actions.setSubmitting(false);
        };
        const onRequestError = (error) => {
            actions.setSubmitting(false);
            if (error.isAxiosError) {
                const {data} = error.response;
                actions.setErrors(data.errors);
                if (bindSubmitForm) bindSubmitForm.getErrors(data.errors);
            } else {
                throw error
            }
        };
        const options = {
            url: action,
            method,
            data: formatData(values),
            isMultipart: isMultipartData
        };

        Request(options, onRequestSuccess, onRequestError);
    };

    // const onSubmit = useCallback(
    //     async (values, actions) => {
    //         try {
    //             // Perform request
    //             const {data} = await axios({
    //                 url: action,
    //                 method: method,
    //                 data: formatData(values),
    //                 headers: getHeaders(isMultipartData),
    //             });
    //
    //             onSuccess(data.result);
    //             if(bindSubmitForm) bindSubmitForm.getErrors({});
    //             actions.setSubmitting(false);
    //         } catch (error) {
    //             actions.setSubmitting(false);
    //
    //             if (error.isAxiosError) {
    //                 const {data} = error.response;
    //                 actions.setErrors(data.errors);
    //                 if(bindSubmitForm) bindSubmitForm.getErrors(data.errors);
    //             } else {
    //                 throw error
    //             }
    //         }
    //     }
    // );

    Object.keys(initialValues).forEach(key => {
        if(initialValues[key] === null) initialValues[key] = '';
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={({handleSubmit, submitForm, errors}) => {
                if(bindSubmitForm) bindSubmitForm.submit(submitForm, errors);
                return (
                    <form className={classnames('Form', {[className]: className})} onSubmit={handleSubmit}>
                        {children}
                    </form>
                )
            }}
        />
    )
}

Form.propTypes = {
    method: oneOf([HTTP.post, HTTP.update]).isRequired,
    action: string.isRequired,
    format: string,
    transformValues: func,
    validationSchema: object,
    initialValues: object.isRequired,
    onSuccess: func.isRequired,
    className: string,
    children: oneOfType([element, array]).isRequired,
};

Form.defaultProps = {
    method: HTTP.post,
    initialValues: {},
    transformValues: values => (values)
};

export default React.memo(Form)

