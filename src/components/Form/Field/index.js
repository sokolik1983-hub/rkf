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
import DraftJs from './DraftJs'

import ReactSelectAsync from './ReactSelectAsync'

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
            case "masked":
                return MaskedField;
            case "DraftJs":
                return DraftJs;
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
                    {[`FormInput--${fieldProps.type}`]: fieldProps.type},
                )}
            >
                <Label field={fieldProps}/>
                <FieldInput
                    id={fieldProps.name}
                    className={'FormInput__input'}
                    {...fieldProps}
                />
                <FieldError name={fieldProps.name}/>
            </FormInput>
        )
    }
}

export default FastFormField
