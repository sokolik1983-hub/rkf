import React from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FieldArray, FormElement } from '@progress/kendo-react-form';
import FormEditorTextarea from 'pages/UserEditKendo/components/FormEditorTextarea';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import { urlValidator } from 'pages/UserEditKendo/validators';
import FormSocialsFieldArray from 'pages/UserEditKendo/components/FormSocialsFieldArray';
import './styles.scss';

const About = ({ initialValues, cities, setFormTouched, visibilityStatuses, handleSubmit }) => {
    
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
                                label="Описание"
                                component={FormEditorTextarea}
                            />
                            <label className="k-label">Ссылки на социальные сети</label>

                            <FieldArray
                                id="social_networks"
                                name="social_networks"
                                component={FormSocialsFieldArray}
                                formRenderProps={formRenderProps}
                                valueValidator={urlValidator}
                            />

                            <label className="k-label">Ссылка на сайт</label>
                            <div className="form-row" >
                                <div className="form-group col-md-7">
                                    <Field id="web_site" name={'web_site'} placeholder="Введите ссылку на сайт" component={FormInput} validator={urlValidator} />
                                </div>
                                <div className="form-group col-md-1 About__custom-trash">
                                    <span onClick={() => formRenderProps.onChange("web_site", { value: "" })} className="k-icon k-i-trash" />
                                </div>
                            </div>
                        </fieldset>
                        <div className="k-form-buttons text-center">
                            <button
                                type={'submit'}
                                className="k-button k-primary mx-auto"
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