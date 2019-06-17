import React from 'react';
import {connect} from 'formik';
import Button from 'components/Button'
import classnames from 'classnames'

const SubmitButton = ({formik, className, onClick, children}) =>
    <Button
        type="submit"
        disabled={formik.isSubmitting}
        className={
            classnames(
                'btn-submit',
                {[className]: className}
            )
        }
        onClick={onClick}
    >
        {children}
    </Button>;

export default connect(SubmitButton);