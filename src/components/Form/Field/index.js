import React from 'react';
import {Field} from 'formik'
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
};

function getField(fieldType) {
    if (FIELDS.hasOwnProperty(fieldType)) {
        return FIELDS[fieldType]
    } else {
        return FIELDS.Field
    }
}

function FormField(props) {
    const {fieldType, className, style, ...fieldProps} = props;

    const Input = getField(fieldType);

    return (
        <FormInput
            style={style}
            name={fieldProps.name}
            className={classnames(
                {[className]: className},
                {[`FormInput--${fieldProps.type}`]: fieldProps.type},
            )}
        >
            <Label htmlFor={fieldProps.name} label={fieldProps.label}/>
            <Input
                id={fieldProps.name}
                className={'FormInput__input'}
                {...fieldProps}
            />
            <Error name={fieldProps.name}/>
        </FormInput>
    )

}

FormField.defaultProps = {
    type: "text",
};

export default React.memo(FormField)
