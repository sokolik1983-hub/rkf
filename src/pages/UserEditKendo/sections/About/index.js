import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FieldArray, FormElement } from '@progress/kendo-react-form';
import FormEditorTextarea from 'pages/UserEditKendo/components/FormEditorTextarea';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import { urlValidator } from 'pages/UserEditKendo/validators';
import FormSocialsFieldArray from 'pages/UserEditKendo/components/FormSocialsFieldArray';
import './styles.scss';

const About = ({ initialValues, setFormTouched, handleSubmit }) => {
    const [formProps, setFormProps] = useState(null);
    const [formBusy, setFormBusy] = useState(false);

    useEffect(() => {
        formProps && formProps.onFormReset();
    }, [initialValues]);

    return <div className="About">
        <Form
            onSubmit={data => { setFormBusy(true); handleSubmit(data, 'about') }}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormTouched(formRenderProps.touched);
                if (!formProps) setFormProps(formRenderProps);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.touched} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend mb-0'}>О себе</legend>
                            <Field
                                id="description"
                                name="description"
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
                                    <Field id="web_site" name={'web_site'} placeholder="Введите ссылку на сайт" component={FormInput} maxLength="150" validator={urlValidator} />
                                </div>
                            </div>
                        </fieldset>
                        <div className="k-form-buttons text-center">
                            <button
                                type={'submit'}
                                className="k-button k-primary mx-auto"
                                disabled={!formRenderProps.allowSubmit || formBusy}
                            >Сохранить</button>
                        </div>
                    </FormElement>
                )
            }}
        />
    </div>
};

export default React.memo(About);