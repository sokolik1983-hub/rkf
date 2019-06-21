import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import {Form} from 'formik';
import FormTitle from './FormTitle'
import {defaultWithFormikEnhanced} from './services'

class FormikFormEnhanced extends PureComponent {
    static propTypes = {
        onSuccess: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        validationSchema: PropTypes.object.isRequired,
        displayName: PropTypes.string,
        isUpdate: PropTypes.bool,
    };
    static defaultProps = {
        className: "form",
        buttonText: "Отправить",
        storeValues: true,
        storageVariableName: 'FormStoredValues',
        reset: true,
        isUpdate: false
    };

    componentWillUnmount() {
        // Save input before success submit
        const {storeValues, values, storageVariableName} = this.props;
        if (storeValues) {
            localStorage.setItem(storageVariableName, JSON.stringify(values))
        }
    };


    render() {
        const {
            className,
            formTitle,
            children,
        } = this.props;

        return (
            <Form className={className}>
                <FormTitle formTitle={formTitle}/>
                {children}
            </Form>
        )
    }
}

export default defaultWithFormikEnhanced(FormikFormEnhanced);

