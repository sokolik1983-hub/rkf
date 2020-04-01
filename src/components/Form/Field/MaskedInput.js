import React from 'react';
import MaskedInput from 'react-text-mask';
import {connect, getIn} from 'formik';

const MaskedField = ({
                         formik,
                         name,
                         className,
                         placeholder,
                         type,
                         mask,
                         disabled,
                         showMask = false,
                         guide =false
                     }) => {
    return (
        <MaskedInput
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={getIn(formik.values, name)}
            mask={mask}
            guide={guide}
            disabled={disabled}
            showMask={showMask}
        />
    )
}


export default connect(MaskedField)
