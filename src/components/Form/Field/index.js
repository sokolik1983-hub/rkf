import React, {PureComponent} from 'react';
import {Field} from 'formik'
import classnames from 'classnames'
import FormInput from 'components/Form/FormInput'
import FieldError from './Error'
import Label from './Label'
import ImageInput from './ImageInput'
import TextArea from "./textarea";
import MaskedField from './MaskedInput'
import CustomEmail from './CustomEmail'
import CustomPhone from './CustomPhone'
import ReactSelect from './ReactSelect'
import ReactSelectAsync from './ReactSelectAsync'
import ReactSelectDict from './ReactSelectDictionary'


class FastFormField extends PureComponent {
    static defaultProps = {
        type: "text",
    };
    getComponent = () => {
        switch (this.props.fieldType) {
            case "textarea":
                return TextArea;
            case "image":
                return ImageInput;
            case "customEmail":
                return CustomEmail;
            case "customPhone":
                return CustomPhone;
            case "reactSelect":
                return ReactSelect;
            case "reactSelectAsync":
                return ReactSelectAsync;
                case "reactSelectDict":
                return ReactSelectDict;
            case "masked":
                return MaskedField;
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
                    {[`formInput--${fieldProps.type}`]: fieldProps.type},
                )}
            >
                <Label field={fieldProps}/>
                <FieldInput
                    id={fieldProps.name}
                    className={'formInput__input'}
                    {...fieldProps}
                />
                <FieldError name={fieldProps.name}/>
            </FormInput>
        )
    }
}

export default FastFormField
