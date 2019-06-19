import React, {PureComponent} from 'react';
import PropTypes from 'prop-types'
import {Form} from 'formik';
import SubmitButton from "./SubmitButton";
import FormTitle from './FormTitle'
import FormControls from './FormControls'
import {defaultWithFormikEnhanced} from './services'

class FormikFormEnhanced extends PureComponent {
    static propTypes = {
        onSuccess: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        validationSchema: PropTypes.object.isRequired,
        displayName: PropTypes.string,
    };
    static defaultProps = {
        className: "form",
        buttonText: "Отправить",
        storeValues: true,
        storageVariableName: 'FormStoredValues',
        reset: true,
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
            buttonText,
            children,
        } = this.props;

        return (
            <Form className={className}>
                <FormTitle formTitle={formTitle}/>
                {children}
                <FormControls>
                    <SubmitButton>
                        {buttonText}
                    </SubmitButton>
                </FormControls>
            </Form>
        )
    }
}

export default defaultWithFormikEnhanced(FormikFormEnhanced);

