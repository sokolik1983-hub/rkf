import React from "react";
import { Field } from '@progress/kendo-react-form';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import FormMaskedInput from 'pages/UserEditKendo/components/FormMaskedInput';
import FormContactsCheckbox from 'pages/UserEditKendo/components/FormContactsCheckbox';
import { Error } from '@progress/kendo-react-labels';

const FormContactsFieldArray = (fieldArrayRenderProps) => {
    const { validationMessage, visited, id, value, onRemove, onUnshift, valueValidator, valueRequiredValidator, formRenderProps } = fieldArrayRenderProps;
    const newItem = { "is_main": false, "value": "" };

    !value.length && value.push(newItem);

    const handleAdd = () => {
        const isArrayValid = !value.filter((v, index) => formRenderProps.errors[`${id}[${index}].value`]).length;
        isArrayValid && onUnshift({ value: newItem });
    }

    const handleRemove = (item, index) => {
        onRemove({ index: index });
        value.length === 1 && onUnshift({ value: newItem });
    }

    const handleChange = (name) => {
        const values = formRenderProps.valueGetter(id);
        values.map(v => v.is_main = false);
        formRenderProps.onChange(name, { value: true })
    }

    return <>
        {
            value.map((item, index) => <div className="form-row" key={index}>
                <div className="form-group col-md-1 Contacts__custom-plus">
                    {index === value.length - 1 && index < 2 && <div onClick={handleAdd}>
                        <span className="k-icon k-i-plus-circle"></span>
                    </div>}
                </div>
                <div className="form-group col-md-4">
                    <Field
                        name={`${id}[${index}].value`}
                        mask={id === 'phones' ? '+7(000)000-00-00' : ''}
                        component={id === 'phones' ? FormMaskedInput : FormInput}
                        //validator={valueRequiredValidator}
                        validator={value.length > 1 ? valueRequiredValidator : valueValidator}
                    />
                </div>
                <div className="form-group col-md-4">
                    <Field name={`${id}[${index}].description`} placeholder="Описание" component={FormInput} />
                </div>
                <div className="form-group col-md-2">
                    {index === 0 && <div className="Contacts__custom-checkbox-label">Основной</div>}
                    <div className="Contacts__custom-checkbox">
                        <Field
                            id={`${id}[${index}]`}
                            name={`${id}[${index}].is_main`}
                            component={FormContactsCheckbox}
                            onChange={handleChange}
                            formRenderProps={formRenderProps}
                        />
                    </div>
                </div>
                <div className="form-group col-md-1 Contacts__custom-trash">
                    <span onClick={() => handleRemove(item, index)} className="k-icon k-i-trash" />
                </div>
            </div>)
        }
        {
            visited && validationMessage &&
            (<Error>{validationMessage}</Error>)
        }
    </>;
};

export default React.memo(FormContactsFieldArray);