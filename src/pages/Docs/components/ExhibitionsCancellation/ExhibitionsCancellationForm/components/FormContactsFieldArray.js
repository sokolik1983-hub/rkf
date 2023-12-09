import React from "react";
import { Field } from '@progress/kendo-react-form';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormMaskedInput from 'pages/UserEditKendo/components/FormMaskedInput';
import FormContactsRadioButton from 'pages/UserEditKendo/components/FormContactsRadioButton';
import { Error } from '@progress/kendo-react-labels';
import { lengthValidator } from "components/kendo/Form/validators";
import { phoneMask } from 'pages/UserEditKendo/config';

const FormContactsFieldArray = (fieldArrayRenderProps) => {
    const { validationMessage, visited, id, value, onRemove, onPush, valueRequiredValidator, formRenderProps } = fieldArrayRenderProps;
    const newItem = { "is_main": false, "value": "", "description": "" };
    const valuesArray = formRenderProps.valueGetter(id);

    !value.length && value.push({ "is_main": true, "value": "", "description": "" });

    const isArrayValid = !value.filter((v, index) => formRenderProps.errors[`${id}[${index}].value`]).length;

    const handleAdd = (index) => {
        valuesArray[index].value && valuesArray[index].value !== phoneMask && isArrayValid && onPush({ value: newItem });
    }

    const handleRemove = (item, id, index) => {
        onRemove({ index: index });
        if (item.is_main && valuesArray.length) {
            valuesArray.map(v => v.is_main = false);
            formRenderProps.onChange(`${id}[0].is_main`, { value: true })
        }
        value.length === 1 && onPush({ value: newItem });
    }

    const handleChange = (name) => {
        valuesArray.map(v => v.is_main = false);
        formRenderProps.onChange(name, { value: true })
    }

    return <>
        {
            value?.map((item, index) => <div className="form-row mb-2" key={index}>
                <div className="form-row col-12 col-md-3">
                    <div className="col-md-2 d-none d-sm-block">
                        <div className="Contacts__custom-plus">
                            {index === value.length - 1 && valuesArray.length < 5 && <div onClick={() => handleAdd(index)}>
                                <span
                                    className={valuesArray[index].value && valuesArray[index].value !== phoneMask && isArrayValid
                                        ? "k-icon k-i-plus-circle"
                                        : "k-icon k-i-plus-circle k-icon-disabled"}
                                />
                            </div>}
                        </div>
                    </div>
                    <div className="col-md-10">
                        <div className="form-row">
                            <div className="col-1 d-block d-sm-none Contacts__custom-plus">
                                {index === value.length - 1 && valuesArray.length < 5 && <div onClick={() => handleAdd(index)}>
                                    <span
                                        className={valuesArray[index].value && valuesArray[index].value !== phoneMask && isArrayValid
                                            ? "k-icon k-i-plus-circle"
                                            : "k-icon k-i-plus-circle k-icon-disabled"}
                                    />
                                </div>}
                            </div>
                            <div className="col-9 col-md-12">
                                <Field
                                    name={`${id}[${index}].value`}
                                    mask={id === 'phones' ? '+7(000)000-00-00' : ''}
                                    component={id === 'phones' ? FormMaskedInput : FormInput}
                                    validator={valueRequiredValidator}
                                />
                            </div>
                            <div className="col-1 d-block d-sm-none">
                                {index === 0 && <div className="Contacts__custom-checkbox-label">Основной</div>}
                                <div className="Contacts__custom-checkbox">
                                    <Field
                                        id={`m-${id}[${index}]`}
                                        name={`${id}[${index}].is_main`}
                                        component={FormContactsRadioButton}
                                        onChange={handleChange}
                                        formRenderProps={formRenderProps}
                                    />
                                </div>
                            </div>
                            {index > 0 && <div className="col-1 d-block d-sm-none Contacts__custom-trash">
                                <span onClick={() => handleRemove(item, id, index)} className="k-icon k-i-trash" />
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <Field
                        name={`${id}[${index}].description`}
                        placeholder="Описание"
                        maxLength="50"
                        component={FormInput}
                        validator={value => lengthValidator(value, 50)}
                    />
                </div>
                <div className="col-md-1 d-none d-sm-block">
                    {index === 0 && <div className="Contacts__custom-checkbox-label">Основной</div>}
                    <div className="Contacts__custom-checkbox">
                        <Field
                            id={`${id}[${index}]`}
                            name={`${id}[${index}].is_main`}
                            component={FormContactsRadioButton}
                            onChange={handleChange}
                            formRenderProps={formRenderProps}
                        />
                    </div>
                </div>
                {index > 0 && <div className="col-md-1 d-none d-sm-block Contacts__custom-trash">
                    <span onClick={() => handleRemove(item, id, index)} className="k-icon k-i-trash" />
                </div>
                }
            </div>)
        }
        {
            visited && validationMessage &&
            (<Error>{validationMessage}</Error>)
        }
    </>;
};

export default React.memo(FormContactsFieldArray);