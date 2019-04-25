import React from 'react';
import {connect, getIn} from 'formik';
import classnames from 'classnames'
import './styles.scss'

const FormInput = props => {
    // All FormikProps available on props.formik!
    const error = getIn(props.formik.errors, props.name);
    const touch = getIn(props.formik.touched, props.name);
    const classNames = classnames(
        'form-input',
        {[`${props.className}`]: props.className},
        {'form-input--checkbox': props.checkbox},
        {'form-input--error': touch && error},
    );
    return <div className={classNames}>{props.children}</div>
};

export default connect(FormInput);