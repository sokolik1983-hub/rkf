import React from 'react';
import {connect} from 'formik';
import Button from "../../Button";


const SubmitButton = ({formik, className, onClick, children, ...restProps}) => (
    <Button
        type="submit"
        disabled={!formik.isValid}
        className={`btn-submit${className ? ' ' + className : ''}`}
        onClick={onClick}
        {...restProps}
    >
        {children}
    </Button>
);

export default connect(SubmitButton);