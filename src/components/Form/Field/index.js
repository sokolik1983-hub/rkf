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
import CustomCheckbox from './FormikCheckbox'
import ReactSelect from './ReactSelect'
import ReactSelectCreatable from './ReactSelectCreatable'
import DraftJs from './DraftJs'
import ReactSelectDict from './ReactSelectDict'
import ReactSelectAsync from './ReactSelectAsync'
import ReactDayPicker from './ReactDayPicker'
import CustomAliasInput from './CustomAliasInput';
import FormFile from './FormFile'
import FormFileDownloadable from './FormFileDownloadable'
import FormikDatePicker from './FormikDatePicker';

const FIELDS = {
    textarea: TextArea,
    image: ImageInput,
    customEmail: CustomEmail,
    customPhone: CustomPhone,
    customCheckbox: CustomCheckbox,
    customAliasInput: CustomAliasInput,
    reactSelect: ReactSelect,
    reactSelectAsync: ReactSelectAsync,
    reactSelectDict: ReactSelectDict,
    masked: MaskedField,
    file: FormFile,
    fileDownloadable: FormFileDownloadable,
    DraftJs: DraftJs,
    Field: Field,
    reactDayPicker: ReactDayPicker, // Deprecated. Use formikDatePicker instead
    formikDatePicker: FormikDatePicker,
    reactSelectCreatable: ReactSelectCreatable
};

function getField(fieldType) {
    if (FIELDS.hasOwnProperty(fieldType)) {
        return FIELDS[fieldType]
    } else {
        return FIELDS.Field
    }
}

function FormField({ fieldType, className, style, disabled, readOnly, blockIfHasValue, isUrl, noTouch, ...fieldProps }) {
    const Input = getField(fieldType);

    return (
        <FormInput
            style={style}
            name={fieldProps.name}
            className={classnames(
                { [className]: className },
                { [`FormInput--${fieldProps.type}`]: fieldProps.type },
            )}
        >
            {(fieldType !== "customCheckbox") && <Label htmlFor={fieldProps.name} label={fieldProps.label} />}
            {
                isUrl
                    ? <Input
                        id={fieldProps.name}
                        placeholder="https://website.com"
                        title="Формат ссылки: https://website.com"
                        pattern="https?://.*"
                        type="url"
                        className="FormInput__input"
                        disabled={disabled || (fieldProps.value && blockIfHasValue)}
                        {...fieldProps}
                    />
                    : <Input
                        id={fieldProps.name}
                        className={!["reactSelect", "reactSelectCreatable"].includes(fieldType) && 'FormInput__input'}
                        disabled={disabled || (fieldProps.value && blockIfHasValue)}
                        readOnly={readOnly}
                        {...fieldProps}
                    />
            }

            <Error name={fieldProps.name} noTouch={noTouch ? noTouch : null} />
        </FormInput>
    )

}

FormField.defaultProps = {
    type: "text",
    blockIfHasValue: false,
};

export default React.memo(FormField)
