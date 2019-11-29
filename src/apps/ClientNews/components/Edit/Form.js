import React from 'react';
import { array, element, func, object, oneOf, oneOfType, string } from 'prop-types';
import classnames from 'classnames'
import { Formik } from 'formik';
import { HTTP } from "appConfig";
function Form({
    validationSchema,
    initialValues,
    className,
    children,
    bindSubmitForm,
    callback
}) {

    const onSubmit = (values) => {
        callback(values);
    };

    Object.keys(initialValues).forEach(key => {
        if (initialValues[key] === null) initialValues[key] = '';
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            render={({ handleSubmit, submitForm, errors }) => {
                if (bindSubmitForm) bindSubmitForm.submit(submitForm, errors);
                return (
                    <form className={classnames('Form', { [className]: className })} onSubmit={handleSubmit}>
                        {children}
                    </form>
                )
            }}
        />
    )
}

Form.propTypes = {
    method: oneOf([HTTP.post, HTTP.update]).isRequired,
    format: string,
    transformValues: func,
    validationSchema: object,
    initialValues: object.isRequired,
    className: string,
    children: oneOfType([element, array]).isRequired,
};

Form.defaultProps = {
    method: HTTP.post,
    initialValues: {},
    transformValues: values => (values)
};

export default React.memo(Form)

