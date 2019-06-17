import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Formik, Form} from 'formik';
import HttpRequest from 'utils/HttpRequest'
import SubmitButton from "./SubmitButton";
import FormTitle from './FormTitle'
import FormControls from './FormControls'
import {getFormInitialValues} from './services'

class DynamicForm extends Component {

    static propTypes = {
        //formSubmit: PropTypes.func.isRequired,
        //fields: PropTypes.array.isRequired,
        validationSchema: PropTypes.object,
        displayName: PropTypes.string,
        buttonText: PropTypes.string,
    };

    static defaultProps = {
        className: "form",
        buttonText: "Ok",
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

    onSubmit = (values, actions) => {
        const {formAction} = this.props;
        const {setSubmitting} = actions;
        // blocking form
        setSubmitting(true);
        //Configure Request
        const SubmitRequest = new HttpRequest({
            url: formAction,
            successAction: ({status, responseStatus, json, text}) => this.onSuccess(actions, {
                status,
                responseStatus,
                json,
                text
            }),
            errorAction: ({status, responseStatus, json, text}) => this.onErrors(actions, {
                status,
                responseStatus,
                json,
                text
            })
        });
        // Make request
        SubmitRequest.post(values)
    };

    onSuccess = (actions, {status, responseStatus, json, text}) => {
        const {successAction, reset} = this.props;
        const {setSubmitting, resetForm} = actions;
        successAction(json);
        setSubmitting(false);
        this.clearStoredValues();
        if (reset) {
            resetForm()
        }
    };

    clearStoredValues = () => {
        localStorage.removeItem(this.props.storageVariableName)
    }

    onErrors = (actions, {status, responseStatus, json, text}) => {
        const {processErrors} = this.props;
        const {setSubmitting} = actions;
        if (processErrors) {
            const errors = processErrors(json);
            this.setFormErrors(errors);
            setSubmitting(false);
            return
        }
        this.setFormErrors(json);
        setSubmitting(false);
    };

    setFormErrors = errors => {
        const {setErrors, setTouched} = this.props;
        // create touched object on based on error fields
        const touched = {};
        Object.keys(errors).forEach(key => touched[key] = true);

        setTouched(touched);
        setErrors(errors)
    };

    getInitials = () => {
        return getFormInitialValues(this.props)
    };


    render() {
        const {
            className,
            formTitle,
            buttonText,
            children,
            validationSchema
        } = this.props;

        return (
            <Formik
                initialValues={this.getInitials()}
                onSubmit={this.onSubmit}
                validationSchema={validationSchema}
                render={(props) =>
                    <Form className={className}>
                        <FormTitle formTitle={formTitle}/>

                        {children}

                        <FormControls>
                            <SubmitButton>
                                {buttonText}
                            </SubmitButton>
                        </FormControls>
                    </Form>}
            />
        )
    }
}

export default DynamicForm;

