import React, {PureComponent} from 'react';
import {connect, getIn} from 'formik';
import {validationRequest, VALIDATE_EMAIL} from 'utils/validationRequest'


class EmailField extends PureComponent {
    handleBlur = (e) => {
        const {name, formik} = this.props;
        const {handleBlur, setFieldError, values} = formik;
        const value = getIn(values, name);
        if (value.length > 0) {
            validationRequest({url: VALIDATE_EMAIL, name, value, setFieldError})
        }
        handleBlur(e)
    };

    render() {
        const {
            id,
            name,
            type,
            className,
            formik,
        } = this.props;

        return (
            <input
                id={id}
                name={name}
                type={type}
                className={className}
                onChange={formik.handleChange}
                onBlur={this.handleBlur}
                value={getIn(formik.values, name)}
            />
        )
    }
}

export default connect(EmailField)