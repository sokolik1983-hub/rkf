import React from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FieldArray, FormElement } from '@progress/kendo-react-form';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormComboBox from 'pages/UserEditKendo/components/FormComboBox';
import FormContactsFieldArray from 'pages/UserEditKendo/components/FormContactsFieldArray';
import { phoneValidator, emailValidator, numbersOnlyValidator } from 'pages/UserEditKendo/validators';
import './styles.scss';



const Contacts = ({ initialValues, cities, setFormTouched, visibilityStatuses }) => {
    const handleSubmit = (dataItem) => console.log((JSON.stringify(dataItem, null, 2)));
    return <div className="Contacts">
        <Form
            onSubmit={handleSubmit}
            initialValues={initialValues}
            render={(formRenderProps) => {
                setFormTouched(formRenderProps.touched);
                return (
                    <FormElement style={{ maxWidth: 550 }} >
                        <Prompt when={formRenderProps.touched} message="Вы уверены, что хотите покинуть эту страницу? Все несохраненные изменения будут потеряны." />
                        <fieldset className={'k-form-fieldset'}>
                            <legend className={'k-form-legend'}>Контакты</legend>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">Адрес</div>
                                        </div>
                                        <div className="col-md-8">
                                            <Field
                                                id={'address_visibility_status_id'}
                                                name={'personal_information.address_visibility_status_id'}
                                                label={''}
                                                component={FormDropDownList}
                                                data={visibilityStatuses.map(s => ({ text: s.name, value: s.id }))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <FormComboBox
                                        id={'city_id'}
                                        name={'address.city_id'}
                                        label={'Город'}
                                        component={FormComboBox}
                                        textField={'name'}
                                        data={cities}
                                        value={formRenderProps.valueGetter('address.city_id')}
                                        onChange={formRenderProps.onChange}
                                        required={true}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <Field id="postcode" name={'address.postcode'} label={'Индекс'} component={FormInput} validator={numbersOnlyValidator} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <Field id="street_name" name={'address.street_name'} label={'Улица'} component={FormInput} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <Field id="house_name" name={'address.house_name'} label={'Дом'} component={FormInput} />
                                </div>
                                <div className="form-group col-md-4">
                                    <Field id="building_name" name={'address.building_name'} label={'Строение'} component={FormInput} />
                                </div>
                                <div className="form-group col-md-4">
                                    <Field id="flat_name" name={'address.flat_name'} label={'Квартира'} component={FormInput} />
                                </div>
                            </div>

                            <div className="form-row mt-3">
                                <div className="form-group col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">Телефон</div>
                                        </div>
                                        <div className="col-md-8">
                                            <Field
                                                id={'phones_visibility_status_id'}
                                                name={'personal_information.phones_visibility_status_id'}
                                                label={''}
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
                            />

                            <div className="form-row mt-3">
                                <div className="form-group col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">E-mail</div>
                                        </div>
                                        <div className="col-md-8">
                                            <Field
                                                id={'mails_visibility_status_id'}
                                                name={'personal_information.mails_visibility_status_id'}
                                                label={''}
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
                                valueValidator={emailValidator}
                            />

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

export default React.memo(Contacts);