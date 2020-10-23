import React from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FieldArray, FormElement } from '@progress/kendo-react-form';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormEditorTextarea from 'pages/UserEditKendo/components/FormEditorTextarea';
import FormContactsFieldArray from 'pages/UserEditKendo/components/FormContactsFieldArray';
import { phoneValidator, emailValidator, numbersOnlyValidator } from 'pages/UserEditKendo/validators';
import './styles.scss';



const About = ({ initialValues, cities, setFormTouched, visibilityStatuses }) => {
    const handleSubmit = (dataItem) => console.log((JSON.stringify(dataItem, null, 2)));
    return <div className="About">
        <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormTouched(formRenderProps.touched);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.touched} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend'}>О себе</legend>

                            <Field
                                id="description"
                                name="personal_information.description"
                                component={FormEditorTextarea}
                            />
                            {/* <FieldArray
                                id="phones"
                                name="phones"
                                component={FormContactsFieldArray}
                                formRenderProps={formRenderProps}
                                valueValidator={phoneValidator}
                            /> */}

                        </fieldset>
                        <div className="k-form-buttons text-center">
                            <button
                                type={'submit'}
                                className="k-button mx-auto"
                                disabled={!formRenderProps.allowSubmit}
                            >Сохранить</button>
                        </div>
                    </FormElement>
                )
            }}
        />
    </div>
};

export default React.memo(About);