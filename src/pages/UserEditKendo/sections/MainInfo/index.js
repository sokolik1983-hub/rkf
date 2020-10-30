import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import FormDatePicker from 'pages/UserEditKendo/components/FormDatePicker';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import { nameRequiredValidator, nameValidator } from "../../validators";
import './styles.scss';

const MainInfo = ({ initialValues, setFormModified, visibilityStatuses, handleSubmit }) => {
    const [formProps, setFormProps] = useState(null);
    const [formBusy, setFormBusy] = useState(false);

    useEffect(() => {
        formProps && formProps.onFormReset();
        setFormBusy(false);
    }, [initialValues]);

    return <div className="MainInfo">
        <Form
            onSubmit={data => { setFormBusy(true); handleSubmit(data, 'general') }}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormModified(formRenderProps.modified)
                if (!formProps) setFormProps(formRenderProps);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.modified} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend'}>Основная информация</legend>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field id="first_name" name={'first_name'} label={'Имя'} component={FormInput} maxLength="100" validator={value => nameRequiredValidator(value, 100)} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field id="last_name" name={'last_name'} label={'Фамилия'} component={FormInput} maxLength="100" validator={value => nameRequiredValidator(value, 100)} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field id="second_name" name={'second_name'} label={'Отчество'} component={FormInput} maxLength="100" validator={value => nameValidator(value, 100)} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Field
                                        id="birth_date"
                                        name={'birth_date'}
                                        label={'Дата рождения'}
                                        min={new Date('1900')}
                                        max={new Date()}
                                        component={FormDatePicker}
                                    />
                                </div>
                                <div className="form-group col-md-6 no-label-field">
                                    <Field
                                        id={'birth_date_visibility_status_id'}
                                        name={'birth_date_visibility_status_id'}
                                        component={FormDropDownList}
                                        data={visibilityStatuses.map(s => ({ text: s.name, value: s.id }))}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Field
                                        id={'sex_type_id'}
                                        name={'sex_type_id'}
                                        label={'Пол'}
                                        component={FormDropDownList}
                                        data={[{ text: 'Не выбран', value: '', id: null }, { text: 'Мужской', value: 1, id: 1 }, { text: 'Женский', value: 2, id: 2 },]}
                                    />
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

export default React.memo(MainInfo);