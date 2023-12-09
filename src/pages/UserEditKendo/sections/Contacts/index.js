import React, { useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FieldArray, FormElement } from '@progress/kendo-react-form';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormComboBox from 'pages/UserEditKendo/components/FormComboBox';
import FormContactsFieldArray from 'pages/UserEditKendo/components/FormContactsFieldArray';
import FormMaskedInput from 'pages/UserEditKendo/components/FormMaskedInput';
import {
    phoneRequiredValidator,
    phoneValidator,
    emailRequiredValidator,
    emailValidator,
    postcodeValidator,
    lengthValidator
} from 'pages/UserEditKendo/validators';
import './styles.scss';

const Contacts = ({ initialValues, cities, setFormModified, visibilityStatuses, handleSubmit, formBusy }) => {
    const [formProps, setFormProps] = useState(null);

    useEffect(() => {
        formProps && formProps.onFormReset();
    }, [initialValues]);

    return <div className="Contacts">
        <Form
            onSubmit={data => handleSubmit(data, 'contacts')}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormModified(formRenderProps.modified);
                if (!formProps) setFormProps(formRenderProps);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.modified} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className="k-form-fieldset">
                            <legend className="k-form-legend">Контакты</legend>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">Адрес</div>
                                        </div>
                                        <div className="col-md-8">
                                            <Field
                                                id='address_visibility_status_id'
                                                name='address_visibility_status_id'
                                                label=''
                                                component={FormDropDownList}
                                                data={visibilityStatuses.map(s => ({ text: s.name, value: s.id }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row city-and-post">
                                <div className="form-group col-md-8">
                                    <FormComboBox
                                        id='city_id'
                                        name='address.city_id'
                                        label='Город'
                                        placeholder='Город'
                                        component={FormComboBox}
                                        textField='name'
                                        data={cities}
                                        value={formRenderProps.valueGetter('address.city_id')}
                                        onChange={formRenderProps.onChange}
                                        validationMessage="Обязательное поле"
                                        required={true}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <Field
                                        id="postcode"
                                        name="address.postcode"
                                        label="Индекс"
                                        hint="Кол-во цифр: 6-7"
                                        mask="0000000"
                                        component={FormMaskedInput}
                                        validator={postcodeValidator}
                                    />
                                </div>
                            </div>

                            <div className="street-and-house">
                                <div className="form-row">
                                    <div className="form-group col-md-8">
                                        <Field
                                            id="street_name"
                                            name="address.street_name"
                                            label="Улица"
                                            component={FormInput}
                                            maxLength="50"
                                            validator={value => lengthValidator(value, 50)}
                                            placeholder="Улица" />
                                    </div>
                                </div>

                                <div className="form-row form-row__house">
                                    <div className="form-group col-md-4">
                                        <Field
                                            id="house_name"
                                            name="address.house_name"
                                            label="Дом"
                                            component={FormInput}
                                            maxLength="20"
                                            validator={value => lengthValidator(value, 20)}
                                            placeholder="Дом" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Field
                                            id="building_name"
                                            name="address.building_name"
                                            label="Строение"
                                            component={FormInput}
                                            maxLength="20"
                                            validator={value => lengthValidator(value, 20)}
                                            placeholder="Строение" />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <Field
                                            id="flat_name"
                                            name="address.flat_name"
                                            label="Квартира"
                                            component={FormInput}
                                            maxLength="20"
                                            validator={value => lengthValidator(value, 20)}
                                            placeholder="Квартира" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row mt-3">
                                <div className="form-group col-md-8">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">Телефон</div>
                                        </div>
                                        <div className="col-md-8">
                                            <Field
                                                id="phones_visibility_status_id"
                                                name="phones_visibility_status_id"
                                                label=""
                                                component={FormDropDownList}
                                                data={visibilityStatuses.map(s => ({ text: s.name, value: s.id }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FieldArray
                                id="phones"
                                name="phones"
                                component={FormContactsFieldArray}
                                formRenderProps={formRenderProps}
                                valueValidator={phoneValidator}
                                valueRequiredValidator={phoneRequiredValidator}
                            />

                            <div className="form-row mt-3">
                                <div className="form-group col-md-8">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">E-mail</div>
                                        </div>
                                        <div className="col-md-8">
                                            <Field
                                                id="mails_visibility_status_id"
                                                name="mails_visibility_status_id"
                                                label=""
                                                component={FormDropDownList}
                                                data={visibilityStatuses.map(s => ({ text: s.name, value: s.id }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FieldArray
                                id="mails"
                                name="mails"
                                component={FormContactsFieldArray}
                                formRenderProps={formRenderProps}
                                valueValidator={value => emailValidator(value, 100)}
                                valueRequiredValidator={emailRequiredValidator}
                            />

                        </fieldset>
                        <div className="k-form-buttons text-center">
                            <button
                                type="submit"
                                className="k-button k-primary mx-auto"
                                disabled={!formRenderProps.modified || !formRenderProps.valid || formBusy}
                            >Сохранить</button>
                        </div>
                    </FormElement>
                )
            }}
        />
    </div>
};

export default React.memo(Contacts);