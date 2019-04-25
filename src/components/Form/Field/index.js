import React, {PureComponent} from 'react';
import {Field} from 'formik'
import FormInput from 'components/Form/Field/FormInput'
import FieldError from './Error'
import Label from './Label'
import ImageInput from './image'
import TextArea from "./textarea";

class FastFormField extends PureComponent {
    static defaultProps = {
        type: "text",
        className: 'form-input__input'
    };
    getComponent = () => {
        switch (this.props.fieldType) {
            case "textarea":
                return TextArea;
            case "image":
                return ImageInput;
            default:
                return Field;
        }
    };

    render() {
        const FiledInput = this.getComponent();
        const {fieldType, ...fieldProps} = this.props;
        return (
            <FormInput
                name={fieldProps.name}
                className={fieldProps.type}
            >
                <Label field={fieldProps}/>
                <FiledInput
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
