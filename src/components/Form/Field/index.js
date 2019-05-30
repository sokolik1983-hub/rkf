import React, {PureComponent} from 'react';
import {Field} from 'formik'
import FormInput from 'components/Form/Field/FormInput'
import FieldError from './Error'
import Label from './Label'
import ImageInput from './image'
import TextArea from "./textarea";
import MaskedField from './masked'
import EmailField from './email'
import PhoneField from './phone'
import ReactSelect from './select'

class FastFormField extends PureComponent {
    static defaultProps = {
        type: "text",
        className: 'form-input__input'
    };
    getComponent = () => {
        if (this.props.mask) {

            return MaskedField
        }
        switch (this.props.fieldType) {
            case "textarea":
                return TextArea;
            case "image":
                return ImageInput;
            case "customEmail":
                return EmailField;
            case "customPhone":
                return PhoneField;
            case "reactSelect":
                return ReactSelect;
            default:
                return Field;
        }
    };

    render() {
        const FieldInput = this.getComponent();
        const {fieldType, ...fieldProps} = this.props;
        return (
            <FormInput
                name={fieldProps.name}
                className={fieldProps.type}
            >
                <Label field={fieldProps}/>
                <FieldInput
                    id={fieldProps.name}
                    className={'form-input__input'}
                    {...fieldProps}
                />
                <FieldError name={fieldProps.name}/>
            </FormInput>
        )
    }
}

export default FastFormField
