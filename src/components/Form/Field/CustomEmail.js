import React, {PureComponent} from 'react';
import {connect, getIn} from 'formik';
import {VALIDATE_EMAIL, validationRequest} from 'utils/validationRequest'


class EmailField extends PureComponent {
    state = {
        loading: false
    };
    handleBlur = (e) => {
        const {name, formik} = this.props;
        const {handleBlur, setFieldError} = formik;
        handleBlur(e);
        const value = this.getValue();
        if (value.length > 0) {
            this.setLoading(true);
            validationRequest({url: VALIDATE_EMAIL, name, value, setFieldError, setLoading: this.setLoading})
        }
    };
    getValue = () => {
        const {name, formik} = this.props;
        return getIn(formik.values, name);
    };
    setLoading = bool => this.setState({loading: bool});

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