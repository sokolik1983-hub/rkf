import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Formik, Form} from 'formik';
import HttpRequest from 'utils/HttpRequest'
import SubmitButton from "./SubmitButton";
import FormTitle from './FormTitle'
import FormControls from './FormControls'

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
            successAction: this.onSuccess,
            errorAction: this.onErrors
        });
        // Make request
        SubmitRequest.post(values)
    };

    onSuccess = ({status, responseStatus, json, text}) => {
        const {setSubmitting, successAction, reset, handleReset} = this.props;
        successAction(json);
        setSubmitting(false);
        if (reset) {
            handleReset()
        }
    };

    onErrors = ({json}) => {
        const {processErrors} = this.props;
        if (processErrors) {
            const errors = processErrors(json);
            this.setFormErrors(errors)
        }
        this.setFormErrors(json)
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
        const {formInitials} = this.props;
        return formInitials ?
            formInitials
            :
            this.genInitialsFromFields();
    };

    genInitialsFromFields = () => {
        const {fields} = this.props;
        const values = {};
        fields.forEach(field => values[field.name] = field.defaultValue !== undefined ? field.defaultValue : "");
        return values
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
                initialValues={this.getInitials}
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

