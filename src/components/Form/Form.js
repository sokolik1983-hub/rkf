import React, {useMemo, useCallback} from 'react';
import {string, func, object, element, array, oneOf, oneOfType} from 'prop-types';
import axios from "axios";
import classnames from 'classnames'
import {Formik} from 'formik';
import {getHeaders} from "../../utils/request";
import {HTTP} from "appConfig";


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
              }) {
    const isMultipartData = format === "multipart/form-data";
    const formatData = useCallback((values) => {
        const data = transformValues(values);
        return isMultipartData ?
            new FormData(data)
            : JSON.stringify(data);
    });

    const onSubmit = useCallback(
        async (values, actions) => {
            try {
                // Perform request
                const {data} = await axios({
                    url: action,
                    method: method,
                    data: formatData(values),
                    headers: getHeaders(isMultipartData),
                });

                onSuccess(data);

                actions.setSubmitting(false);

            } catch (error) {
                actions.setSubmitting(false);
                if (error.isAxiosError) {
                    const {data} = error.response;
                    actions.setErrors(data);
                } else {
                    throw error
                }
            }
        }
    );
    return useMemo(() =>
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={({handleSubmit}) => (
                <form className={classnames('Form', {[className]: className})} onSubmit={handleSubmit}>
                    {children}
                </form>
            )
            }
        />, []
    )
}

Form.propTypes = {
    method: oneOf([HTTP.post, HTTP.update]).isRequired,
    action: string.isRequired,
    format: string,
    transformValues: func,
    validationSchema: func,
    initialValues: object.isRequired,
    onSuccess: func.isRequired,
    className: string,
    children: oneOfType([element, array]).isRequired,
};

Form.defaultProps = {
    method: HTTP.post,
    transformValues: values => (values)
};

export default Form

