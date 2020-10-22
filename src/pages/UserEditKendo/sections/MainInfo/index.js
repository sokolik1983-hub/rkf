import React from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import FormDatePicker from 'pages/UserEditKendo/components/FormDatePicker';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import { requiredValidator } from 'pages/UserEditKendo/validators';
import './styles.scss';

const MainInfo = ({ initialValues, setFormTouched }) => {
    const handleSubmit = (dataItem) => console.log(JSON.stringify(dataItem, null, 2));
    return <div className="MainInfo">
        <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormTouched(formRenderProps.touched);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.touched} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend'}>Основная информация</legend>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field id="first_name" name={'personal_information.first_name'} label={'Имя'} component={FormInput} validator={requiredValidator} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field id="last_name" name={'personal_information.last_name'} label={'Фамилия'} component={FormInput} validator={requiredValidator} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <Field id="second_name" name={'personal_information.second_name'} label={'Отчество'} component={FormInput} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Field
                                        id="birth_date"
                                        name={'personal_information.birth_date'}
                                        label={'Дата рождения'}
                                        component={FormDatePicker}
                                        validator={requiredValidator}
                                    />
                                </div>
                                <div className="form-group col-md-6 no-label-field">
                                    <Field
                                        id={'is_hidden'}
                                        name={'personal_information.is_hidden'}
                                        component={FormDropDownList}
                                        data={[{ text: 'Показать всем', value: false, id: 1 }, { text: 'Скрыть от всех', value: true, id: 2 },]}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <Field
                                        id={'sex_type_id'}
                                        name={'personal_information.sex_type_id'}
                                        label={'Пол'}
                                        component={FormDropDownList}
                                        data={[{ text: 'Не выбран', value: null, id: 0 }, { text: 'Мужской', value: 1, id: 1 }, { text: 'Женский', value: 2, id: 2 },]}
                                    />
                                </div>
                            </div>
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

export default React.memo(MainInfo);