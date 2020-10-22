import React from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormComboBox from 'pages/UserEditKendo/components/FormComboBox';
import { numbersOnlyValidator } from 'pages/UserEditKendo/validators';

import './styles.scss';

const Contacts = ({ initialValues, cities, setFormTouched }) => {
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
                                                id={'is_hidden'}
                                                name={'personal_information.is_hidden'}
                                                label={''}
                                                component={FormDropDownList}
                                                data={[{ text: 'Показать всем', value: false, id: 1 }, { text: 'Скрыть от всех', value: true, id: 2 },]}
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
                                                id={'is_hidden'}
                                                name={'personal_information.is_hidden'}
                                                label={''}
                                                component={FormDropDownList}
                                                data={[{ text: 'Показать всем', value: false, id: 1 }, { text: 'Скрыть от всех', value: true, id: 2 },]}
                                            />
                                        </div>
                                    </div>
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

export default React.memo(Contacts);