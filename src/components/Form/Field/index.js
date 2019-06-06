import React, {PureComponent} from 'react';
import {Field} from 'formik'
import classnames from 'classnames'
import FormInput from 'components/Form/FormInput'
import FieldError from './Error'
import Label from './Label'
import ImageInput from './image'
import TextArea from "./textarea";
import MaskedField from './masked'
import EmailField from './email'
import PhoneField from './phone'
import ReactSelect from './select'
import ReactSelectAsync from './AsyncSelect'

class FastFormField extends PureComponent {
    static defaultProps = {
        type: "text",
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
            case "reactSelectAsync":
                return ReactSelectAsync;
            default:
                return Field;
        }
    };

    render() {
        const FieldInput = this.getComponent();
        const {fieldType, className, style, ...fieldProps} = this.props;
        return (
            <FormInput
                style={style}
                name={fieldProps.name}
                className={classnames(
                    {[className]: className},
                    {[fieldProps.type]: fieldProps.type},
                )}
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
