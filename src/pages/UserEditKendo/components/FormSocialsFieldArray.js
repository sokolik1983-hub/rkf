import React from "react";
import { Field } from '@progress/kendo-react-form';
import FormInput from 'pages/UserEditKendo/components/FormInput';
import { Error } from '@progress/kendo-react-labels';
import { lengthValidator } from "../validators";

const FormSocialsFieldArray = (fieldArrayRenderProps) => {
    const { validationMessage, visited, id, value, onRemove, onPush, valueValidator, formRenderProps } = fieldArrayRenderProps;
    const newItem = { "social_network_type_id": 1, "site": "", "description": "" };

    !value.length && value.push(newItem);

    const handleAdd = () => {
        const isArrayValid = !value.filter((v, index) => formRenderProps.errors[`${id}[${index}].value`]).length;
        isArrayValid && onPush({ value: newItem });
    }

    const handleRemove = (item, index) => {
        onRemove({ index: index });
        value.length === 1 && onPush({ value: newItem });
    }

    return <>
        {
            value.map((item, index) => <div className="form-row" key={index}>
                <div className="form-group col-md-1 About__custom-plus">
                    {index === value.length - 1 && index < 4 && <div onClick={handleAdd}>
                        <span className="k-icon k-i-plus-circle"></span>
                    </div>}
                </div>
                <div className="form-group col-md-6">
                    <Field name={`${id}[${index}].site`} placeholder="Введите ссылку на страницу" component={FormInput} validator={valueValidator} />
                </div>
                <div className="form-group col-md-4">
                    <Field name={`${id}[${index}].description`} placeholder="Введите название" component={FormInput} validator={value => lengthValidator(value, 50)} />
                </div>
                {index > 0 && <div className="form-group col-md-1 About__custom-trash">
                    <span onClick={() => handleRemove(item, index)} className="k-icon k-i-trash" />
                </div>}
            </div>)
        }
        {
            visited && validationMessage &&
            (<Error>{validationMessage}</Error>)
        }
    </>;
};

export default React.memo(FormSocialsFieldArray);