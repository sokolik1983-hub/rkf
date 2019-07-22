import React from 'react';
import {connect, getIn} from 'formik';
import classnames from 'classnames'
import './styles.scss'

const FormInput = ({formik, name, className, checkbox, style, children}) => {
    // All Formikavailable on formik!
    const error = getIn(formik.errors, name);
    const touch = getIn(formik.touched, name);
    const classNames = classnames(
        'FormInput',
        {[className]: className},
        {'FormInput--checkbox': checkbox},
        {'FormInput--error': touch && error},
    );
    return <div style={style} className={classNames}>{children}</div>
};

export default connect(FormInput);