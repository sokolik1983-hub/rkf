import React from 'react';
import { Field } from 'formik'
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

function FormField({ fieldType, className, style, disabled, readOnly, blockIfHasValue, isUrl, noTouch, errName, ...fieldProps }) {
    const Input = getField(fieldType);

    return (
        <FormInput
            style={style}
            name={fieldProps.name}
            errName={errName}
            className={classnames(
                { [className]: className },
                { [`FormInput--${fieldProps.type}`]: fieldProps.type },
            )}
        >
            <Label htmlFor={fieldProps.name} label={fieldProps.label} />
            {
                isUrl
                    ? <Input
                        id={fieldProps.name}
                        placeholder="https://website.com"
                        title="Формат ссылки: https://website.com"
                        pattern="https?://.*"
                        type="url"
                        className={'FormInput__input'}
                        disabled={disabled || (fieldProps.value && blockIfHasValue)}
                        {...fieldProps}
                    />
                    : <Input
                        id={fieldProps.name}
                        className={fieldType !== "reactSelect" && 'FormInput__input'}
                        disabled={disabled || (fieldProps.value && blockIfHasValue)}
                        readOnly={readOnly}
                        {...fieldProps}
                    />
            }

            <Error name={errName || fieldProps.name} noTouch={noTouch ? noTouch : null} />
        </FormInput>
    )

}

FormField.defaultProps = {
    type: "text",
    blockIfHasValue: false,
};

export default React.memo(FormField)
