import React from 'react';
import { Field, connect } from 'formik'
import classnames from 'classnames'
import FormInput from 'components/Form/FormInput'
import Error from './Error'
import Label from './Label'
import ImageInput from './ImageInput'
import TextArea from "./textarea";
import MaskedField from './MaskedInput'
import CustomEmail from './CustomEmail'
import CustomPhone from './CustomPhone'
import ReactSelect from './ReactSelect'
import DraftJs from './DraftJs'
import ReactSelectDict from './ReactSelectDict'
import ReactSelectAsync from './ReactSelectAsync'
import ReactDayPicker from './ReactDayPicker'

const FIELDS = {
    textarea: TextArea,
    image: ImageInput,
    customEmail: CustomEmail,
    customPhone: CustomPhone,
    reactSelect: ReactSelect,
    reactSelectAsync: ReactSelectAsync,
    reactSelectDict: ReactSelectDict,
    masked: MaskedField,
    DraftJs: DraftJs,
    Field: Field,
    reactDayPicker: ReactDayPicker
};

function getField(fieldType) {
    if (FIELDS.hasOwnProperty(fieldType)) {
        return FIELDS[fieldType]
    } else {
        return FIELDS.Field
    }
}

function FormField({ formik, fieldType, className, style, disabled, blockIfHasValue, ...fieldProps }) {
    const Input = getField(fieldType);

    return (
        <FormInput
            style={style}
            name={fieldProps.name}
            className={classnames(
                { [className]: className },
                { [`FormInput--${fieldProps.type}`]: fieldProps.type }
            ) + ' alias-name'}
        >
            <Label htmlFor={fieldProps.name} label={`Адрес страницы (допускаются цифры, латинские буквы и нижнее подчеркивание)`} />
            <ul>
                <li>rkf.online/<strong>{formik.values.alias_name}</strong></li>
            </ul>
            <Input
                id={fieldProps.name}
                className={'FormInput__input'}
                disabled={disabled || (fieldProps.value && blockIfHasValue)}
                {...fieldProps}
            />
            <Error name={fieldProps.name} />
        </FormInput>
    )

}

FormField.defaultProps = {
    type: "text",
    blockIfHasValue: false,
};

export default React.memo(connect(FormField))