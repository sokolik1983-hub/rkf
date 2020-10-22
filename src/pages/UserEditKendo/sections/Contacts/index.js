import React from "react";
import { Prompt } from "react-router-dom";
import { Form, Field, FieldArray, FormElement } from '@progress/kendo-react-form';
import FormDropDownList from 'pages/UserEditKendo/components/FormDropDownList';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormComboBox from 'pages/UserEditKendo/components/FormComboBox';
import { numbersOnlyValidator } from 'pages/UserEditKendo/validators';
import './styles.scss';

import { Error } from '@progress/kendo-react-labels';
import { Input } from '@progress/kendo-react-inputs';
import { Checkbox } from '@progress/kendo-react-inputs';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';

import { FieldWrapper } from '@progress/kendo-react-form';
import { Label } from '@progress/kendo-react-labels';



const commandCell = (onRemove) => (props) => {
    const onClick = React.useCallback(
        (e) => {
            e.preventDefault();
            onRemove(props);
        },
        [onRemove]
    );
    return (
        <td>
            <button
                className="k-button k-grid-remove-command"
                onClick={onClick}
            >
                Remove
            </button>
        </td>
    );
};

const FormGrid = (fieldArrayRenderProps) => {
    const { validationMessage, visited } = fieldArrayRenderProps;
    const onAdd = React.useCallback(
        (e) => {
            e.preventDefault();
            fieldArrayRenderProps.onUnshift({ value: { name: '' } });
        },
        [fieldArrayRenderProps.onUnshift]
    );
    const onRemove = React.useCallback(
        (cellProps) => fieldArrayRenderProps.onRemove({ index: cellProps.dataIndex }),
        [fieldArrayRenderProps.onRemove]
    );

    const handleChange = React.useCallback(
        (cellProps) => {
            console.log(cellProps);
            return fieldArrayRenderProps.onChange({ name: cellProps.name, value: cellProps.value })
        },
        [fieldArrayRenderProps.onRemove]
    );

    const nameCell = (props) => {
        return (
            <td>
                <Field
                    component={Input}
                    name={`users[${props.dataIndex}].${props.field}`}
                />
            </td>
        );
    };


    const FormCheckbox = (fieldRenderProps) => {
        const { validationMessage, touched, id, valid, disabled, hint, optional, label, visited, modified, ...others } = fieldRenderProps;

        const showValidationMessage = touched && validationMessage;
        const errorId = showValidationMessage ? `${id}_error` : '';

        return (
            <FieldWrapper>
                <Checkbox
                    ariaDescribedBy={`${errorId}`}
                    label={label}
                    labelOptional={optional}
                    valid={valid}
                    id={id}
                    disabled={disabled}
                    {...others}
                />
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </FieldWrapper>
        );
    };



    return (<>
        {
            visited && validationMessage &&
            (<Error>{validationMessage}</Error>)
        }
        {
            fieldArrayRenderProps.value && fieldArrayRenderProps.value.map((v, i) => {
                return <div className="form-row" key={i}>
                    <div className="form-group col-md-1 Contacts__custom-plus">
                        {i === fieldArrayRenderProps.value.length - 1 && <button className="k-button k-grid-remove-command" onClick={onAdd}>
                            <span className="k-icon k-i-plus"></span>
                        </button>}
                    </div>
                    <div className="form-group col-md-4">
                        <Field name={`contacts[${i}].value`} component={FormInput} validator={numbersOnlyValidator} />
                    </div>
                    <div className="form-group col-md-4">
                        <Field name={`contacts[${i}].description`} component={FormInput} />
                    </div>
                    <div className="form-group col-md-2">
                        {i === 0 && <div className="Contacts__custom-checkbox-label">Основной</div>}
                        <div className="Contacts__custom-checkbox">
                            <Field
                                id={`contacts[${i}]`}
                                name={`contacts[${i}].is_main`}
                                component={FormCheckbox}
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-1 Contacts__custom-trash">
                        <span onClick={onRemove} className="k-icon k-i-trash" />
                    </div>
                </div>
            })
        }
    </>
    );
};



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
                            <FieldArray
                                name="contacts"
                                component={FormGrid}
                                onChange={formRenderProps.onChange}
                            //validator={arrayLengthValidator}
                            />

                            <div className="form-row mt-3">
                                <div className="form-group col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="Contacts__custom-label">E-mail</div>
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
                            <FieldArray
                                name="contacts"
                                component={FormGrid}
                                onChange={formRenderProps.onChange}
                            //validator={arrayLengthValidator}
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