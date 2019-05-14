import React from 'react';
import MaskedInput from 'react-text-mask'
import {connect, getIn} from 'formik';

const MaskedField = ({
                         formik,
                         name,
                         className,
                         mask,
                         ...fieldProps
                     }) =>
    <MaskedInput
        mask={mask}
        name={name}
        className={className}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={getIn(formik.values, name)}
        guide

        //showMask
        {...fieldProps}
    />;

export default connect(MaskedField)