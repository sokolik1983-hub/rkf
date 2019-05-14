import React, {PureComponent} from 'react';
import {connect, getIn} from 'formik';
import {validationRequest, VALIDATE_PHONE} from 'utils/validationRequest'
import MaskedInput from 'react-text-mask'
import {DEFAULT_PHONE_INPUT_MASK} from 'appConfig'


class PhoneField extends PureComponent {
    handleBlur = (e) => {
        const {name, formik} = this.props;
        const {handleBlur, setFieldError, values} = formik;
        const value = getIn(values, name);
        if (value.length > 0) {
            validationRequest({url:VALIDATE_PHONE, name, value, setFieldError})
        }
        handleBlur(e)
    };

    render() {
        const {
            id,
            name,
            type,
            className,
            placeholder,
            formik,
        } = this.props;

        return (
            <MaskedInput
                mask={DEFAULT_PHONE_INPUT_MASK}
                guide

                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className={className}
                value={getIn(formik.values, name)}
                onChange={formik.handleChange}
                onBlur={this.handleBlur}

            />
        )
    }
}

export default connect(PhoneField)