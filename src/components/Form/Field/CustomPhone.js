import React, {PureComponent} from 'react';
import {connect, getIn} from 'formik';
import {validationRequest, VALIDATE_PHONE} from 'utils/validationRequest'
import MaskedInput from 'react-text-mask'
import {DEFAULT_PHONE_INPUT_MASK} from 'appConfig'
import classnames from 'classnames'

class PhoneField extends PureComponent {
    state = {
        loading: false
    };
    handleBlur = (e) => {
        const {name, formik} = this.props;
        const {handleBlur, setFieldError} = formik;
        const value = this.getValue();
        if (value.length > 0) {
            validationRequest({url: VALIDATE_PHONE, name, value, setFieldError})
        }
        handleBlur(e)
    };

    getValue = () => {
        const {name, formik} = this.props;
        return getIn(formik.values, name);
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
        const value = this.getValue();
        return (
            <MaskedInput
                mask={DEFAULT_PHONE_INPUT_MASK}
                guide
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className={
                    classnames(
                        {[className]: className},
                        {'input--loading': this.state.loading})
                }
                value={value}
                onChange={formik.handleChange}
                onBlur={this.handleBlur}

            />
        )
    }
}

export default connect(PhoneField)